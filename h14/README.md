## Cats vs Dogs Tweets
#### using Node.js, Socket.IO, Twitter streaming API, jQuery and Bootstrap

## are there more cat or dog lovers in Twitter?


using Twitter API and OAuth credentials
get tweets with 'cat' or 'dog'
broadcast cat or dog data if either is in tweet
also include Twitter image (avatar)


#### SERVER

```javascript
twit.stream('statuses/filter', {track: ['cat', 'dog']}, function(stream) {
	stream.on('data', function(data) {

		total++;	
		if (total % 10 == 0)  {
			if (data.text) {
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
			}
	}
	});
});

```

receive data using Socket.IO in client
display image and tweet
added some styling


#### CLIENT

```javascript

<script>
  var socket = io.connect();

  $(document).ready(function() {

    socket.on('cat', function (data) {
       $('#cat_tweets ul')
            .prepend('<li class="list-group-item">' + 
              '<img src="' + data.avatar + '"/>' +
             + '<strong>' + data.user + '</strong> : ' + data.text + 
                '</li>');

        var percent = (data.cat_count / data.total_count) * 100;
        $('#cat').html("Cat: " + percent  + " %" );
        $('#cat').css("width", percent + '%');            
    });

    socket.on('dog', function (data) {
       $('#dog_tweets ul')
            .prepend('<li class="list-group-item">' + 
              '<img src="' + data.avatar + '"/>' +
             + '<strong>' + data.user + '</strong> : ' + data.text + 
                '</li>'); 

        var percent = (data.dog_count / data.total_count) * 100;
        $('#dog').html("Dog: " +  percent  + " %" );
        $('#dog').css("width", percent + '%');
    });

  });

</script>
```



objective: Node.JS and Socket.IO consume data directly from Web
and broadcast to connected clients
using Twitter streaming API

Twitter standard API:
1.  open conn to API server
2.  send request for data
3.  receive data from API
4.  conn is closed


Twitter streaming API:
1.  open conn to API server
2.  send request for some data
3.  API pushes data to you
4.  conn is remained open
5.  API pushes more data as it becomes available

