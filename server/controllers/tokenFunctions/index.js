require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    //accessToken 만들기
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: "24h" });
  },
  //refreshToken 만들기
  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: "7d" });
  },
  // 만들어진 토큰 cookie에 넣어서 보내주기
  sendToken: (res, accessToken, refreshToken) => {
    res.cookie("jwtA", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      // secure : true,
      // sameSite : "none",
    });
    res.cookie("jwtR", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 1000,
      // secure : true,
      // sameSite : "none",
    });
    res.status(200).json({ message: "The access_token is ready." });
  },
  //accessToken 만료 시 refresh토큰을 이용하여 accessToken과 data 넣어주기
  sendAccessToken: (res, accessToken, userdata) => {
    res
      .cookie("jwtA", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        data: { userdata },
        message: "A new access_token has been created.",
      });
  },
  //쿠키 accessToken 확인
  isAuthorized_access: (req) => {
    const accessToken = req.cookies.jwtA;
    if (accessToken) {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } else {
      return null;
    }
  },
  //쿠키 refreshToken 확인
  isAuthorized_refresh: (req) => {
    const refreshToken = req.cookies.jwtR;
    return jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET,
      (err, decode) => {
        if (err) {
          return res
            .status(401)
            .send("invalid refresh token, please log in again");
        } else {
          return decode;
        }
      }
    );
  },
};
