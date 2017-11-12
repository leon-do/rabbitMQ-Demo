###install
    brew update
    brew install rabbitmq
    npm i

###run the server
	cd rabbitmq_server-3.6.12/sbin
	./rabbitmq-server

###stop the server
	cd rabbitmq_server-3.6.12/sbin
	./rabbitmqctl stop

###send message (open three consoles)
	cd 1.recieveOne
	node send.js

###recieve message (open 1 console)
	cd 1.recieveOne
	node recieve.js