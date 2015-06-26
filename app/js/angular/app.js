'use strict';

/* Modules */

var rdApp = angular.module('rdApp', [
    'ngRoute',
    'rdServices',
    'rdControllers',
    'infinite-scroll'
]);

rdApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/default.htm',
            controller  : 'mapCtrl'
        })
        .when('/force', {
            templateUrl : 'pages/default.htm',
            controller  : 'tempCtrl'
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