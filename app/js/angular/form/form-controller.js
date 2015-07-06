'use strict';

/* Services */

var formController = angular.module('formController', []);

// ------------------------------
// ----- Form Controller --------
// ------------------------------
formController.controller('formCtrl', ['$scope', '$sessionStorage', '$routeParams', '$http', 'Map', 'ClassMap', 'Validation', 'Browser', function($scope, $sessionStorage, $routeParams, $http, Map, ClassMap, Validation, Browser) {
    $scope.recalls = "";                
    $scope.stateCode = $routeParams.stateCode;
    $scope.state = Map.getCodeMap()[$routeParams.stateCode];
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
        //if (Browser.type() !== 'Netscape') {
            angular.element(document.querySelector('body')).removeClass("loaded");
            angular.element(document.querySelector('#loader-wrapper')).addClass("waiting");
        //}
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
                var body = angular.element(document.querySelector("body"));
                body.addClass('loaded');

                // PopOver
                var button = angular.element(document.querySelector(".Bam"));
                button.popover({
                    "placement":'top',
                    html: true
                }).popover('show');
                setTimeout(function() {
                    button.popover('hide');
                }, 3500);

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

                // End Loading animation and render the page 
                //if (Browser.type() !== 'Netscape') {
                    var body = angular.element(document.querySelector("body"));
                    body.addClass('loaded');
                    window.location = '/#/recalls/';
                //} else {
                    // For IE
                    document.location = '/#/recalls/';
                //}  
            }
        })
        .error(function(data){
            console.log("Error making request: " + data);       
        });
    };
}]);