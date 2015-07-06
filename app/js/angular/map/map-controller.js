'use strict';

/* Services */

var mapController = angular.module('mapController', []);

// ------------------------------
// ------ Map Controller --------
// ------------------------------
mapController.controller('mapCtrl', ['$scope', '$sessionStorage', '$window', 'Map', 'Browser', function($scope, $sessionStorage, $window, Map, Browser) {
    console.log("Map Controller!");

    // Reset page to Top
    $window.pageYOffset

    // Covert Lat & Long coordinates into State            
    function codeLatLng(coordinate) {
        // Declarations
        var geocoder = new google.maps.Geocoder();
        var state = '', address = '', code = '';
        var states = Map.getStateData();

        geocoder.geocode({'latLng': coordinate}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    state = results[5].formatted_address.split(",")[0];
                    address = results[0].formatted_address;
                    code = states[state];
                    window.location = '/#/form/' + code;

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
    if (Browser.type()==='Safari' || Browser.type()==='Netscape') {
        error('Browser problems');
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
