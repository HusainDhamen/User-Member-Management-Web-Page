
// Gianny - jQuery and AJAX for Resource Approvals

// Create the loadSubmissions($scope) function

// Use AJAX to retrieve submissions from the Node.js backend

// Display pending submissions using AngularJS

// Create the updateSubmissionStatus(resource, status, $scope) function

// Send the approved or rejected status to the Node.js backend

// Update the submission list after a successful response

// Handle AJAX errors
var API_URL = "/api/submissions";
 
/* Pull a readable error out of the server response.
 * Mahmoud's server sends { message: "..." }; also accepts { error: "..." }. */
function getErrorReason(xhr, fallback) {
  var body = xhr.responseJSON;
  return (body && (body.error || body.message)) || fallback;
}
 
/* Show a message on the page (the {{message}} line in the HTML) */
function showApprovalMessage($scope, text, type) {
  $scope.$applyAsync(function () {
    $scope.message = text;
    $scope.messageType = type; // "success" or "danger"
  });
}
 
/* GET /api/submissions — load everything and put it on the scope */
function loadSubmissions($scope) {
  $("#approvalsAjaxMessage").text("Loading submissions...");
 
  $.ajax({
    url: API_URL,
    method: "GET",
    dataType: "json"
  })
    .done(function (data) {
      $("#approvalsAjaxMessage").text("");
      $scope.$applyAsync(function () {
        $scope.submissions = data;
      });
    })
    .fail(function (xhr) {
      var reason = getErrorReason(xhr, "Could not load submissions.");
      $("#approvalsAjaxMessage").text(reason);
      showApprovalMessage($scope, reason, "danger");
    });
}
 
/* PUT /api/submissions/:id — approve or reject one resource
 * resource: the submission object (needs resource.id)
 * status:   "approved" or "rejected"
 */
function updateSubmissionStatus(resource, status, $scope) {
  $.ajax({
    url: API_URL + "/" + resource.id,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({ status: status }),
    dataType: "json"
  })
    .done(function (updated) {
      // Update the page: changing the status removes it from the pending list
      $scope.$applyAsync(function () {
        resource.status = (updated && updated.status) || status;
      });
      showApprovalMessage(
        $scope,
        '"' + resource.title + '" was ' + status + ".",
        "success"
      );
    })
    .fail(function (xhr) {
      showApprovalMessage(
        $scope,
        getErrorReason(xhr, "Could not update the submission. Please try again."),
        "danger"
      );
    });
}