module.exports = (req, res) => {
  try {
    res
      .clearCookie("jwtA")
      .clearCookie("jwtR")
      .status(200)
      .send("Sign out success!");
  } catch {
    res.status(500).send("sorry");
  }
};
