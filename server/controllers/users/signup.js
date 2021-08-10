const { user } = require("../../db/models");
const bcyrpt = require("bcrypt");
const saltRounds = 5;

module.exports = async (req, res) => {
  let { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(422).send("insufficient parameters supplied");
  }

  bcyrpt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcyrpt.hash(password, salt, function (err, hash) {
      if (err) return next(err);
      console.log(`hash======${hash}`);
      password = hash;

      user
        .create({
          email,
          username,
          password,
        })
        .then(() => {
          res.status(201).send("Sign Up Success!");
        });
    });
  });
};
