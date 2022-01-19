//----------import dependencies start -------------------------------------------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
//----------import dependencies end ---------------------------------------------


//----------mongodb connection start --------------------------------------------
mongoose.connect("mongodb://localhost:27017/assignmentOne");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
//----------mongodb connection end ----------------------------------------------


//---------import route files start ---------------------------------------------
const apiRoute = require('../backend/routes/api.routes');
//---------import route files end -----------------------------------------------


//----------use dependencies start ----------------------------------------------
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/assignmentOne/dist/assignment-one/"));
//----------use dependencies end ------------------------------------------------


//----------route handler start -------------------------------------------------
app.use('/api', apiRoute);
//----------route handler end ---------------------------------------------------


//----------for invalid requests start ------------------------------------------
app.all('*', async (req, res) => {
    res.sendFile(process.cwd() + "/assignmentOne/dist/assignment-one/index.html")
});
//----------for invalid requests end --------------------------------------------

module.exports = app;



