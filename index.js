// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({ greeting: "hello API" });
// });

// date endpoint
app.get("/api/:date_string?", function (req, res) {
  let dateString = req.params.date_string;
  let dateObject = new Date();
  if (dateString) {
    dateObject = new Date(dateString);
  }
  const invalidDate = "Invalid Date";
  if (dateObject == invalidDate) {
    dateObject = new Date(Number(req.params.date_string));
    if (dateObject == invalidDate) {
      res.json({ error: invalidDate });
    }
  }
  let unixDate = Date.parse(dateObject);
  let utcDate = dateObject.toUTCString();
  res.json({
    unix: unixDate,
    utc: utcDate,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
