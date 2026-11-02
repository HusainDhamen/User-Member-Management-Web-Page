
 // Mahmoud - JavaScript Form Validation
function validatePreferences() {
    let name = document.getElementById("studentName").value.trim();
    let email = document.getElementById("studentEmail").value.trim();
    let resource = document.getElementById("selectedResource").value;
    let method = document.getElementById("accessMethod").value;
    let errors = "";

 // Check if the student's name is valid
    if (name === "") {
        errors += "Please enter your name.<br>";
    }

 // Check if the email is valid
    if (!email.includes("@") || !email.includes(".")) {
        errors += "Please enter a valid email.<br>";
    }

 // Check if a resource was selected
    if (resource === "") {
        errors += "Please choose a resource.<br>";
    }

 // Check if an access method was selected
    if (method === "") {
        errors += "Please choose an access method.<br>";
    }

 // Display validation errors
    document.getElementById("preferenceErrors").innerHTML = errors;
    document.getElementById("preferenceErrors").style.color = "red";

    if (errors === "") {
        return true;
    }
    else {
        return false;
    }
}

 // Gianny - jQuery and AJAX

 // Use jQuery to interact with the preferences page
function sendPreferences() {

 // Prepare the JSON data for the AJAX request
    let preferences = {
        name: $("#studentName").val(),
        email: $("#studentEmail").val(),
        resource: $("#selectedResource").val(),
        accessMethod: $("#accessMethod").val(),
        notes: $("#additionalNotes").val()
    };

    $("#jsonOutput").text(JSON.stringify(preferences));

 // Send the JSON data to the RESTful API
    $.ajax({
        url: "/api/preferences",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(preferences),

 // Handle success and error responses
        success: function () {
            $("#ajaxMessage").text("Preferences sent to the server!");
        },
        error: function () {
            $("#ajaxMessage").text("The server is not ready yet, but the JSON is ready to send.");
        }
    });
}