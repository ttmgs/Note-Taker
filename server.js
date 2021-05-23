// require dependencies
const path = require('path');
const express = require('express');

// setting the express app & port
const app = express();
var PORT = process.env.PORT || 3001;

// json data parsing
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

// using public folder for static directory
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/public')));


// requiring the api requests file (post, get, delete)
require('./routes/api-routes')(app);


// listening port
app.listen(PORT, function() {
  console.log(`port is running on http://localhost:${PORT}`)
});










































