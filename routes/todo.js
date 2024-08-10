const router = require("express").Router();
let Todo = require("../models/todo");

// Get all todos
router.route("/").get((req, res) => {
  Todo.find({ user_id: req.user.id })
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});


// Add new todo
router.route("/add").post((req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    assigned_by: req.user.id,
    user_id: req.body.user_id,
    completed: false,
    updated_by: req.user.id,
    created_by: req.user.id,
    task_date: req.body.task_date,
  });

  newTodo
    .save()
    .then(() => res.json(req.body))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update todo by ID
router.route("/:id").put((req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {
    text: req.body.text,
    user_id: req.body.user_id,
    completed: req.body.completed,
    updated_by: req.user.id,
    assigned_by: req.user.id,
    task_date: req.body.task_date,
  })
    .then(() => res.json("Todo updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete todo by ID
router.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
