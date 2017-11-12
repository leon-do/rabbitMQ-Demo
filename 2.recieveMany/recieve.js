/**
 https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html

 @purpose send many messages

sender   == task   == producer

reciever == worker == consumer

	  		|-----------|	  |------> recieve1
send ----->|  queue1   |-----|
	  	  |-----------|     |------> recieve2


send = 
[x] message sent: message-0
[x] message sent: message-1
[x] message sent: message-2
[x] message sent: message-3
[x] message sent: message-4
[x] message sent: message-5


recieve1 =
[x] Received: message-0
[x] Received: message-2
[x] Received: message-4

recieve2 =
[x] Received: message-1
[x] Received: message-3
[x] Received: message-5

*/

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

		// deliver the message from the queue
		ch.consume(q, function(msg) {
			console.log(`received: ${msg.content.toString()}`);
			// If a worker dies, we'd like the task to be delivered to another worker. An ack(nowledgement) is sent back by the consumer to tell RabbitMQ that a particular message has been received, processed and that RabbitMQ is free to delete it.
			ch.ack(msg);

		}, 
		// this code ensures that even if you kill a worker using CTRL+C while it was processing a message, nothing will be lost. Soon after the worker dies all unacknowledged messages will be redelivered.
		{noAck: false}
		);

	});

});