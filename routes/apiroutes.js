const path = require("path");
const fs = require("fs");
var uniqid = require("uniqid");
module.exports = (app) => {
  app.post("/api/notes", (req, res) => {
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    res.json(db);
    // creating body for note
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      // creating unique id for each note
      id: uniqid(),
    };
    // pushing created note to be written in the db.json file
    db.push(userNote);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.json(db);
  });
  app.delete("/api/notes/:id", (req, res) => {
    // reading notes form db.json
    let db = JSON.parse(fs.readFileSync("db/db.json"));

    let deleteNotes = db.filter((item) => item.id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  });
};
