const path = require('path');
const fs = require('fs');
const express = require('express');
const db = require('./db/db.json');


// express app
const app = express();
// port
var PORT = process.env.PORT || 3001;

// json data parsing
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

// using public folder for static directory
app.use(express.static(path.join(__dirname, '/public')));



// get request to send all saved notes
app.get('/api/notes', (req, res) => {
  res.send(db)
})

// get request to return index.html file

app.get('/*',(req,res) => {
   res.sendFile(path.join(__dirname,'./public/index.html'));
});



// post request to save notes
app.post('/api/notes', (req, res) => {

  // assigning unique id
  req.body.id = createNewId()

  // pushing new note to the array in db
    db.push(req.body.id);

    // ternary operatory assigned to result & if true then sends json response otherwise return status code error
   const result = writeToDb() ? res.json(req.body) : res.status(500).send('Something went wrong');
   return(result)
})



// delete a note from db
app.delete( `/api/notes/:id`, (req, res) => {
  // finding the note with the id
  var deleteId = db.find((e)=> e.id = req.params.id);
  // if id is found delete from database
  deleteId ? res.send(`${deleteId.id}` + "was sucuessfully deleted") : res.status(500).send('Unable to delete note')
})









//  `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
// fs.readFile(__dirname, '/db', 'db.json'), (err, jsonString) => {
//   if (err) {
//       console.log("File read failed:", err)
//       return
//   }
//   console.log('File data:', jsonString) 
// })








app.listen(PORT, function() {
  console.log(`port is running on http://localhost:${PORT}`)
});




// generate random id
function createNewId() {
  var newId = null;
  while(true) {
    newId = Math.floor(Math.random()*999999999999);
    // if doesnt exist then return id else loop
    if(!db.find((e)=> e.id == newId)) {
      return newId;
    }
  }
}



function writeToDb() {
  fs.writeFile("/db", 'db.json'), JSON.stringify(db), err=> {
    return err;
  }
}