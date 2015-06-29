'use strict';

/* Filters */

var rdFilters = angular.module('rdFilters', []);

rdFilters.filter('unsafe', function($sce) { return $sce.trustAsHtml; });