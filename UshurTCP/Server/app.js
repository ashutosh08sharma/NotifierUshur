///**
// * Created by Ashutosh on 6/22/2016.
// */
var net = require('net'),
    JsonSocket = require('json-socket');
var express = require('express');
var request = require('request');
var port = 8888;
var server = net.createServer();
server.listen(port);
console.log("listening at port " + port);
server.on('connection', function (socket) {
//This is a standard net.Socket
    socket = new JsonSocket(socket);
    socket.on('message', function (message, err) {
        if (err) {
            socket.sendEndError(new err("something went wrong"));
            console.log("Error" + err);
        }
        else {
            var result = JSON.parse(message);
            console.log(result);
            url = result.url_socket;
            msg = JSON.stringify(result.data);
            var finalmsg = JSON.parse(msg);
            console.log("msg" + msg);
            console.log("url " + url);
            //Post request
            request({
                uri: url,
                method: "POST",
                json: finalmsg
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("Body" + body);
                    console.log("response.statusCode: " + response.statusCode);
                    socket.sendMessage({result: msg}, function (err) {
                        if (err) {
                            socket.sendEndError(new err("Error while sending"));
                            console.log("ERROR!!!");
                            //return err;
                        }
                        else {
                            console.log("Send Successfully ");
                        }
                    });
                }
                else {
                    console.log("error: " + error);
                    console.log("response.statusCode: " + response.statusCode);
                    console.log("response.statusText: " + response.statusText);
                }
            });

        }
    });
});

