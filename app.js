const express = require('express');
const bodyParser = require('body-parser');
const request = require ("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){

  res.sendFile(__dirname + "/singup.html")
  console.log(req);
});

app.post("/", function (req,res) {

const firstName = req.body.firstName;
const lastName = req.body.LastName;
const email = req.body.email;

const data = {
  members: [{
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,
         LNAME: lastName,
       }
     }]
};

const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/18302e76db";
const options ={
  method: "POST",
  auth:"bassm:3b3a25bda20755a43d23ed0e86cb8f7c-us17"
}

const request = https.request(url, options, function (response) {
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function (data) {
    //console.log(JSON.parse(data));
  })
});

request.write(jsonData);
request.end();
});

app.post("/failure", function (req,res) {
  res.redirect("/")
})




app.listen(process.env.PORT || 3000, function () {
  console.log("The server is running");
})


//apiKwy = 3b3a25bda20755a43d23ed0e86cb8f7c-us17

//audience id = 18302e76db.
