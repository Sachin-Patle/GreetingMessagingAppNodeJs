var express=require("express"); 
var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
// mongoose.connect('mongodb://localhost:27017/greeting_app',{ useNewUrlParser: true }); 
mongoose.connect('mongodb://localhost:27017/greeting_app',{ useNewUrlParser: true }); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  
var app=express();
  
  
app.use(bodyParser.json()); 
app.use(express.static(__dirname + "/public"));
// app.use(app.router);
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.get('/signup', function(req,res){ 
    var name = req.body.name;
    var pass = req.body.message;
  
    var data = { 
        "name": name,
        "message":pass
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('public/signup_success.html'); 
}) 
  
  
app.post('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('index.html'); 
}).listen(3000) 
  
  
console.log("server listening at port 3000"); 