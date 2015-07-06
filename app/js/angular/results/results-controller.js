'use strict';

/* Services */

var resultsController = angular.module('resultsController', []);

// ------------------------------
// ----- Results Controller -----
// ------------------------------
resultsController.controller('resultsCtrl', ['$scope', '$sessionStorage', 'MonthMap', function($scope, $sessionStorage, MonthMap) {
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