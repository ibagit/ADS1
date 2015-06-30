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
        codeLatLng(latlng);
    }

    // Error Handler
    function error(msg) {
        var s = document.querySelector('#status');
        console.log("Could not gain access to User Location");

            // End Loading animation and render the page 
            var body = angular.element(document.querySelector("body"));
            body.addClass('loaded');
    }

    // Covert Lat & Long coordinates into State            
    function codeLatLng(coordinate) {
    	// Declarations
        var geocoder = new google.maps.Geocoder();
        var state = '', address = '', code = '';
        var states = Map.getData();

        geocoder.geocode({'latLng': coordinate}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                	state = results[5].formatted_address.split(",")[0];
                	address = results[0].formatted_address;
                	code = states[state];
                    window.location = '/#/form/'+state + '/' + code;

                    // End Loading animation and render the page 
                    var body = angular.element(document.querySelector("body"));
                    body.addClass('loaded');
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
rdControllers.controller('resultsCtrl', ['$scope', 'Storage', 'MonthMap', 'Validation', function($scope, Storage, MonthMap, Validation) {
    console.log("Results Controller!");

    // Grab Search Parameters
    if (Storage.getData('classification')) $scope.classification = Storage.getData('classification')[0];
    if (Storage.getData('recalling_firm')) $scope.recalling_firm = Storage.getData('recalling_firm').join(" and ");
    if (Storage.getData('product_description')) $scope.product_description = Storage.getData('product_description').join(" and ");

    // Grab results
    $scope.totalRecalls = Storage.getData('results');

    // If empty go to home page
    if(Validation.isEmpty($scope.totalRecalls)) window.location = '/#/';

    // Initialize number -> month
    var monthMap = MonthMap.getData();

    // Format Output
    function prettify(element, index, array) {
        // Make Date pretty
        var date = element['report_date'];
        date = monthMap[date.substring(4,6)] + " " + date.substring(6) + ", " + date.substring(0,4);
        element['report_date']= date;
    }

    // Sort by date
    $scope.totalRecalls.sort(function(a, b) {
        if (a.report_date > b.report_date) return -1;
        if (a.report_date < b.report_date) return 1;
        return 0;        
    });

    // Convert UTC dates to User-Friendly one
    $scope.totalRecalls.forEach(prettify);

    // Bind Results to front-end HTML elements
    $scope.state = Storage.getData('state');
    $scope.quantity = Storage.getData('quantity');
    $scope.orderProp = 'report_date';

    // Infinite Scroll
    var index = 10;
    var appendedItems = []
    $scope.recalls = $scope.totalRecalls.slice(0,10);
    $scope.loadMore = function() {
        appendedItems = $scope.totalRecalls.slice(index, index+10);
        $scope.recalls = $scope.recalls.concat(appendedItems);
        index+=10;
    }
}]);

// ------------------------------
// ----- Form Controller --------
// ------------------------------
rdControllers.controller('formCtrl', ['$scope', '$routeParams', '$http', 'Storage', 'ClassMap', 'Validation', function($scope, $routeParams, $http, Storage, ClassMap, Validation) {
    $scope.recalls = "";                
    $scope.state = $routeParams.state;
    $scope.stateCode = $routeParams.stateCode;
    var parms = {};
    var dataMap = {0: 'food', 1: 'brand', 2: 'all', 3: 'anything'};
    var reference = {
        "food": "product_description",
        "brand": "recalling_firm",
        "all": "classification",
        "anything": "reason_for_recall"
    };

    // Initialize text -> classifications
    var classMap = ClassMap.getData();

    // process the form
    $scope.processForm = function() {
        // Find the Form elements
        var e = angular.element(document.querySelectorAll(".nl-field-toggle"));
        var inputs = [e[0].text, e[1].text, e[2].text, e[3].text];

        for (var i = 0; i<inputs.length; i++) {
            if (!(inputs[i] in reference)) {
                parms[reference[dataMap[i]]] = (reference[dataMap[i]] == 'classification') ? classMap[inputs[i]].split(" and ") : inputs[i].split(" and ");
            }
        }

        // Parse out Food input    
        console.log(parms);

        $http.post('/foodQuery', { 
            params: parms,
            'distribution_pattern': $scope.stateCode,
            'status': "Ongoing"
        })
        .success(function(results) {
            var data = JSON.parse(results);
            
            if ('error' in data) {
                // PopOver
                var button = angular.element(document.querySelector(".Bam"));
                button.triggerHandler("click");

            } else {                          

                console.log(data['results']);

                // Search Criteria
                Storage.setData('state', $scope.state);
                if ('classification' in parms) Storage.setData('classification', parms['classification']);                
                if ('product_description' in parms) Storage.setData('product_description', parms['product_description']);
                if ('recalling_firm' in parms) Storage.setData('recalling_firm', parms['recalling_firm']);

                // Results
                Storage.setData('results', data['results']);
                Storage.setData('quantity', data['meta']['results']['total']);
                window.location = '/#/recalls/';
            }
        })
        .error(function(data){
            console.log("Error making request: " + data);       
        });
    };
}]);