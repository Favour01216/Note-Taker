const path = require("path");

// routing
module.exports = (app) => {
  // creating routes

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
};
