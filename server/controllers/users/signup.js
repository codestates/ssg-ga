const { user } = require("../../db/models");
const bcyrpt = require("bcrypt");
require("dotenv").config();
const cryptoJS = require("crypto-js");

module.exports = async (req, res) => {
  let { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(422).send("insufficient parameters supplied");
  }

  password = cryptoJS.AES.decrypt(
    password,
    process.env.CRYPTOJS_SECRETKEY
  ).toString();
  console.log(password);

  const salt = await bcyrpt.genSalt(5);
  password = await bcyrpt.hash(password, salt);

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
