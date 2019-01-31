var express = require('express');
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host    :'localhost',
    user    :'dnajar2',
    database:'join_us',
    password:process.env.MYSQL_PW
})


// Select 
app.get("/", function(req, res){
    // Find users in DB
    
    // Respond with the count of users
    var q = "SELECT COUNT(*) AS count FROM users";
    // Respond with the count of users
    connection.query(q, function(err, results){
       if(err) throw err;  
       var count = results[0].count;
        res.render("home",{count:count})
    });
    
})
// Insert
app.post("/register", function(req, res){
    
    if(req.body.email !== ""){
         var person = {
            email:req.body.email
        }
        
        connection.query('INSERT INTO users SET ?',person, function(err, results){
          if(err) throw err;  
          res.redirect("/");
        });   
    }
})

app.get("/joke", function(req,res){
    var joke = "What do you call a dog that does magic tricks? <em>A labracadabrador.</em>";
    res.send(joke);
});

app.get("/random_num", function(req,res){
    var num = Math.floor( Math.random()*10 ) + 1
    
    res.send("Your lucky number is " + num);
});

app.listen(process.env.PORT, function(){
    console.log("Server running on" +process.env.PORT +"!")
})