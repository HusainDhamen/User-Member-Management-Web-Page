
// Mahmoud - Node.js Backend

// Import Express and other required modules
const express = require("express");
const fs = require("fs");

// Create the Express application
const app = express();

// Enable JSON request handling
app.use(express.json());

// Serve the website files
app.use(express.static(__dirname));

// Load or initialize submission data
let submissions = [];

if (fs.existsSync("data/submissions.json")) {
    submissions = JSON.parse(fs.readFileSync("data/submissions.json"));
}

// Create POST endpoint to receive new submissions
app.post("/api/submissions", function (req, res) {
    let newSubmission = {
        id: submissions.length + 1,
        submittedBy: req.body.submittedBy,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        status: "pending"
    };

    submissions.push(newSubmission);
    saveSubmissions();

    res.json(newSubmission);
});

// Create GET endpoint to retrieve submissions
app.get("/api/submissions", function (req, res) {
    res.json(submissions);
});

// Create PUT endpoint to approve or reject submissions
app.put("/api/submissions/:id", function (req, res) {
    let id = Number(req.params.id);

    for (let i = 0; i < submissions.length; i++) {
        if (submissions[i].id === id) {
            submissions[i].status = req.body.status;
            saveSubmissions();
            res.json(submissions[i]);
            return;
        }
    }

    res.status(404).json({ message: "Submission not found." });
});

// Save updated submission data
function saveSubmissions() {
    fs.writeFileSync("data/submissions.json", JSON.stringify(submissions, null, 2));
}

// Start the Node.js server
app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});