var mongoose = require('mongoose');

var greetings_schema = new mongoose.Schema({
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
var greetings_model = mongoose.model("greetings", greetings_schema);
