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
    await user
      .findOne({
        where: userdata.id,
      })
      .then(async (data) => {
        if (!data) {
          res.status(500).send("500 err sorry");
        }
        // 암호화 부분 추가 삽입  //
        //console.log("password!!!!!  ", req.body.password);
        let byte = cryptoJS.AES.decrypt(
          req.body.password,
          process.env.CRYPTOJS_SECRETKEY
        );
        //console.log("byte======!!!!  " + byte);
        let decodePassword = byte.toString(cryptoJS.enc.Utf8);
        //console.log("decode======  " + decodePassword);
        //console.log("dbpassword  ====  " + data.dataValues.password);

        const validPassword = await bcrypt.compare(
          decodePassword,
          data.dataValues.password
        );

        //console.log("vvvvvv=====" + validPassword);

        //비밀번호 복호화 확인
        if (!validPassword) {
          res.status(401).send("Current Password Wrong!");
        } else {
          // 비밀번호 변경 시
          let byte = cryptoJS.AES.decrypt(
            req.body.newPassword,
            process.env.CRYPTOJS_SECRETKEY
          );
          //console.log("byte2222=====>  " + byte);
          let decodePassword = byte.toString(cryptoJS.enc.Utf8);

          if (decodePassword) {
            const salt = await bcrypt.genSalt(5);
            const pass = await bcrypt.hash(decodePassword, salt);
            //console.log("newpass===>   " + pass);

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
                res.status(500).send("500 err sorry");
              });
          }
          // 비밀번호 변경x 다른 정보 수정 시
          else {
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
                res.status(500).send("500 err sorry");
              });
          }
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("500 err sorry");
  }
};
