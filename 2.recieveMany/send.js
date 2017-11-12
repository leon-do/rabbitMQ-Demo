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


//connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, conn) {

	// Create a channel, which is where most of the API for getting things done resides
	conn.createChannel(function(err, ch) {
		
		// declare a queue
		var q = 'queue1';

		// declare a queue as durable. this makes sure that RabbitMQ will never lose its queue.
		ch.assertQueue(q, {durable: true});

		// publish MANY messages to the queue
		for (let i = 0; i < 10; i++){
			const msg = `message-${i}`
			ch.sendToQueue(q, new Buffer(msg));	
			console.log(`message sent: ${msg}`);	
		}


	});

	// close the connection and exit;
	// setTimeout(function() { conn.close(); process.exit(0) }, 50000);

})
