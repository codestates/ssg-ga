module.exports = {
  auth: require("./users/auth"),
  signup: require("./users/signup"),
  signin: require("./users/signin"),
  signout: require("./users/signout"),

  getArticleList: require("./articles/articlelist"),
  postArticle: require("./articles/article").post,
  getSingleArticle: require("./articles/article").get,
  editArticle: require("./articles/article").patch,
  deleteArticle: require("./articles/article").delete,
};
