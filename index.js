const express = require("express");
const cors = require("cors");
let students = require("./db");

const server = express();
server.use(cors());

const PORT = "8080";

server.use(express.json());

server.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

// GET / => array of students inside of ./db/index.js
server.get("/", (req, res) => {
  res.send(students);
});

// POST / => body {id, name, company, linkdedIn, picture, role} required
server.post("/", (req, res) => {
  const { id, name, company, linkedIn, picture, role } = req.body;
  if (!id || !name || !company || !linkedIn || !picture || !role) {
    return res.status(400).json({
      error: "id, name, company, linkedIn, picture, and role are all required",
    });
  }

  students.push(req.body);

  res.status(200).json({ status: "success" });
});

// DELETE / => body {id}
server.delete("/", (req, res) => {
  const { id } = req.body;

  students = students.filter((student) => student.id !== id);
  res.status(200).json({ status: "success" });
});
