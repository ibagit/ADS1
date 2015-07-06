'use strict';

/* Filters */

var resultsFilters = angular.module('resultsFilters', []);

resultsFilters.filter('unsafe', function($sce) { return $sce.trustAsHtml; });