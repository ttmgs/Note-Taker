const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  // setting up the /api/notes route and the notes variable
  fs.readFile("/db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);

    // api route
    app.get("/api/notes", (req, res) => {
      res.json(notes);
    });

    // setting up the /api/notes post route
    app.post("/api/notes", (req, res) => {
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log(`new note ${newNote.title} was added`)
    });












    // update the json file whenever a file gets added or deleted
    function updateDb() {
      fs.writeFile("/db/db.json", JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
