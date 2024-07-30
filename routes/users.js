const router = require("express").Router();
let User = require("../models/user");

// Route to get users filtered by username
router.get("/", (req, res) => {
  const { username } = req.query;
  let query = {};

  if (username) {
    query = { username: { $regex: new RegExp(username, "i") } };
  }

  User.find(query, 'username id')
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
