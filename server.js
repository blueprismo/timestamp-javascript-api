// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require('path');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
  res.sendFile(__dirname + '/public/style.css');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// api root
app.get("/api", (req,res)=>{
  res.json({unix: Date.now(), utc:Date()});
});

// api extension
/*app.get("/api/:time",function(req,res){
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
*/

// api2
// api extension
app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
