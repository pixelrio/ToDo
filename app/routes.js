var Todo = require('./models/todo');

module.exports = function(app) {
	app.get('/api/todos', function(req, res) {
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			//returns all todos
			res.json(todos);
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos once we create one
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// deletes a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos as soon as we create one
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	app.get('*', function(req, res) {
		//load single page view
		res.sendfile('./public/index.html'); 
	});
};