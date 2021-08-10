const { user } = require("../../db/models");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  sendToken,
} = require("../tokenFunctions");

module.export = (req, res) => {
  user
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((data) => {
      if (!data) {
        return res.status(404).send("Login fail!");
      }
      bcrypt.compare(
        req.body.password,
        data.dataValues.password,
        function (err, result) {
          if (result) {
            delete data.dataValues.password;
            const tokenA = generateAccessToken(data.dataValues);
            const tokenR = generateRefreshToken(data.dataValues.id);

            sendToken(res, tokenA, tokenR);
          } else {
            return res.status(409).send("Login fail!");
          }
        }
      );
    })
    .catch((err) => {
      return res.status(500).send("500 err sorry");
    });
};
