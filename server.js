// Mahmoud - Node.js Backend
// Gianny - AJAX API Integration

const express = require("express");

const db = require("./db");

const app = express();



app.use(express.json());


app.use(express.static(__dirname));


app.get("/api/submissions", async function (req, res) {
    try {
        const [submissions] = await db.query(
            "SELECT * FROM submissions"
        );

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post("/api/submissions", async function (req, res) {
    try {
        const { submittedBy, title, category, description } = req.body;

        if (!submittedBy || !title || !category || !description) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const [result] = await db.query(
            "INSERT INTO submissions (submittedBy, title, category, description, status) VALUES (?, ?, ?, ?, ?)",
            [submittedBy, title, category, description, "pending"]
        );

        res.status(201).json({
            id: result.insertId,
            submittedBy: submittedBy,
            title: title,
            category: category,
            description: description,
            status: "pending"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put("/api/submissions/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const status = req.body.status;

        if (status !== "approved" && status !== "rejected") {
            return res.status(400).json({
                message: "Invalid submission status."
            });
        }

        const [result] = await db.query(
            "UPDATE submissions SET status = ? WHERE id = ?",
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Submission not found."
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM submissions WHERE id = ?",
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete("/api/submissions/:id", async function (req, res) {
    try {
        const [result] = await db.query(
            "DELETE FROM submissions WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Submission not found."
            });
        }

        res.json({ message: "Submission deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get("/api/members", async function (req, res) {
    try {
        const [members] = await db.query(
            "SELECT * FROM members"
        );

        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/members", async function (req, res) {
    try {
        const { full_name, email } = req.body;

        if (!full_name || !email) {
            return res.status(400).json({
                message: "Name and email are required."
            });
        }

        const [result] = await db.query(
            "INSERT INTO members (full_name, email) VALUES (?, ?)",
            [full_name, email]
        );

        res.status(201).json({
            id: result.insertId,
            full_name: full_name,
            email: email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put("/api/members/:id", async function (req, res) {
    try {
        const { full_name, email } = req.body;

        if (!full_name || !email) {
            return res.status(400).json({
                message: "Name and email are required."
            });
        }

        const [result] = await db.query(
            "UPDATE members SET full_name = ?, email = ? WHERE id = ?",
            [full_name, email, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Member not found."
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM members WHERE id = ?",
            [req.params.id]
        );

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete("/api/members/:id", async function (req, res) {
    try {
        const [result] = await db.query(
            "DELETE FROM members WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Member not found."
            });
        }

        res.json({ message: "Member deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


async function startServer() {
    try {
        const connection = await db.getConnection();

        console.log("Connected to Bridges MySQL database!");
        connection.release();

        app.listen(3000, function () {
            console.log("Server running at http://localhost:3000");
        });
    } catch (error) {
        console.log("Database connection failed:", error.message);
        process.exitCode = 1;
        await db.end();
    }
}

startServer();
