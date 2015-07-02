'use strict';

/* Controllers */

var rdControllers = angular.module('rdControllers', []);

// ------------------------------
// ----- Temp Controller --------
// ------------------------------
rdControllers.controller('tempCtrl', ['$scope', '$sessionStorage', function($scope, $sessionStorage) {
    console.log("Temp Controller!");

    // Clear local Storage
    delete $sessionStorage.params;
}]);

// ------------------------------
// ------ Map Controller --------
// ------------------------------
rdControllers.controller('mapCtrl', ['$scope', '$sessionStorage', 'Map', 'Browser', function($scope, $sessionStorage, Map, Browser) {
    console.log("Map Controller!");

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

    // Get User's Latitude & Longitude
    function success(position) {
        console.log("Got Location!");
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        codeLatLng(latlng);
    }

    function error(msg) {
        console.log("Could not gain access to User Location: " + msg);

        // End Loading animation and render the page 
        var body = angular.element(document.querySelector("body"));
        body.addClass('loaded');
    }

    // Initiate process of receiving user location
    if (Browser.type()==='Safari') {
        error('Safari problems');
    } else {
        // Ask for Location
        if (navigator.geolocation) {
            // Get user input (Allow || Do not allow)
            navigator.geolocation.getCurrentPosition(success, error);

            // FailSafe for IE Firefox
            setTimeout(function(){
                var body = angular.element(document.querySelector("body"));
                body.addClass('loaded');           
            }, 4500);
        } else {
            error('Browser does not support geolocation');
        }
    }
}]);

// ------------------------------
// ----- Results Controller -----
// ------------------------------
rdControllers.controller('resultsCtrl', ['$scope', '$sessionStorage', 'MonthMap', function($scope, $sessionStorage, MonthMap) {
    console.log("Results Controller!");

    // Grab Search Parameters
    if ($sessionStorage.classification) $scope.classification = $sessionStorage.classification[0];
    if ($sessionStorage.recalling_firm) $scope.recalling_firm = $sessionStorage.recalling_firm.join(" and ");
    if ($sessionStorage.product_description) $scope.product_description = $sessionStorage.product_description.join(" and ");

    // Grab results
    $scope.totalRecalls = $sessionStorage.results;

    // Initialize number -> month
    var monthMap = MonthMap.getData();

    // Format Output
    function prettify(element, index, array) {
        // Make Date pretty
        var date = element['report_date'];
        date = monthMap[date.substring(4,6)] + " " + date.substring(6) + ", " + date.substring(0,4);
        element['view_date']= date;
    }

    // Sort by date
    $scope.totalRecalls.sort(function(a, b) {
        if (a.report_date > b.report_date) return -1;
        if (a.report_date < b.report_date) return 1;
        return 0;        
    });

    // Convert UTC dates to User-Friendly one (IE doesn't support ForEach loops)
    $scope.totalRecalls.forEach(prettify);

    // Bind Results to front-end HTML elements
    $scope.state = $sessionStorage.state;
    $scope.quantity = $sessionStorage.quantity;
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
rdControllers.controller('formCtrl', ['$scope', '$sessionStorage', '$routeParams', '$http', 'ClassMap', 'Validation', 'Browser', function($scope, $sessionStorage, $routeParams, $http, ClassMap, Validation, Browser) {
    $scope.recalls = "";                
    $scope.state = $routeParams.state;
    $scope.stateCode = $routeParams.stateCode;
    var previousParams = $sessionStorage.params;
    var dataMap = {0: 'food', 1: 'brand', 2: 'all', 3: 'anything'};
    var reference = {
        "food": "product_description",
        "brand": "recalling_firm",
        "all": "classification",
        "anything": "reason_for_recall"
    };

    // START LOADING ANIMATIONS
    $scope.loading = function () {
        if (Browser.type() !== 'Netscape') {
            console.log("Beginning loading animation...");
            angular.element(document.querySelector('body')).removeClass("loaded");
            angular.element(document.querySelector('#loader-wrapper')).addClass("waiting");
        }
    }

    if (!Validation.isEmpty(previousParams)) {
        $scope.food = (previousParams['product_description'] ? previousParams['product_description'].join(' and ') : 'food');
        $scope.brand = (previousParams['recalling_firm'] ? previousParams['recalling_firm'].join(' and ') : 'brand');
    }  

    // Initialize text -> classifications
    var classMap = ClassMap.getData();

    // Helpful Tooltip displays only if not already seen
    if (!$sessionStorage.seen) {
        var button = angular.element(document.querySelector("#hint"));
        setTimeout(function() {
            button.popover({
                "placement":'bottom',
                html: true
            }).popover('show');
        }, 250);
        setTimeout(function() {
            button.popover('hide');
        }, 5000);
    }

    // process the form
    $scope.processForm = function() {
        // User has figured it out
        $sessionStorage.seen = true;

        // Find the Form elements
        var parms = {};
        var e = angular.element(document.querySelectorAll(".nl-field-toggle"));
        var inputs = [e[0].textContent, e[1].textContent, e[2].textContent, e[3].textContent];

        for (var i = 0; i<inputs.length; i++) {
            if (!(inputs[i] in reference)) {
                parms[reference[dataMap[i]]] = (reference[dataMap[i]] == 'classification') ? classMap[inputs[i]].split(" and ") : inputs[i].split(" and ");
            }
        }

        // Store Parameters   
        console.log(parms);
        $sessionStorage.params = parms;

        // ----------------------
        // --- Submit Request ---
        // ----------------------
        $http.post('/foodQuery', { 
            params: parms,
            'distribution_pattern': $scope.stateCode,
            'status': "Ongoing"
        })
        .success(function(results) {
            var data = JSON.parse(results);
            
            // No Results
            if ('error' in data) {
                console.log("ERROR");

                // End Loading animation and render the page 
                console.log("Removing loading animation");                
                var body = angular.element(document.querySelector("body"));
                body.addClass('loaded');
                console.log("Removed!!!!");                

                // PopOver
                var button = angular.element(document.querySelector(".Bam"));
                button.popover({
                    "placement":'top',
                    html: true
                }).popover('show');
                setTimeout(function() {
                    button.popover('hide');
                }, 3000);

            } else {                          
                console.log("Success!");

                // Parameters Criteria
                $sessionStorage.state = $scope.state;
                if ('classification' in parms) $sessionStorage.classification = parms['classification'];                
                if ('product_description' in parms) $sessionStorage.product_description = parms['product_description'];
                if ('recalling_firm' in parms) $sessionStorage.recalling_firm = parms['recalling_firm'];

                // Results
                $sessionStorage.results = data['results'];
                $sessionStorage.quantity = data['meta']['results']['total'];             


                console.log("Forking on Browser type");
                // End Loading animation and render the page 
                if (Browser.type() !== 'Netscape') {
                    console.log("Removing loading animation");
                    var body = angular.element(document.querySelector("body"));
                    body.addClass('loaded');
                    console.log("Removed!!!!");
                    window.location = '/#/recalls/';
                } else {
                    console.log("Window Time");
                    document.location = '/#/recalls/';
                }  
                console.log("Done");                
            }
            console.log("Double done (DD)");
        })
        .error(function(data){
            console.log("Error making request: " + data);       
        });
    };
}]);