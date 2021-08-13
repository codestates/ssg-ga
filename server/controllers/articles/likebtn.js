const { user, article } = require("../../db/models");

module.exports = async (req, res) => {
  try {
    const { user_id, article_id } = req.body;
    // user.liked 배열 가져오기
    const userLiked = await user.findOne({
      where: {
        id: user_id
      }
    });
    userLikedMod = JSON.parse(userLiked.liked);
    // DB의 user.liked 에 article_id 가 있는지 검색, 있으면 삭제, 없으면 추가
    const isArticleId = userLikedMod.indexOf(article_id);
    if (isArticleId === -1) {
      userLikedMod.push(article_id)
    } else {
      userLikedMod.splice(isArticleId, 1);
    }
    // DB의 user.liked 수정된 정보 반영하기
    await user.update({
      liked: JSON.stringify(userLikedMod)
    }, {
      where: {
        id: user_id
      }
    })
    // DB의 article.liked_user_id 배열 가져오기
    const articleLiked = await article.findOne({
      where: {
        id: article_id
      }
    });
    articleLikedMod = JSON.parse(articleLiked.like_user_id);
    const isUserId = articleLikedMod.indexOf(user_id);
    if (isUserId === -1) {
      articleLikedMod.push(user_id)
    } else {
      articleLikedMod.splice(isUserId, 1);
    }
    // DB의 article.like_user_id 수정된 정보 반영하기
    await article.update({
      like_user_id: JSON.stringify(articleLikedMod)
    }, {
      where: {
        id: article_id
      }
    });
    // 수정된 article.like_user_id 돌려주기
    const likeInfo = await article.findOne({
      attributes: ['like_user_id'],
      where: {
        id: article_id
      }
    });
    res.json({
      data: {
        likeInfo: JSON.parse(likeInfo.like_user_id)
      }
    });
  } catch (error) {
    console.log(error);
    res.send("sorry");
  }
};
