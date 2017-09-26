const amqp = require('amqplib/callback_api');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
//credit bureau server
var rabbitmq = 'amqp://student:cph@datdb.cphbusiness.dk:5672'

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '\\imsogud.html');
})

//Database VM with IP 192.168.20.3


app.get('/', function(req, res){
    res.sendFile(__dirname + '\\routes\\imsogud.html');
});

app.post('/request', function(req, res){
    console.log(req.body);

    //GET CREDIT SCORE
    amqp.connect(rabbitmq, function(err, conn){
        conn.createChannel(function(err, ch){
            var q = 'MBCreditQueue';
            ch.assertQueue(q, {durable: false});

            ch.sendToQueue(q, Buffer.from(JSON.stringify(req.body)));
            console.log(" [x] Send request to credit score");
        });
        setTimeout(function(){ conn.close();}, 500);
    });

    res.redirect('/');
});

var server = app.listen(3333, function(){
    var host = 'localhost';
    var port = server.address().port;
    console.log("server running at http://%s:%s\n", host, port);
});