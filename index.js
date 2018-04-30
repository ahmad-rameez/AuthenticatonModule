var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('cookie-session');
var MongoStore = require('connect-mongo')(session);
var mongodb = require('mongodb');


var MongoClient = mongodb.MongoClient;

var url = process.env.MONGOLAB_URI;

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    }

});

// //connect to MongoDB
// mongoose.connect('mongodb://localhost/MYTA_BUSINESS_SOL',{useMongoClient: true});
// var db = mongoose.connection;

//handle mongo error
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
// });

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  // store: new MongoStore({
  //   mongooseConnection: url;
  // })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serve static files from template
app.use(express.static(__dirname + '/templateLogReg'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// // listen on port 3000
// app.listen(3000, function () {
//   console.log('Express app listening on port 3000');
// });


app.listen(process.env.PORT || 3000, function(){
  //console.log('listening on', app.address().port);
});