const { user } = require("../../db/models");
const bcyrpt = require("bcrypt");
const saltRounds = 5;

module.exports = (req, res) => {
  const { email, username, password } = req.body;
  bcyrpt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcyrpt.hash(password, salt, function (err, hash) {
      if (err) return next(err);
      password = hash;
      next();
    });
  });

  if (!email || !username || !password) {
    res.status(422).send("insufficient parameters supplied");
  }
  user
    .create({
      email,
      username,
      password,
    })
    .then(() => {
      res.status(201).send("Sign Up Success!");
    });
};
