// https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/send.js

var amqp = require('amqplib/callback_api');


//connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, conn) {

	// Create a channel, which is where most of the API for getting things done resides
	conn.createChannel(function(err, ch) {
		
		// declare a queue
		var q = 'queue1';
		
		// the message
		var msg = `a_message_from_send.js_${Math.random()}`;

		// declare a queue as durable. this makes sure that RabbitMQ will never lose its queue.
		ch.assertQueue(q, {durable: true});

		// publish a message to the queue
		ch.sendToQueue(q, new Buffer(msg));

		console.log(`[x] message sent: ${msg}`);
	});

	// close the connection and exit;
	setTimeout(function() { conn.close(); process.exit(0) }, 50000);

})