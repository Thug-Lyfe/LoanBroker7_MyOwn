var amqp = require('amqplib/callback_api');
var soap = require('soap');
var creditBureau = 'http://138.68.85.24:8080/CreditScoreService/CreditScoreService?wsdl'
var rabbitmq = 'amqp://student:cph@datdb.cphbusiness.dk:5672'

amqp.connect(rabbitmq, function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'MBCreditQueue';
        ch.assertQueue(q, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());

            var request = JSON.parse(msg.content);

            getCreditScore(request.ssn, function(result){ 
                console.log("callback:" + result);
                request.creditScore = result.toString();
                console.log(request);
                getBanks(request);
            });
            

        }, {
            noAck: true
        });

    });
});
function getCreditScore(ssn, callback) {
    soap.createClient(creditBureau, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            client.creditScore({ssn: ssn}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result.return);
                    
                    callback(result.return);

                }
            });
        }

    });
};

function getBanks(request) {
    amqp.connect(rabbitmq, function (err, conn) {
        conn.createChannel(function (err, ch) {
            var q = 'getBanksQueue';
            ch.assertQueue(q, {
                durable: false
            });

            ch.sendToQueue(q, Buffer.from(JSON.stringify(request)));
            console.log(" [x] Send request to credit score");
        });
        setTimeout(function () {
            conn.close();
        }, 500);
    });
}