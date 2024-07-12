const router = require('express').Router();
let Todo = require('../models/todo');

// Get all todos
router.route('/').get((req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new todo
router.route('/add').post((req, res) => {
  const text = req.body.text;

  const newTodo = new Todo({ text });

  newTodo.save()
    .then(() => res.json('Todo added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update todo by ID
router.route('/:id').put((req, res) => {
  Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed })
    .then(() => res.json('Todo updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete todo by ID
router.route('/:id').delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todo deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
