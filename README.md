## how it works
```
  sender   == task   == producer

  reciever == worker == consumer

	  	         |-----------|	    |------> recieve1
  send ----->|  queue1   |-----|
	  	         |-----------|     |------> recieve2
```

### install
    brew update
    brew install rabbitmq
    npm i

### run the server
	cd rabbitmq_server-3.6.12/sbin
	./rabbitmq-server

### stop the server
	cd rabbitmq_server-3.6.12/sbin
	./rabbitmqctl stop

### send message (open 1 console)
	cd 1.recieveOne
	node send.js

### recieve message (open multiple console)
	cd 1.recieveOne
	node recieve.js