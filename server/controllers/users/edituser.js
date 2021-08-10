const { user } = require("../../db/models");
const bcrypt = require("bcrypt");
const { isAuthorized_access } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const userdata = isAuthorized_access(req);
  await user
    .findOne({
      where: userdata.id,
    })
    .then(async (data) => {
      if (!data) {
        res.status(500).send("err");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        data.dataValues.password
      );
      if (!validPassword) {
        res.status(401).send("Current Password Wrong!");
      } else {
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
        } else {
          delete req.body.password;
          await user
            .update(req.body, {
              where: { id: userdata.id },
            })
            .then((result) => {
              res.status(200).send("userinfo successfully changed!");
            })
            .catch((err) => {
              res.status(500).send("500 err sorry");
            });
        }
      }
    });
};
