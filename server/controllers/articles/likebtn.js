const { user, article } = require("../../db/models");

module.exports = (req, res) => {
  try {
    const { user_id, article_id, likebtn } = req.body;
    // user.liked 배열 가져오기
    const userLiked = await findOne({
      where: {
        id: user_id
      }
    });
    userLikedArr = JSON.parse(userLiked.liked);
    userLikedArr.push(article_id);
    // user.liked 수정 반영하기
    user.update({
      liked: JSON.stringify(userLiked)
    }, {
      where: {
        id: user_id
      }
    })
    // article.liked_user_id 배열 가져오기
    const articleLiked = await findOnd({
      where: {
        id: article_id
      }
    });
    articleLikedArr = JSON.parse(articleLiked.like_user_id);
    articleLikedArr.push(user_id);
    // article.liked_user_id 수정 반영하기
    article.update({
      liked_user_id: JSON.stringify(articleLikedArr)
    }, {
      where: {
        id: article_id
      }
    });
    res.send("Article deleted successfully");
  } catch (error) {
    console.log(error);
    res.send("sorry");
  }
};
