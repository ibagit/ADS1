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

    // Initiate process of receiving user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        error('not supported');
    }

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
rdControllers.controller('resultsCtrl', ['$scope', '$sce', 'Storage', function($scope, $sce, Storage) {
    console.log("Results Controller!");
    $scope.recalls = Storage.getData('results');
    $scope.state = Storage.getData('state');
}]);

// ------------------------------
// ----- Form Controller --------
// ------------------------------
rdControllers.controller('formCtrl', ['$scope', '$routeParams', '$http', 'Storage', 'ClassMap', function($scope, $routeParams, $http, Storage, ClassMap) {
    $scope.recalls = "";                
    $scope.state = $routeParams.state;
    $scope.stateCode = $routeParams.stateCode;
    var parms = {};
    var dataMap = {0: 'food', 1: 'brand', 2: 'all'};
    var reference = {
        "food": "product_description",
        "brand": "recalling_firm",
        "all": "classification"
    };

    // Initialize text -> classifications
    var classMap = ClassMap.getData();

    var highlight = function(parameters, data) {
        console.log("HighLighting");
        if ('classification' in parameters) {
            for(var i=0; i<data['results'].length; i++) {
                var recall = data['results'][i];
                recall['classification'] = '<b>'+recall['classification'] + '</b>';
            }
        }
        return data;
    }

    function isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        // Default
        return true;
    }


    // process the form
    $scope.processForm = function() {
        // Find the Form elements
        var e = angular.element(document.querySelectorAll(".nl-field-toggle"));
        var inputs = [e[0].text, e[1].text, e[2].text];

        for (var i = 0; i<inputs.length; i++) {
            if (!(inputs[i] in reference)) {
                parms[reference[dataMap[i]]] = (reference[dataMap[i]] == 'classification') ? classMap[inputs[i]] : inputs[i];
            }
        }

        console.log("New Parameters: ");
        console.log(parms);

        $http.post('/foodQuery', { 
            params: parms,
            'distribution_pattern': $scope.stateCode,
            'status': "Ongoing"
        })
        .success(function(results) {
            console.log("Success. Parsing data and connecting to service...");
            var data = JSON.parse(results);
            
            // HighLight Results
            //data = (isEmpty(parms)) ? data : highlight(parms, data);

            Storage.setData('state', $scope.state);
            Storage.setData('results', data['results']);
            window.location = '/#/recalls/';
        })
        .error(function(data){
            console.log("Error making request: " + data);
            window.location = '/#/recalls/';
        });
    };
}]);