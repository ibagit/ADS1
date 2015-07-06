'use strict';

/* Modules */

var rdApp = angular.module('rdApp', [
	'rdApp.map', 
	'rdApp.form', 
	'rdApp.results',
    'infinite-scroll',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngAnimate'
]);


rdApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/default.htm',
            controller  : 'tempCtrl',
            title: 'Food Safety Alert >> Home'
        })
        .when('/force', {
            templateUrl : 'pages/default.htm',
            controller  : 'tempCtrl',
            title: 'Food Safety Alert >> Home' 
        })        
        .when('/contact', {
            templateUrl : 'pages/contact.htm',
            controller  : 'tempCtrl',
            title: 'Food Safety Alert >> Contact Us'
        })
        .when('/about', {
            templateUrl : 'pages/about.htm',
            controller  : 'tempCtrl',
            title: 'Food Safety Alert >> About'
        })        
        .when('/form/:stateCode', {
            templateUrl : 'pages/form.htm',
            controller  : 'formCtrl',
            title: 'Food Safety Alert >> Search'
        })        
        .when('/recalls/', {
            templateUrl : 'pages/recalls.htm',
            controller  : 'resultsCtrl',
            title: 'Food Safety Alert >> Results'
        })
        .when('/recall/:recallId', {
            templateUrl : 'pages/recall.htm',
            controller  : 'tempCtrl',
            title: 'Food Safety Alert >> Result'
        }).
      	otherwise({
        	redirectTo: '/'
		});
});

// ----------------------------------
// -------- 508 Compliance ----------
// ----------------------------------
rdApp.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);

// ------------------------------
// ----- Temp Controller --------
// ------------------------------
rdApp.controller('tempCtrl', ['$scope', '$sessionStorage', function($scope, $sessionStorage) {
    console.log("Temp Controller!");

    // Clear local Storage
    delete $sessionStorage.params;
}]);

// ----------------------------------
// ------ Exception Handling --------
// ----------------------------------
rdApp.config(function($provide){
    $provide.decorator("$exceptionHandler", function($delegate, $injector){
        return function(exception, cause){
            var $rootScope = $injector.get("$rootScope");
            $rootScope.addError({message:"Exception", reason:exception});
            $delegate(exception, cause);
        };
    });
});

rdApp.factory("errors", function($rootScope){
    return {
        catch: function(message){
            return function(reason){
                $rootScope.addError({message: message, reason: reason})
            };
        }
    };
});