// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// api root
app.get("/api/timestamp", (req,res)=>{
  res.json({unix: Date.now(), utc:Date()});
});

// api extension
app.get("/api/timestamp/:time",function(req,res){
  // evaluate regex.
  var regex1 = new RegExp('^....\-..\-..$')
  var regex2 = new RegExp('^.............$')

  var date = new Date(req.params.time); // the one we have
  // expression 1, date = yyyy-mm-dd
  if ( regex1.test(req.params.time) ){
    // let's treat this! :) 
    var date_utc = date.toUTCString(); // convert to iso string.
    var date_unix = date.valueOf(); // convert to unix date.
    res.json({unix: date_unix, utc: date_utc});
  }
  else {
    var dateObject = new Date(req.params.time);
    if (dateObject.toString() === "Invalid Date"){
      res.json({ error: "Invalid Date" });
      }
    else {
      res.json({unix: dateObject.valueOf(), utc:dateObject.toUTCString()});
      }
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
