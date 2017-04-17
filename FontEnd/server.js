var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

module.exports = app;

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});