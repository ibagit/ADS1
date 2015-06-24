'use strict';

// Modules 
var rdApp = angular.module('rdApp', ['ngRoute']);

rdApp.config(function($routeProvider) {
    console.log("Configging")
    $routeProvider
        .when('/', {
            templateUrl : 'pages/default.htm',
            controller  : 'tempCtrl'
        })
        .when('/contact', {
            templateUrl : 'pages/contact.htm',
            controller  : 'tempCtrl'
        })
        .when('/about', {
            templateUrl : 'pages/about.htm',
            controller  : 'tempCtrl'
        })        
        .when('/form/:state/:stateCode', {
            templateUrl : 'pages/form.htm',
            controller  : 'formCtrl'
        })        
        .when('/recalls/', {
            templateUrl : 'pages/recalls.htm',
            controller  : 'resultsCtrl'
        })
        .when('/recall/:recallId', {
            templateUrl : 'pages/recall.htm',
            controller  : 'tempCtrl'
        }).
      	otherwise({
        	redirectTo: '/'
		});
});

/* Services */
rdApp.service('storage', function() {
    var recalls = 'Blank';

    return {
        getData: function () {
            return recalls;
        },
        setData: function(value) {
            recalls = value;
        }
    };
});

/* Controllers */
rdApp.controller('tempCtrl', ['$scope', function($scope) {
    console.log("Controller!");
}]);

rdApp.controller('resultsCtrl', ['$scope', 'storage', function($scope, storage) {
    console.log("Results Controller!");
    $scope.recalls = storage.getData();
    console.log($scope.recalls);
}]);

rdApp.controller('formCtrl', ['$scope', '$routeParams', '$http', 'storage', function($scope, $routeParams, $http, storage) {
    $scope.recalls = "";                
    $scope.state = $routeParams.state;
    $scope.stateCode = $routeParams.stateCode;
    var data = ['product_description', 'recalling_firm', 'status'];
    var parms = {}

    // process the form
    $scope.processForm = function() {
        // Find the Form elements
        var e = angular.element(document.querySelectorAll(".nl-field-toggle"));

        // Detect user input
        for (var i=0; i<e.length; i++) if (e[i].text!=data[i]) parms[data[i]]=e[i].text;

        // Delete empty inputs
        if (parms['product_description']=="food") delete parms['product_description'];
        if (parms['recalling_firm']=="brand") delete parms['recalling_firm'];
        if (parms['status']=="all") delete parms['status'];

        $http.post('/foodQuery', { 
            params: parms,
            'state': $scope.stateCode
        })
        .success(function(results) {
            var data = JSON.parse(results);
            storage.setData(data['results']);
            window.location = '/#/recalls/';
        })
        .error(function(data){
            console.log("Error making request: " + data);
        });
    };
}]);