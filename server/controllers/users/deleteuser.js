const { user } = require("../../db/models");
const { isAuthorized_access } = require("../tokenFunctions");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const userdata = isAuthorized_access(req);
    //삭제 요청 id 확인
    await user
      .findOne({
        where: { id: userdata.id },
      })
      .then(async (data) => {
        if (!data) {
          res.status(500).send("500 err sorry");
        }
        const validPassword = await bcrypt.compare(
          req.body.password,
          data.dataValues.password
        );
        //삭제할 때 입력한 비밀번호가 틀릴 경우
        if (!validPassword) {
          res.status(401).send("Current Password Wrong!");
        }
        // 비밀번호 맞을 경우
        else {
          user
            .destroy({
              where: {
                id: userdata.id,
              },
            })
            .then((result) => {
              res
                .clearCookie("jwtA")
                .clearCookie("jwtR")
                .status(200)
                .send("Delete success...");
            });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("500 err sorry");
  }
};
