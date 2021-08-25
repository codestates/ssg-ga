const { user } = require("../../db/models");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  sendToken,
} = require("../tokenFunctions");
const cryptoJS = require("crypto-js");
require("dotenv").config();

module.exports = (req, res) => {
  try {
    user
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then(async (data) => {
        if (!data) {
          return res.status(404).send("Your ID could not be found.");
        }
        let byte = cryptoJS.AES.decrypt(
          req.body.password,
          process.env.CRYPTOJS_SECRETKEY
        );
        let decodePassword = JSON.parse(byte.toString(cryptoJS.enc.Utf8));
        const validPassword = await bcrypt.compare(
          decodePassword.password,
          data.dataValues.password
        );
        if (validPassword) {
          delete data.dataValues.password;
          delete data.dataValues.iat;
          delete data.dataValues.exp;
          const tokenA = generateAccessToken(data.dataValues);
          const tokenR = generateRefreshToken(data.dataValues);
          console.log(req.body.keepLogin);
          sendToken(res, req.body.keepLogin, tokenA, tokenR);
        } else {
          return res.status(409).send("Your password is wrong.");
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("sorry");
  }
};
