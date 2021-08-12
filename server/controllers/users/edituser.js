const { user } = require("../../db/models");
const bcrypt = require("bcrypt");
const { isAuthorized_access } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const userdata = isAuthorized_access(req);
    // 유저 정보 확인
    await user
      .findOne({
        where: userdata.id,
      })
      .then(async (data) => {
        if (!data) {
          res.status(500).send("500 err sorry");
        }
        const validPassword = await bcrypt.compare(
          req.body.password,
          data.dataValues.password
        );
        //비밀번호 복호화 확인
        if (!validPassword) {
          res.status(401).send("Current Password Wrong!");
        } else {
          // 비밀번호 변경 시
          if (req.body.newpassword) {
            const salt = await bcrypt.genSalt(5);
            const pass = await bcrypt.hash(req.body.newpassword, salt);
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
