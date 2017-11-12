// https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/receive.js

var amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, conn) {

	// Create a channel, which is where most of the API for getting things done resides
	conn.createChannel(function(err, ch) {

		/**
		* queue, q must match send.js q
		* Note that we declare the queue here, as well. Because we might start the consumer before the publisher, we want to make sure the queue exists before we try to consume messages from it.
		*/
		var q = 'queue1';

		// declare a queue as durable. this makes sure that RabbitMQ will never lose its queue.
		ch.assertQueue(q, {durable: true});

		console.log(` [ ] Waiting for messages in ${q}...`);

		// deliver the message from the queue
		ch.consume(q, function(msg) {
			console.log(` [x] Received: ${msg.content.toString()}`);
		}, {noAck: true});

	});

});