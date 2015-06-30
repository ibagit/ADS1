'use strict';

/* Services */

var rdServices = angular.module('rdServices', ['ngResource']);

// For checking if object is empty
rdServices.factory('Validation', function($resource){
    return {
        isEmpty: function (obj) {
          
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
	        return true;
		}
    };
});

// State names ---> State Codes
rdServices.factory('Map', function($resource){
    var map = {
		"Alabama": "AL",
		"Alaska": "AK",
		"American Samoa": "AS",
		"Arizona": "AZ",
		"Arkansas": "AR",
		"California": "CA",
		"Colorado": "CO",
		"Connecticut": "CT",
		"Delaware": "DE",
		"District Of Columbia": "DC",
		"Federated States Of Micronesia": "FM",
		"Florida": "FL",
		"Georgia": "GA",
		"Guam": "GU",
		"Hawaii": "HI",
		"Idaho": "ID",
		"Illinois": "IL",
		"Indiana": "IN",
		"Iowa": "IA",
		"Kansas": "KS",
		"Kentucky": "KY",
		"Louisiana": "LA",
		"Maine": "ME",
		"Marshall Islands": "MH",
		"Maryland": "MD",
		"Massachusetts": "MA",
		"Michigan": "MI",
		"Minnesota": "MN",
		"Mississippi": "MS",
		"Missouri": "MO",
		"Montana": "MT",
		"Nebraska": "NE",
		"Nevada": "NV",
		"New Hampshire": "NH",
		"New Jersey": "NJ",
		"New Mexico": "NM",
		"New York": "NY",
		"North Carolina": "NC",
		"North Dakota": "ND",
		"Northern Mariana Islands": "MP",
		"Ohio": "OH",
		"Oklahoma": "OK",
		"Oregon": "OR",
		"Palau": "PW",
		"Pennsylvania": "PA",
		"Puerto Rico": "PR",
		"Rhode Island": "RI",
		"South Carolina": "SC",
		"South Dakota": "SD",
		"Tennessee": "TN",
		"Texas": "TX",
		"Utah": "UT",
		"Vermont": "VT",
		"Virgin Islands": "VI",
		"Virginia": "VA",
		"Washington": "WA",
		"West Virginia": "WV",
		"Wisconsin": "WI",
		"Wyoming": "WY"
	};
    return {
        getData: function () {
            return map;
        },
        setData: function(value) {
            console.log("Why is someone mutating the map...?");
        }
    };
});

// Mapping of classifications
rdServices.factory('ClassMap', function($resource){
	var classifications = {
		"Severe": "\"Class I\"",
		"Moderate": "\"Class II\"",
		"Minor": "\"Class III\""
	};
    return {
        getData: function () {
            return classifications;
        },
        setData: function(value) {
            console.log("Why is someone mutating the map...?");
        }
    };
});

// Month Index ---> Month Name
rdServices.factory('MonthMap', function($resource){
	var months = {
		"01": "January",
		"02": "February",
		"03": "March",
		"04": "April",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "August",
		"09": "September",
		"10": "October",
		"11": "November",
		"12": "December"
	};
    return {
        getData: function () {
            return months;
        },
        setData: function(value) {
            console.log("Why is someone mutating the map...?");
        }
    };
});