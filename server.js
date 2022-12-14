const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./Develop/db/db.json");
var app = express();
var PORT = process.env.PORT || 3000;
//link to assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//to start html on page load up
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes html and it's "url"
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app
  .route("/api/notes")
  // Grab the notes list (this should be updated for every new note and deleted note.)
  .get(function (req, res) {
    res.json(database);
  })

  // Add a new note to the json db file.
  .post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "./Develop/db/db.json");
    let newNote = req.body;

    // This allows the test note to be the original note.
    let highestId = 99;
    // This loops through the array and finds the highest ID.
    for (let i = 0; i < database.length; i++) {
      let individualNote = database[i];

      if (individualNote.id > highestId) {
        // highestId will always be the highest numbered id in the notesArray.
        highestId = individualNote.id;
      }
    }
    // This assigns an ID to the newNote.
    newNote.id = highestId + 1;
    // We push it to db.json.
    database.push(newNote);

    // Write the db.json file again.
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Your note was saved!");
    });
    // Gives back the response, which is the user's new note.
    res.json(newNote);
  });

app.delete("/api/notes/:id", function (req, res) {
  let jsonFilePath = path.join(__dirname, "/db/db.json");
  // request to delete note by id.
  for (let i = 0; i < database.length; i++) {
    if (database[i].id == req.params.id) {
      // Splice takes i position, and then deletes the 1 note.
      database.splice(i, 1);
      break;
    }
  }
  // Write the db.json file again.
  fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Your note was deleted!");
    }
  });
  res.json(database);
});
//event listener this sets up the server.
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
