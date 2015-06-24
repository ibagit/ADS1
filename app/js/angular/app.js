'use strict';

// Modules 
var rdApp = angular.module('rdApp', ['ngRoute']);

rdApp.config(function($routeProvider) {
    console.log("Configging")
    $routeProvider
        .when('/', {
            templateUrl : 'pages/default.htm',
            controller  : 'mapCtrl'
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
// Temp Controller 
rdApp.controller('tempCtrl', ['$scope', function($scope) {
    console.log("Temp Controller!");
}]);

// Map Controller
rdApp.controller('mapCtrl', ['$scope', function($scope) {
    console.log("Map Controller!");

    // Get User's Latitude & Longitude
    function success(position) {

        // Get the Latitude & Longitude
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // Logging
        console.log("The user's location is: " + latlng.toString());

        // Convert the LatLong to String
        codeLatLng(latlng);
    }

    // Error Handler
    function error(msg) {
        var s = document.querySelector('#status');
        console.log("Could not gain access to User Location");
    }

    // Initiate process of receiving user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        error('not supported');
    }

    // Covert Lat & Long coordinates into State            
    function codeLatLng(coordinate) {
        var geocoder = new google.maps.Geocoder();
        console.log("Successfully initialized Geocoder...");
        geocoder.geocode({'latLng': coordinate}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    console.log("Full Address: " + results[0].formatted_address);
                    console.log("State: " + results[5].formatted_address.split(",")[0]);
                    //window.location = '/#/form/'+region + '/' + code;
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
}]);


// Results Controller
rdApp.controller('resultsCtrl', ['$scope', 'storage', function($scope, storage) {
    console.log("Results Controller!");
    $scope.recalls = storage.getData();
    console.log($scope.recalls);
}]);

// Form Controller
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
            'distribution_pattern': $scope.stateCode
        })
        .success(function(results) {
            console.log("Success?!?!?");
            var data = JSON.parse(results);
            storage.setData(data['results']);
            window.location = '/#/recalls/';
        })
        .error(function(data){
            console.log("Error making request: " + data);
            window.location = '/#/recalls/';
        });
    };
}]);