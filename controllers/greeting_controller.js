const { request, response } = require("express");
const express= require("express");
var router=express.Router();

router.get('/', function(req, res) {
    res.json('Hello Sir')
});

module.exports=router;