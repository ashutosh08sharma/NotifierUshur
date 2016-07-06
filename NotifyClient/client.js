/**
 * Created by Ashutosh on 6/23/2016.
 */
var net = require('net'),
    JsonSocket = require('json-socket');
var port = 8888;
var host ='192.168.1.6';//'10.0.0.230';
var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);
var data = {
    url_socket: 'http://localhost:4000/add',
    data: {
        "sid": '12444',
        "tid": "1234"
    }
};

msg = JSON.stringify(data);
console.log("message :" + msg);

    socket.on('connect', function () {
        //Don't send until we're connected
        for (var i = 0; i <10; i++) {
            socket.sendMessage(msg);
        }
        socket.on('message', function (message, err) {

            if (err) {
                socket.end();
                console.log("error " + err);
            }
            else {
                console.log('The result is: ' + message.result);
            }
            socket.end();
        });
    });

    /*
     socket.on('close',function(close ,err) {
     if (err){
     console.log("error");
     }
     else if(close.connection == "closed"){

     socket.end();
     console.log("CLOSED");
     }


     });
     */


