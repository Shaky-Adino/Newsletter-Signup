
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.email;

      const data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]
      };

      const jsonData = JSON.stringify(data);

      const url = "https://us4.api.mailchimp.com/3.0/lists/3308c13a71";

      const options = {
        method: "POST",
        auth: "angela1:bc6bc9f13d6888591bf8e58c658cd9e1-us4"
      }

      const request = https.request(url, options, function(response) {

        response.on("data", function(data) {

          console.log(JSON.parse(data));
});


          if (response.statusCode === 200)  {
            console.log("Success");
            res.sendFile(__dirname + "/success.html");
          } else {
            console.log("failure");
            res.sendFile(__dirname + "/failure.html");
          }


        });

        request.write(jsonData);
        request.end();


      });

      app.post("/failure", function(req, res) {
        res.redirect("/");
      });

      app.listen(process.env.PORT || 3000, function() {
        console.log("Server is running on port 3000");
      });

      //bc6bc9f13d6888591bf8e58c658cd9e1-us4

      //3308c13a71
