angular.module('weatherModule', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.controller('weatherCtrl', [
        "$scope", "$http", "$sce",
        function ($scope, $http, $sce) {

            $scope.submitted = false;
            var startLat;
            var startLng;
            var endLat;
            var endLng;

            //// TODO: move this to a service
            var map;
            var geocoder;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true
            });
            var directionsService = new google.maps.DirectionsService();

            $scope.initialize = function () {
                geocoder = new google.maps.Geocoder();
                var pos = new google.maps.LatLng(39.0997, -94.5783);
                var mapOptions = {
                    zoom: 6,
                    center: pos
                };

                map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
            };
            
            var rad = function(x) {
                return x * Math.PI / 180;
            };
            

            var StartLocationWeather = function () {
                $http.get("http://api.wunderground.com/api/36b799dc821d5836/conditions/q/" + startLat + "," + startLng + ".json").success(function (data) {
                    temp = data.current_observation.temp_c;
                    icon = data.current_observation.icon_url;
                    weather = data.current_observation.weather;
                    
                    var R = 6378137; // Earth’s mean radius in meter
                    var dLat = rad(endLat - startLat);
                    var dLong = rad(endLng - startLng);
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(rad(startLat)) * Math.cos(rad(endLat)) *
                        Math.sin(dLong / 2) * Math.sin(dLong / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c;
                    d=d/1000;
                    
                    $scope.startWeather = $sce.trustAsHtml("Weather is "+ weather +" and Currently " + temp + " &deg; C & Distance is " + d + "Kilo Meters");
                    $scope.startIcon = $sce.trustAsHtml("<img src='" + icon + "'/>");
                    $scope.distkmiles=$sce.trustAsHtml(d);
                });
            };

            var EndLocationWeather = function () {
                $http.get("http://api.wunderground.com/api/36b799dc821d5836/conditions/q/" + endLat + "," + endLng + ".json").success(function (data) {
                    temp = data.current_observation.temp_c;
                    icon = data.current_observation.icon_url;
                    weather = data.current_observation.weather;
                    
                    var R = 6378137; // Earth’s mean radius in meter
                    var dLat = rad(endLat - startLat);
                    var dLong = rad(endLng - startLng);
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(rad(startLat)) * Math.cos(rad(endLat)) *
                        Math.sin(dLong / 2) * Math.sin(dLong / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c;
                    d=d/1000;
                    d=d*0.621371;
                    
                    $scope.endWeather = $sce.trustAsHtml("Weather is "+ weather +" and Currently " + temp + " &deg; C & Distance is " + d + "Miles");
                    $scope.endIcon = $sce.trustAsHtml("<img src='" + icon + "'/>");
                    $scope.distmiles=$sce.trustAsHtml(d);
                });
            };

            $scope.getDirection = function (startlocation, endlocation) {
                geocoder.geocode({ 'address': startlocation }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        startLat = results[0].geometry.location.H;
                        startLng = results[0].geometry.location.L;
                        StartLocationWeather();
                    }
                });

                geocoder.geocode({ 'address': endlocation }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        endLat = results[0].geometry.location.H;
                        endLng = results[0].geometry.location.L;
                        EndLocationWeather();
                    }
                });
                


                var request = {
                    origin: startlocation,
                    destination: endlocation,
                    travelMode: google.maps.TravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setMap(map);
                        directionsDisplay.setDirections(response);
                    }
                });
                $scope.submitted = true;
            }

            google.maps.event.addDomListener(window, "load", window.setTimeout($scope.initialize, 100));
        }
]);
