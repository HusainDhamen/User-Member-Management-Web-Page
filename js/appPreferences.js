// Husain-file

var app = angular.module('bridgesApp', []);


 app.controller('preferencesController', function($scope) {

     
     $scope.preferences = {};

     
     $scope.message = "";

     
     $scope.submitPreferences = function() { //Function runs when form submitted

   
         var preferencesJSON = JSON.stringify($scope.preferences);

        
         $scope.message = "Your preferences have been confirmed!";

         console.log("Preferences:", preferencesJSON); //Displays the json
     };

});