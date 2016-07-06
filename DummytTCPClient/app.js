var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('./routes/MongoDb');
var routes = require('./routes/index');
var MongoDb =  require('./routes/MongoDb');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var user = require('./routes/users.js');
app.use('/', routes);
app.set('port', process.env.PORT || 4000);

app.post("/add",user.test);

app.get('/MongoDB', MongoDb.connection);
// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handlers

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

module.exports = app;




//      console.log("hi");
//       test = req.body(JSON.parse(sid));
//    result =req.body(msg);
//      //  var sid = result.sid;
//      console.log("test" + test);
//    console.log("resutl" + result);
//     console.log("sid" + sid);
//      console.log("body" + req.body);
//    var url = "mongodb://localhost:27017/test";
//      connect.connection(url,function(err,conn) {
//        console.log("After connection to database");
//        if (!err) {
//          var userss = conn.collection('user', function (error,success) {
//            if (!error) {
//              console.log("Got the user collection");
//              res.status(200).send({
//                code :"200",
//                message:"success"
//              });
//
//            }
//            else {
//              res.status(400).send({
//                code :"400",
//                message:"Failed"
//              });
//              console.log("Error in finding the collection");
//            }
//          });
//          userss.insert({"sid":"sid"}, function(err,success){
//            if(err) {
//              console.log("Error in insert");
//              res.status(400).send({
//                code: "400",
//                message: "success"
//              });
//            }
//            else
//            {
//              console.log("Insert was successful");
//              res.status(200).send
//              ({
//                code:"200",
//                message : "success"
//              });
//            }
//          });
//
//        }
//      });
//    }