app.controller('LineCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('stock/aapl.json').success(function(data) {
        $scope.selec = 'aapl'; //default as age
        $scope.series = ['Tweet Mood', 'Stock Market'];
        $scope.stocks = data;

        $scope.labels = [];
        $scope.createLabels = function() {
          for (var i = 0; i < $scope.stocks.length; i++) {
            $scope.labels.push($scope.stocks[i].date);
          }
        };  
        $scope.createLabels();

        $scope.data = [[], []];
        $scope.createGraphArray = function() {  
          for (var i = 0; i < $scope.stocks.length; i++) {
            $scope.data[0].push($scope.stocks[i].percentage1);
            $scope.data[1].push($scope.stocks[i].percentage2);
          }
        };
        $scope.createGraphArray();

        $scope.clickPredic = function() {  
          $scope.buySell = 'clicked';
        }; //button click test

        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };

        $scope.onHover = function (points) {
          if (points.length > 0) {
            console.log('Point', points[0].value);
          } else {
            console.log('No point');
          }
        };
    });
}]);