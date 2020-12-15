/**
 * Including required packages and files
 */
var express = require("express");
var bodyParser = require("body-parser");

var date_obj = new Date();      //Storing Date into a variable

/**
 * Setting Mongoose with MongoDB
 */
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/greeting_app', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express();        //assigning express to a variable

