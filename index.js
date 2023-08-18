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
app.get("/api/:date_string", function (req, res) {
  let unixDate = new Date(req.params.date_string);
  const invalidDate = "Invalid Date";
  if (unixDate == invalidDate) {
    unixDate = new Date(Number(req.params.date_string));
    if (unixDate == invalidDate) {
      res.json({ error: "Invalid Date" });
    }
  }
  res.json({
    unix: Date.parse(unixDate),
    utc: unixDate,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
