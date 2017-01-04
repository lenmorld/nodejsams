// SIMPLE STREAM, USING EXPRESS
var twitter = require('ntwitter'),
	express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);


// cat and dog counter
var cat=0, dog=0, total=0;

// set port to listen to
app.set('port', process.env.PORT || 3000);
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}
// serve some ROUTES
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});



io.sockets.on('connection', function(socket) {
	socket.emit('welcome', {text: 'HELLO'});
});

var twit = new twitter(
		{
			consumer_key: 'Oqo1RSPnYVqcTQMezj0RTZqGF',
			consumer_secret: 'HNekgTcA5sTwD0JOYTDdBRwuytbJHaxKCrzZVaXjjd5iiFSnPA',
			access_token_key: '711664708756107264-ZTDW7lbbTTQ9fxtgBu17AYbXdXyM4EI',
			access_token_secret: 'B1cf1M7u6rruBfZ4GfcN9vg1OXqeM2aSiqGWtgFzszwfw'
		}
	);

twit.stream('statuses/filter', {track: ['cat', 'dog']}, function(stream) {
	stream.on('data', function(data) {

		total++;	
		if (total % 10 == 0)  {
			if (data.text) {
				// console.log(data);
				// console.log(data.user.screen_name + ':' + data.text);

				// broadcast tweet to all clients
				// io.sockets.volatile.emit('tweet', {
				// 	user: data.user.screen_name,
				// 	text: data.text
				// });

				
				
				// if cat tweet
				if (data.text.match(/cat/i)) {
					cat++;
					io.sockets.volatile.emit('cat', {
						user: data.user.screen_name,
						text: data.text,
						avatar: data.user.profile_image_url_https,
						cat_count: cat,
						total_count: cat+dog
					});

				}
				
				// if dog tweet
				if (data.text.match(/dog/i)) {
					dog++;
					io.sockets.volatile.emit('dog', {
						user: data.user.screen_name,
						text: data.text,
						avatar: data.user.profile_image_url_https,
						dog_count: dog,
						total_count: cat+dog
					});

				}

				// io.sockets.volatile.emit('stats', {
				// 	cat_count: cat,
				// 	dog_count: dog,
				// 	total_count: cat+dog,
				// 	all_tweets: total
				// });

			}

	}




	});
});




server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





// // SIMPLE STREAM, NO EXPRESS
// var twitter = require('ntwitter');

// var twit = new twitter(
// 		{
// 			consumer_key: 'Oqo1RSPnYVqcTQMezj0RTZqGF',
// 			consumer_secret: 'HNekgTcA5sTwD0JOYTDdBRwuytbJHaxKCrzZVaXjjd5iiFSnPA',
// 			access_token_key: '711664708756107264-ZTDW7lbbTTQ9fxtgBu17AYbXdXyM4EI',
// 			access_token_secret: 'B1cf1M7u6rruBfZ4GfcN9vg1OXqeM2aSiqGWtgFzszwfw'
// 		}
// 	);

// twit.stream('statuses/filter', {track: ['cat', 'dog']}, function(stream) {
// 	stream.on('data', function(data) {
// 		console.log(data);
// 	});
// });