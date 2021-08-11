module.exports = {
  auth: require("./users/auth"),
  signup: require("./users/signup"),
  signin: require("./users/signin"),
  signout: require("./users/signout"),
  validation: require("./users/validation"),
  edituser: require("./users/edituser"),
  deleteuser: require("./users/deleteuser"),
  userimage: require("./users/userimage"),

  getArticleList: require("./articles/articlelist"),
  getCategorizedArticleList: require("./articles/category"),
  postArticle: require("./articles/article").post,
  getSingleArticle: require("./articles/article").get,
  editArticle: require("./articles/article").patch,
  deleteArticle: require("./articles/article").delete,
  likebtn: require("./articles/likebtn"),
};
