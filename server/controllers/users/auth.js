const { user } = require("../../db/models");
const {
  isAuthorized_access,
  isAuthorized_refresh,
  generateAccessToken,
  sendAccessToken,
} = require("../tokenFunctions");

module.exports = async (req, res) => {
  console.log(req.cookies);
  if (!req.cookies.jwtA) {
    if (!req.cookies.jwtR) {
      res.status(401).send("invalid refresh token, please log in again");
    } else {
      const refreshTokenData = isAuthorized_refresh(req);
      console.log(`refresh==========${refreshTokenData.username}`);
      user
        .findOne({
          where: {
            id: refreshTokenData.id,
            username: refreshTokenData.username,
          },
        })
        .then((data) => {
          if (!data) {
            return res
              .status(401)
              .send("invalid refresh token, please log in again");
          }
          delete data.dataValues.password;
          const tokenA = generateAccessToken(data.dataValues);
          sendAccessToken(res, tokenA, data.dataValues);
        })
        .catch((err) => {
          res.status(500).send("");
        });
    }
  } else {
    const accessTokenData = isAuthorized_access(req);
    const { id, username, email, image } = accessTokenData;
    if (accessTokenData) {
      res.status(200).json({ data: { id, username, email, image } });
    } else {
      res.status(401).send("invalid refresh token, please log in again");
    }
  }

  // accessTokenData가 어떤것인지 파악을 못함 더미데이터로 돌려보고 파악한 뒤 수정 작업 필요
};
