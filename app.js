const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { func } = require("prop-types");
const https = require("https");
const { url } = require("inspector");
const { write } = require("fs");
require("dotenv/config");


const app =express();

app.use(express.static("public"));  //to acces all the static files 
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.get("/",function(req,res){
  res.render("signup");
});

app.post("/",function(req,res){
 const firstName = req.body.fname;
 const lastName = req.body.lname;
 const mail = req.body.mail;

 var data = {
   members: [
     {
      email_address: mail,
      status : "subscribed",
      merge_fields : {
          FNAME: firstName,
          LNAME: lastName
      }
     }
    ]
}

const jsonData = JSON.stringify(data);
 //console.log(firstName , lastName , mail);
 const url = "https://us6.api.mailchimp.com/3.0/lists/2522500ad9";
 const options = {
   method : "POST",
   auth : "Rhituraj:cf9fd9a14e7a2a96fec6bc1e001b645a-us6"
 }
 const request = https.request(url,options,function(response){

if(response.statusCode===200){
  res.render("success");
}
else{
  res.render("failure");
}

   response.on("data" ,function(data){
     console.log(JSON.parse(data));
   })
 })

 request.write(jsonData);
 request.end();


});

app.post("/failure" ,function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 8000 ,function(){
  console.log("server 8000 OK ");
});


//API key
//cf9fd9a14e7a2a96fec6bc1e001b645a-us6
//audience id
//
