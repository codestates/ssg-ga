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
  try {
    //요청 받은 authorization code 로 카카오톡 요청
    let keepLogin;
    if (req.body.keepLogin === "true") {
      keepLogin = true;
    } else {
      keepLogin = false;
    }

    axios({
      method: "post",
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${req.body.authorizationCode}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((response) => {
      // authorization code 로 받은 access_token으로 프로필 및 이메일 요청
      axios({
        method: "get",
        url: `https://kapi.kakao.com/v2/user/me?access_token=${response.data.access_token}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((data) => {
        // 유저 DB 정보 확인
        user
          .findOne({
            where: {
              email: data.data.kakao_account.email,
            },
          })
          .then(async (dbdata) => {
            if (dbdata) {
              const userdata = dbdata.dataValues;
              delete userdata.password;
              delete userdata.iat;
              delete userdata.exp;
              const tokenA = generateAccessToken(userdata);
              const tokenR = generateRefreshToken(userdata);

              sendToken(res, keepLogin, tokenA, tokenR);
            } else {
              let password = data.data.id + data.data.properties.nickname;
              const salt = await bcrypt.genSalt(5);
              password = await bcrypt.hash(password, salt);
              // 카카오톡회원인것을 유저정보에 입력해준다.
              user
                .create({
                  email: data.data.kakao_account.email,
                  username: data.data.properties.nickname,
                  password: password,
                  image: data.data.properties.profile_image,
                  social: "kakao",
                })
                .then(() => {
                  user
                    .findOne({
                      where: {
                        email: data.data.kakao_account.email,
                      },
                    })
                    .then((newdata) => {
                      const tokenA = generateAccessToken(newdata.dataValues);
                      const tokenR = generateRefreshToken(newdata.dataValues);

                      sendToken(res, keepLogin, tokenA, tokenR);
                    });
                });
            }
          });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("sorry");
  }
};
