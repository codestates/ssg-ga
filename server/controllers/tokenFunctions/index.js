require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    //accessToken 만들기
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: "24h" });
  },
  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: "7d" });
  },
  sendToken: (res, accessToken, refreshToken) => {
    res.cookie("jwtA", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    res.cookie("jwtR", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000 * 7,
    });
    res.status(200).json({ message: "Login success!" });
  },
  sendAccessToken: (res, accessToken, userdata) => {
    //accessToken 보내주기
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
  isAuthorized_access: (req) => {
    const accessToken = req.cookies.jwtA;
    if (accessToken) {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } else {
      return null;
    }
  },
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
