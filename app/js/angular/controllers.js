'use strict';

/* Controllers */

var rdControllers = angular.module('rdControllers', []);

// ------------------------------
// ----- Temp Controller --------
// ------------------------------
rdControllers.controller('tempCtrl', ['$scope', function($scope) {
    console.log("Temp Controller!");
}]);

// ------------------------------
// ------ Map Controller --------
// ------------------------------
rdControllers.controller('mapCtrl', ['$scope', 'Map', function($scope, Map) {
    console.log("Map Controller!");

    // Get User's Latitude & Longitude
    function success(position) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log("The user's location is: " + latlng.toString());
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
    	// Declarations
        var geocoder = new google.maps.Geocoder();
        var state = '', address = '', code = '';
        var states = Map.getData();

        console.log("Successfully initialized Geocoder...");
        geocoder.geocode({'latLng': coordinate}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                	state = results[5].formatted_address.split(",")[0];
                	address = results[0].formatted_address;
                	code = states[state];
                    window.location = '/#/form/'+state + '/' + code;
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
}]);


// ------------------------------
// ----- Results Controller -----
// ------------------------------
rdControllers.controller('resultsCtrl', ['$scope', 'Storage', function($scope, Storage) {
    console.log("Results Controller!");
    $scope.recalls = Storage.getData();
    console.log($scope.recalls);
}]);

// ------------------------------
// ----- Form Controller --------
// ------------------------------
rdControllers.controller('formCtrl', ['$scope', '$routeParams', '$http', 'Storage', function($scope, $routeParams, $http, Storage) {
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
            console.log("Success. Parsing data and connecting to service...");
            var data = JSON.parse(results);
            Storage.setData(data['results']);
            window.location = '/#/recalls/';
        })
        .error(function(data){
            console.log("Error making request: " + data);
            window.location = '/#/recalls/';
        });
    };
}]);