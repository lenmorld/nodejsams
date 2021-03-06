# CHAT SERVER 

### h13/messaging using Node.js, Socket.IO,and jQuery

##### based on Sams Teach Yourself Node.js in 24 Hours - George Ornbo

##### https://github.com/shapeshed/nodejsbook.io.examples 

objective: send data from clients to Socket.IO server and broadcast it to other clients

- final version so far is messaging
- client-server architecture

	Client - index.html
	Server - app.js

- saves nicknames on server

- **Callbacks** allow server to return some info to client after message has been sent
	 this allows client to know whether nickname was already in the nickname list and act accordingly

Logic:
1. User submits nickname from client side
2. Server receives nickname, checks if exist
3. If exists, server issues a callback that says false
4. else, true
5. client receives callback data and informs user


Client

```javascript 
	// emit with CALLBACK
	// pass nickname to server from input val
	socket.emit('nickname', nickname.val(), function(data) {
	    if (data) {
	      console.log('Nickname set successfully');
	      setNicknameForm.hide();   // jquery hide

	      //show chat
	      $('#send_message').show();

	    }
	    else {
	      setNicknameForm.prepend('<p>Sorry - that nickname is already taken. </p>');

	      //show chat
	      $('#send_message').hide();
	    }
	}); 
```


Server

```javascript
	// when client sends nickname, add CALLBACK return
	socket.on('nickname', function(data, callback) {

	if(nicknames.indexOf(data) !== -1) {    // nickname exists already
		callback(false);
	}
	else {
		callback(true);
		console.log('User has connected ', data);
		nicknames.push(data);
		console.log(nicknames);
		socket.nickname = data; 	// track user for disconnect	
	}

		// broadcast list of nicknames
		io.sockets.emit('nicknames', nicknames);
	});
```


- still needs a little design