var express = require('express');
var path    = require("path");
//var router = express.Router();

var bodyParser = require('body-parser');
///* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

exports.test = function(req,res){

        console.log("success");
         body = req.body.sid;
        console.log("body " + body);
        res.status(200).send({
            "code": "200"
        });

/*
  if(err) {
    res.status(400).json({
      "code": "400"
    });
  }
  else {
    console.log("success");
    var body = req.body;
    console.log("body " + body);
    var sid = req.body.msg;
    console.log("sid" + sid);
    res.status(200).json({
      "code": "200"
    });
  } */
   };
