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

/**
 * @description
 * Creating schema of collection
 */
var greeting_schema = new mongoose.Schema({
    name: {
        type: String,
        max: 256,
        min: 3,
        require: ['name is mandatory'],
        unique: false,
    },
    message: String,
    date: Date,
    isDelete: Boolean
})

/**
 * Creating model of Greetings Schema
 */
var greetings_model = mongoose.model("greetings", greeting_schema);
module.exports = greetings_model;


app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * @method
 * @url - /save_greeting
 * @description
 * Saving data into mongoose model by post menthod and using URl
 */
app.post('/save_greeting', function (req, res) {
    //Getting values and storing in variables
    var name = req.body.name;
    var message = req.body.message;

    //Crating instance of greetings_model
    var data = new greetings_model({
        "name": name,
        "message": message,
        "date": date_obj
    })
    // Storing data into collection model
    data.save(function (err, document) {
        if (err) throw err;
        console.log("Record inserted Successfully");
        res.send(document);
    });

})


/**
 * @method
 * @url - /edit_greeting
 * @description
 * Updating data into mongoose model by post menthod and using URl
 * and checking through ObjectId of document
 */
app.post('/edit_greeting', function (req, res) {
    //Getting values and storing in variables
    var name = req.body.name;
    var message = req.body.message;
    var object_id = req.body.object_id;
    
    var key = { "_id": mongoose.Types.ObjectId(object_id) };

    var data = {
        $set: {
            "name": name,
            "message": message,
            "date": date_obj
        }
    }

    //Updating values by ObjectId
    greetings_model.update(key, data, (err, document) => {
        if (err) throw err;
        // console.log(document);
        console.log("Record updated Successfully");
        res.status(200).json({ message: 'success' });
    });

})


/**
 * @method
 * @url - /remove_greeting
 * @description
 * Deleting data from mongoose model by post menthod and using URl
 * and checking through ObjectId of document
 */
app.post('/remove_greeting', function (req, res) {

    var object_id = req.body.object_id;
    var key = { "_id": mongoose.Types.ObjectId(object_id) };

    greetings_model.remove(key, function (err, document) {
        if (err) throw err;
        console.log("Record deleted Successfully");
        res.status(200).json({ message: 'success' });
    });

})


app.get("/show_greetings", function (req, res) {
    greetings_model.find({},null, {sort: {_id: -1}}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.send(allDetails)
        }
    })
})




app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3000)
