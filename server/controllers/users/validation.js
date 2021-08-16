const { user } = require("../../db/models");

module.exports = (req, res) => {
  try {
    if (!req.body.email && !req.body.username) {
      res.status(422).send("Request is Nothing");
    }

    if (req.body.email) {
      user
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        .then((data) => {
          if (!data) {
            res.status(200).send("You can use this");
          } else {
            res.status(409).send("Your words is already exist!");
          }
        })
        .catch(() => {
          res.status(500).send("sorry");
        });
    }
    if (req.body.username) {
      user
        .findOne({
          where: {
            username: req.body.username,
          },
        })
        .then((data) => {
          if (!data) {
            res.status(200).send("You can use this");
          } else {
            res.status(409).send("Your words is already exist!");
          }
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("sorry");
  }
};
