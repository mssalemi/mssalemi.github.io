const express = require("express");
const path = require("path");

const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require("cors");
const { response } = require("express");
app.use(cors());

// Serve up the correct folder
console.log(__dirname);
const publicDirectory = path.join(__dirname, "/website");
console.log(publicDirectory);
app.use(express.static(publicDirectory));

const port = 3000;
const server = app.listen(port, ()=>{
  console.log(`running on localhost: ${port}`)
});

const projectData = [];
// GET REQUEST
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST method route
app.post('/add', (req, res) => {
  console.log(`POST REQUEST RECEIVE WITH DATA: \nTemp:${req.body.temp} \nDate: ${req.body.temp} \nUser Input: ${req.body.userInput}`);
  projectData.push(req.body);
  console.log("ALL DATA -");
  console.log(projectData)
});




