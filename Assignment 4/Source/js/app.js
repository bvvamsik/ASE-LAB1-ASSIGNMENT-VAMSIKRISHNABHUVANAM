var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'home.html',
            controller: 'mainController'
    	})
    	.when('/login', {
    		templateUrl: 'login.html',
            controller: 'loginController'
    	})
    	.when('/signup', {
    		templateUrl: 'signup.html',
            controller: 'signupController'
    	})
        .when('/mashup', {
            templateUrl: 'mashup.html',
            controller: 'mashupController'
        });


});

animateApp.controller('mashupController', function($scope, $http) {
    $scope.pageClass = 'mashup';
});

animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'home';
});

animateApp.controller('loginController', function($scope, $location, $window) {
    $scope.pageClass = 'login';
    
    $scope.logOn = function() {
        $scope.errorMsg = "Dummy";
        if (! $scope.username ) {
            $scope.errorMsg = "User name is required";
        } else if (! $scope.password ) {
            $scope.errorMsg = "Password is required";
        } else if (! localStorage.getItem("username") ) {
            $scope.errorMsg = "Sign up first";
        } else if ($scope.username != localStorage.getItem("username") ) {
            $scope.errorMsg = "Invalid username";
        } else if ($scope.password != localStorage.getItem("password") ) {
            $scope.errorMsg = "Invalid password";
        } else {
            $scope.errorMsg = "User " + localStorage.getItem("username") + " logged in";
            var landingUrl = "#mashup";
            $window.location.href = landingUrl;
        };
    };
});

animateApp.controller('signupController', function($scope) {
    $scope.pageClass = 'signup';
    
    $scope.signUp = function() {
        if (! $scope.username ) {
            $scope.errorMsg = "Invalid username entered";
        } else if (! $scope.password ) {
            $scope.errorMsg = "Invalid password entered";
        } else if (! $scope.password2 ) {
            $scope.errorMsg = "Passwords do not match";
        } else if ($scope.password !== $scope.password2) {
            $scope.errorMsg = "Passwords do not match";
        } else {
            localStorage.setItem("username", $scope.username);
            localStorage.setItem("password", $scope.password);
            $scope.errorMsg = "User " + $scope.username + " signed up!";
            var landingUrl = "#mashup";
            $window.location.href = landingUrl;
        }
    }
});