const { user } = require("../../db/models");
const axios = require("axios");
require("dotenv").config();

module.exports = (req, res) => {
  axios({
    method: "post",
    url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${req.body.authorizationCode}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  // .then((response) => {
  //   console.log(response.data);
  //   res.status(200).send("ok");

  //   axios({
  //     method: "post",
  //     url: `kapi.kakao.com/v2/user/me`,
  //     headers: {
  //       authorization: `Bearer ${response.data.access_token}`,
  //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //     },
  //   }).then((data) => {
  //     console.log(data);
  //     res.send("왔다");
  //   });
  // });
};
