const { user } = require("../../db/models");
const axios = require("axios");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  sendToken,
} = require("../tokenFunctions");
require("dotenv").config();

module.exports = (req, res) => {
  axios({
    method: "post",
    url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${req.body.authorizationCode}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  }).then((response) => {
    axios({
      method: "get",
      url: `https://kapi.kakao.com/v2/user/me?access_token=${response.data.access_token}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((data) => {
      user
        .findOne({
          where: {
            email: data.data.kakao_account.email,
          },
        })
        .then(async (dbdata) => {
          if (dbdata) {
            delete dbdata.dataValues.password;
            delete dbdata.dataValues.iat;
            delete dbdata.dataValues.exp;
            console.log(JSON.stringify(dbdata.dataValues));
            const tokenA = generateAccessToken(dbdata.dataValues);
            const tokenR = generateRefreshToken(dbdata.dataValues);

            sendToken(res, tokenA, tokenR);
          } else {
            let password = data.data.id + data.data.properties.nickname;
            const salt = await bcrypt.genSalt(5);
            password = await bcrypt.hash(password, salt);

            user
              .create({
                email: data.data.kakao_account.email,
                username: data.data.properties.nickname,
                password: password,
                image: data.data.properties.profile_image,
              })
              .then(() => {
                user
                  .findOne({
                    where: {
                      email: data.data.kakao_account.email,
                    },
                  })
                  .then((newdata) => {
                    console.log(JSON.stringify(newdata.dataValues));
                    const tokenA = generateAccessToken(newdata.dataValues);
                    const tokenR = generateRefreshToken(newdata.dataValues);

                    sendToken(res, tokenA, tokenR);
                  });
              });
          }
        });
    });
  });
};
