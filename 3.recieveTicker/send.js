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
require('es6-promise').polyfill();
require('isomorphic-fetch');

init()
async function init () {

	const ticker = await getTicker('https://poloniex.com/public?command=returnTicker')

	for (const pair in ticker){
		sendToQueue(ticker[pair])
	}

}


function sendToQueue(ticker){

	//connect to RabbitMQ server
	amqp.connect('amqp://localhost', function(err, conn) {

		// Create a channel, which is where most of the API for getting things done resides
		conn.createChannel(function(err, ch) {
			
			// declare a queue
			var q = 'ticker1';

			// declare a queue as durable. this makes sure that RabbitMQ will never lose its queue.
			ch.assertQueue(q, {durable: true});

			// send ticker
			ch.sendToQueue(q, new Buffer(JSON.stringify(ticker)))
			console.log(ticker)

		});

	})

}


function getTicker(uri){
	return new Promise(resolve => {
		fetch(uri)
		.then(function(response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			resolve(data)
		});		
	})
}

