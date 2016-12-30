
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();


mongoose.connect('mongodb://localhost/todo_development');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Task = new Schema({
	task: String
});

var Task = mongoose.model('Task', Task);

// mongoose.connect('mongodb://localhost/todo_development', function(err) {
//   if (!err) {
//     console.log('connected to MongoDB');
//   } else {
//     throw err;
//   }
// });


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// tasks index route, pass results to view layer
app.get('/tasks', function(req, res) {
	Task.find({}, function (err, docs) {
		res.render('tasks/index', {
			title: 'Todos index view',
			docs: docs
		});
	});
});


//new task
app.get('/tasks/new', function(req, res) {
	res.render('tasks/new.jade', {
		title: 'New Task'
	});
});


app.post('/tasks', function(req, res) {
	var task = new Task(req.body.task);
	task.save(function (err) {
		if (!err) {
			res.redirect('/tasks');
		}
		else {
			res.redirect('/tasks/new');
		}
	});
});


//edit task
app.get('/tasks/:id/edit', function(req, res) {
	// with findById, record can be found and a route can be created for the edit form
	// route captures id parameter so record can be retrieved from MongoDB
	// route also passestask to the view layer
	Task.findById(req.params.id, function (err, doc) {
		res.render('tasks/edit', {
			title: 'Edit Task View',
			task: doc
		});
	});
});

//receive PUT request and update record
app.put('/tasks/:id', function(req, res){
  Task.findById(req.params.id, function (err, doc){
    doc.updated_at = new Date();
    doc.task = req.body.task.task;
    doc.save(function(err) {
      if (!err){
        res.redirect('/tasks');
      }
      else {
        console.err(err);
      }
    });
  });
});



// delete
app.delete('/tasks/:id', function(req, res) {
	Task.findOne({ _id: req.params.id}, function(err, doc) {
		doc.remove(function() {
			res.redirect('/tasks');
		});
	});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
