const { user } = require("../../db/models");
const bcrypt = require("bcrypt");
const { isAuthorized_access } = require("../tokenFunctions");
const cryptoJS = require("crypto-js");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    const userdata = isAuthorized_access(req);
    // 유저 정보 확인
    console.log(userdata);
    console.log(req.body);
    await user
      .findOne({
        where: userdata.id,
      })
      .then(async (data) => {
        if (!data) {
          res.status(500).send("sorry");
        }
        // 암호화 부분 추가 삽입  //

        let byte = cryptoJS.AES.decrypt(
          req.body.password,
          process.env.CRYPTOJS_SECRETKEY
        );

        let decodePassword = JSON.parse(byte.toString(cryptoJS.enc.Utf8));

        const validPassword = await bcrypt.compare(
          decodePassword.password,
          data.dataValues.password
        );

        //비밀번호 복호화 확인
        if (!validPassword) {
          res.status(401).send("Your password is wrong.");
        } else {
          if (!req.body.newPassword) {
            delete req.body.password;
            await user
              .update(req.body, {
                where: { id: userdata.id },
              })
              .then((result) => {
                res.status(200).send("userinfo successfully changed!");
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send("sorry");
              });
          } else {
            let byte = cryptoJS.AES.decrypt(
              req.body.newPassword,
              process.env.CRYPTOJS_SECRETKEY
            );

            let decodePassword = JSON.parse(byte.toString(cryptoJS.enc.Utf8));

            const salt = await bcrypt.genSalt(5);
            const pass = await bcrypt.hash(decodePassword.password, salt);

            await user
              .update(
                {
                  image: req.body.image,
                  username: req.body.username,
                  password: pass,
                },
                { where: { id: userdata.id } }
              )
              .then((result) => {
                console.log("update ===> " + result);
                res.status(200).send("userinfo successfully changed!");
              })
              .catch((err) => {
                res.status(500).send("sorry");
              });
          }
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("sorry");
  }
};
