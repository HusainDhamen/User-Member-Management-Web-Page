// Mahmoud - JavaScript Form Validation

// Create a function to validate the submission form
function validateSubmission() {
    let name = document.getElementById("submittedBy").value.trim();
    let title = document.getElementById("resourceTitle").value.trim();
    let category = document.getElementById("resourceCategory").value;
    let description = document.getElementById("resourceDescription").value.trim();
    let errors = "";

// Check if the student's name is valid
    if (name.length < 2) {
        errors += "Please enter your full name.<br>";
    }

// Check if the resource title is entered
    if (title === "") {
        errors += "Please enter a resource title.<br>";
    }

// Check if a category is selected
    if (category === "") {
        errors += "Please choose a category.<br>";
    }

// Check if the description is entered
    if (description === "") {
        errors += "Please enter a description.<br>";
    }

// Display validation errors
    document.getElementById("submissionsErrors").innerHTML = errors;
    document.getElementById("submissionsErrors").style.color = "red";

// Return true if valid, false if invalid
    if (errors === "") {
        return true;
    }
    else {
        return false;
    }
}

// Gianny - jQuery and AJAX

// Create the sendSubmission() function

// Use jQuery to collect the form information

// Convert the submission information into JSON

// Send the JSON data to the Node.js backend using AJAX

// Handle success and error responses
function sendSubmission(submission, $scope) {
  
  $.ajax({
    url: "/api/submissions",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(submission),
    dataType: "json"
  })
    .done(function () {
      $scope.$applyAsync(function () {
        $scope.message = "Thank you! Your resource was submitted and is waiting for approval.";
        $scope.messageType = "success";
        $scope.submission = {}; // clear the form
      });
    })
    .fail(function (xhr) {
      var reason = (xhr.responseJSON && (xhr.responseJSON.error || xhr.responseJSON.message)) ||
        "Something went wrong submitting your resource. Please try again.";
      $scope.$applyAsync(function () {
        $scope.message = reason;
        $scope.messageType = "danger";
      });
    });
}