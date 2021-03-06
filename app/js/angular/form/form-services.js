'use strict';

/* Services */

var formServices = angular.module('formServices', ['ngResource']);


// For checking if object is empty
formServices.factory('Validation', function($resource){
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

// For checking if browser is Safari
formServices.factory('Browser', function($resource){
    return {
    	type: function() {

	        // Detect Browser version
	        var nVer = navigator.appVersion;
	        var nAgt = navigator.userAgent;
	        var browserName  = navigator.appName;
	        var fullVersion  = ''+parseFloat(navigator.appVersion); 
	        var majorVersion = parseInt(navigator.appVersion,10);
	        var nameOffset,verOffset,ix;

	        // In Opera 15+, the true version is after "OPR/" 
	        if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
	            browserName = "Opera";
	            fullVersion = nAgt.substring(verOffset+4);
	        }
	        // In older Opera, the true version is after "Opera" or after "Version"
	        else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
				browserName = "Opera";
				fullVersion = nAgt.substring(verOffset+6);
 				if ((verOffset=nAgt.indexOf("Version"))!=-1) 
					fullVersion = nAgt.substring(verOffset+8);
	        }
	        // In MSIE, the true version is after "MSIE" in userAgent
	        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
				browserName = "Microsoft Internet Explorer";
				fullVersion = nAgt.substring(verOffset+5);
	        }
	        // In Chrome, the true version is after "Chrome" 
	        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
				browserName = "Chrome";
				fullVersion = nAgt.substring(verOffset+7);
	        }
	        // In Safari, the true version is after "Safari" or after "Version" 
	        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
				browserName = "Safari";
				fullVersion = nAgt.substring(verOffset+7);
				if ((verOffset=nAgt.indexOf("Version"))!=-1) 
					fullVersion = nAgt.substring(verOffset+8);
	        }
	        // In Firefox, the true version is after "Firefox" 
	        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
				browserName = "Firefox";
				fullVersion = nAgt.substring(verOffset+8);
	        }
	        // In most other browsers, "name/version" is at the end of userAgent 
	        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
				browserName = nAgt.substring(nameOffset,verOffset);
				fullVersion = nAgt.substring(verOffset+1);
				if (browserName.toLowerCase()==browserName.toUpperCase()) {
          			browserName = navigator.appName;
				}
			}
	        return browserName;
	    }
	};
});

// State names ---> State Codes
formServices.factory('Map', function($resource){
    var stateMap = {
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

	var codeMap = {
	    "AL": "Alabama",
	    "AK": "Alaska",
	    "AS": "American Samoa",
	    "AZ": "Arizona",
	    "AR": "Arkansas",
	    "CA": "California",
	    "CO": "Colorado",
	    "CT": "Connecticut",
	    "DE": "Delaware",
	    "DC": "District Of Columbia",
	    "FM": "Federated States Of Micronesia",
	    "FL": "Florida",
	    "GA": "Georgia",
	    "GU": "Guam",
	    "HI": "Hawaii",
	    "ID": "Idaho",
	    "IL": "Illinois",
	    "IN": "Indiana",
	    "IA": "Iowa",
	    "KS": "Kansas",
	    "KY": "Kentucky",
	    "LA": "Louisiana",
	    "ME": "Maine",
	    "MH": "Marshall Islands",
	    "MD": "Maryland",
	    "MA": "Massachusetts",
	    "MI": "Michigan",
	    "MN": "Minnesota",
	    "MS": "Mississippi",
	    "MO": "Missouri",
	    "MT": "Montana",
	    "NE": "Nebraska",
	    "NV": "Nevada",
	    "NH": "New Hampshire",
	    "NJ": "New Jersey",
	    "NM": "New Mexico",
	    "NY": "New York",
	    "NC": "North Carolina",
	    "ND": "North Dakota",
	    "MP": "Northern Mariana Islands",
	    "OH": "Ohio",
	    "OK": "Oklahoma",
	    "OR": "Oregon",
	    "PW": "Palau",
	    "PA": "Pennsylvania",
	    "PR": "Puerto Rico",
	    "RI": "Rhode Island",
	    "SC": "South Carolina",
	    "SD": "South Dakota",
	    "TN": "Tennessee",
	    "TX": "Texas",
	    "UT": "Utah",
	    "VT": "Vermont",
	    "VI": "Virgin Islands",
	    "VA": "Virginia",
	    "WA": "Washington",
	    "WV": "West Virginia",
	    "WI": "Wisconsin",
	    "WY": "Wyoming"
	}
    return {
        getStateMap: function () {
            return stateMap;
        },
        getCodeMap: function () {
            return codeMap;
        },        
        setData: function(value) {
            console.log("Why is someone mutating the map...?");
        }
    };
});

// Mapping of classifications
formServices.factory('ClassMap', function($resource){
	var classifications = {
		"Severe": "Class I",
		"Moderate": "Class II",
		"Minor": "Class III"
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