const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  // setting up the /api/notes route and the notes variable
  fs.readFile("./db/db.json", "utf8", (err, data) => {
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

    // retrieves a note with specified id
    app.get("/api/notes/:id", (req, res) => {
     // display json for the notes array indices of the provided id
     res.json(notes[req.params.id])
    });

    // deletes a note with the specified id
    app.delete("/api/notes/id", (req, res) => {
      notes.splice(req.params.id, 1)
      updateDb();
      console(`note deleted with id ${req.params.id}` )
    });

    // display the notes.html page on the /notes route
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"))
    });

    // displays the index.html file when * or any other routes are accessed
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'))
    });

    // update the json file whenever a file gets added or deleted
    function updateDb() {
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        return true;
      });
    }
  });
}

