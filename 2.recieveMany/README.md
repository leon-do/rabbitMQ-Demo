run the server
	cd rabbitmq_server-3.6.12/sbin
	./rabbitmq-server

stop the server
	./rabbitmqctl stop 


send message (open 1 consoles)
	node send.js

recieve message (open 2 consoles)
	node recieve.js
	node recieve.js