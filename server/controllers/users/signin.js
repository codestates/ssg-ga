const { user } = require("../../db/models");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  sendToken,
} = require("../tokenFunctions");
const cryptoJS = require("crypto-js");

module.exports = (req, res) => {
  user
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send("Login fail!");
      }
      let decodePassword = cryptoJS.AES.decrypt(
        req.body.password,
        process.env.CRYPTOJS_SECRETKEY
      ).toString();
      const validPassword = await bcrypt.compare(
        decodePassword,
        data.dataValues.password
      );
      console.log(validPassword);
      if (validPassword) {
        delete data.dataValues.password;
        delete data.dataValues.iat;
        delete data.dataValues.exp;
        console.log(JSON.stringify(data.dataValues));
        const tokenA = generateAccessToken(data.dataValues);
        const tokenR = generateRefreshToken(data.dataValues);

        sendToken(res, tokenA, tokenR);
      } else {
        return res.status(409).send("Login fail!");
      }
    })
    .catch((err) => {
      return res.status(500).send("500 err sorry");
    });
};
