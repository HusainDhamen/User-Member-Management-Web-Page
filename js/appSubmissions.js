var app = angular.module("bridgesSubmissionsApp", []);


app.controller("submissionsController", function($scope) {

    // Store the info
    $scope.submission = {};

    $scope.message = "";

    // Runs form submitted
    $scope.submitResource = function() {

        $scope.message = "";

        if (validateSubmission($scope.submission, $scope)) {

            var submissionJSON = JSON.stringify($scope.submission);


            // Send the information using gianny's AJAX function
            sendSubmission($scope.submission, $scope);



        

            
            console.log("Submission:", submissionJSON);

        }



    };







});