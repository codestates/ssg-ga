const { user } = require("../../db/models");
const { isAuthorized_access } = require("../tokenFunctions");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const userdata = isAuthorized_access(req);
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
      if (!validPassword) {
        res.status(401).send("Current Password Wrong!");
      } else {
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
};
