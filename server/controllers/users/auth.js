const { user } = require("../../db/models");
const {
  isAuthorized_access,
  isAuthorized_refresh,
  generateAccessToken,
  sendAccessToken,
} = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    // jwtA토큰이 있는지 확인
    if (!req.cookies.jwtA) {
      //jwtA 토큰이 없을 시 jwtR 토큰이 있는지 확인
      if (!req.cookies.jwtR) {
        res.status(401).send("invalid refresh token, please log in again");
      } else {
        //jwtR 토큰이 있을 시 jwtA 토큰과 데이터 넣어주기
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
          });
      }
    } else {
      //jwtA 토큰 있을 시 데이터 넣어주기
      const accessTokenData = isAuthorized_access(req);
      const { id, username, email, image } = accessTokenData;
      if (accessTokenData) {
        res.status(200).json({ data: { id, username, email, image } });
      } else {
        res.status(401).send("invalid refresh token, please log in again");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("sorry");
  }

  // accessTokenData가 어떤것인지 파악을 못함 더미데이터로 돌려보고 파악한 뒤 수정 작업 필요
};
