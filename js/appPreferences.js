

var app = angular.module('bridgesApp', []);


 app.controller('preferencesController', function($scope) {

     
     $scope.preferences = {};

     
     $scope.message = "";

     
     $scope.submitPreferences = function() { //Function runs when form submitted

        $scope.message = "";
        document.getElementById("jsonOutput").textContent = "";
        document.getElementById("ajaxMessage").textContent = "";    
        

        if (validatePreferences()) {

             var preferencesJSON = JSON.stringify($scope.preferences);

        
            $scope.message = "Your preferences have been confirmed!";

            sendPreferences();

            console.log("Preferences:", preferencesJSON); //Displays the json

        }

        
     };

});