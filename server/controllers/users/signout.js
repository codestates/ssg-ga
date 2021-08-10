module.exports = (req, res) => {
  res
    .clearCookie("jwtA")
    .clearCookie("jwtR")
    .status(200)
    .send("Sign out success!");
};
