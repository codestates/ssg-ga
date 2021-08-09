const { user } = require("../../db/models");

module.exports = (req, res) => {
  const { email, username, password } = req.body;
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
