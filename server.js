const { notes } = require("./db/db.json");
const express = require("express");
//const router = require("express").Router();
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 3001;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const createNewNote = (body, notesArray) => {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.post("/api/notes", (req, res) => {
  //sets note id
  //req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes);
  res.send(notes);
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
