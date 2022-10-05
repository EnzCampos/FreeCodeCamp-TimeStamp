// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
function getDate(date) {
  if (!date) {
    return {
        "unix": parseInt(Date.now()),
        "utc": new Date().toUTCString()
      }
  } else if (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gi.test(date)) {
    return {
      "unix" : parseInt(Date.parse(date)),
      "utc": new Date(date).toUTCString()
    }
  } else if (/^[0-9]+$/g.test(date)) {
    return {
      "unix" : parseInt(date),
      "utc": new Date(date * 1).toUTCString()
    }
  } else if (/^\d{2}\s(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}([,]\s\w{3})?$/g.test(date)) {
    return {
      "unix": Date.parse(date),
      "utc": new Date(date).toUTCString()
    }
  }
  return {
    "error": "Invalid Date"
  }
}

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req,res) {
  res.json(getDate(req.params.date));
})
app.get("/api", function (req,res) {
  res.json(getDate());
})
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
