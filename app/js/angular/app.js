'use strict';

/* Modules */

var rdApp = angular.module('rdApp', [
    'ngRoute',
    'rdServices',
    'rdControllers',
    'infinite-scroll',
    'ngSanitize',
    'rdFilters',
    'ngStorage',
    'rdDirectives',
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
        .when('/form/:state/:stateCode', {
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

rdApp.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);