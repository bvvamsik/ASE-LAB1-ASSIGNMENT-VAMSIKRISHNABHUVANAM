// references
/// <reference path="../Scripts/angular.js" />
/// <reference path="../Scripts/angular-mocks.js" />
/// <reference path="../Scripts/ionic.bundle.js" />
/// <reference path="../Scripts/google.js" />

// system under test
/// <reference path="../www/js/weatherOrNotModule.js" />

describe('given a weatherCtrl', function () {
    var $scope, $controller;

    describe('when initialized', function () {
        beforeEach(function () {
            module('weatherModule');
            inject(function ($rootScope, _$controller_) {
                $scope = $rootScope.$new();
                $controller = _$controller_;
            });

            $controller('weatherCtrl', { '$scope': $scope });
        });

        it('then it sets submitted property to false', function () {
            expect($scope.submitted).toBe(false);
        });

        it('then it defines an initialize() method', function () {
            expect($scope.initialize instanceof Function).toBe(true);
        });

        it('then it defines a getDirection() method', function () {
            expect($scope.getDirection instanceof Function).toBe(true);
        });
    });
});