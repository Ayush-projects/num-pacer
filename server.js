var express = require("express");
var app= express();
var fs= require("fs");
var port = process.env.PORT || 3000;
app.use(express.json());
app.set("view engine","ejs")
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.get("/",(req ,res)=>{

fs.readFile("highscore.txt",(error,data)=>{
  
    var score = data.toString();
    res.render("game", {adi: score 
        +" Seconds"});
})
})

app.get("/gameOver",(req ,res)=>{

    fs.readFile("highscore.txt",(error,data)=>{
  
        var score = data.toString();
        res.render("gameover", {adi: score +" Seconds"});
    })


});
app.post("/scoreUpdate", (req,res)=>{
    fs.readFile("highscore.txt",(error,data)=>{
  
        var score = data.toString();
        var cscore = req.body.cscore;
        if(parseInt(cscore)<parseInt(score))
        {
            fs.writeFile("highscore.txt", cscore.toString(), (error)=>{
                     if(error)
                     console.log(error);
                     else
                     console.log("Score Updated");
                     res.json({score: "updated"});
            });
        }
        else
        {
            res.json({score: "updated"});
            

        }
        
    })
 
  
})
app.get("/gameWin",(req ,res)=>{

    fs.readFile("highscore.txt",(error,data)=>{
  
        var score = data.toString();
        res.render("gamewin", {adi: score +" Seconds"});
    })


})



app.listen(port,function(error){
    if(error){console.log("error")}
    else{console.log("Server is Running")}
})
