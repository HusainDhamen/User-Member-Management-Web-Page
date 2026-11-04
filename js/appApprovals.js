var app = angular.module("bridgesApprovalsApp", []);



app.controller("approvalsController", function($scope) {



    // Store submitted resources
    $scope.submissions = [];


    // Display confirm
    $scope.message = "";


    // Loading submissions using Gianny's AJAX function
    loadSubmissions($scope);



    
    $scope.reviewResource = function(resource, status) {

        
        
        updateSubmissionStatus(resource, status, $scope);





    };








});