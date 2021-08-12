const { user, article, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const count = Number(req.query.count);
    const queryInfo = {
      attributes: ['id', 'title', 'thumbnail_type', 'thumbnail_color', 'ingredient'],
      limit: 6,
      offset: count,
      order: [
        ['id', 'DESC'],
      ],
      where: {}
    };
    // req.query.type 에 따라 queryInfo.where 조건 동적 할당
    if (req.query.type === 'tag' || req.query.type === 'ingredient') {
      // where 조건 동적 할당
      queryInfo.where[req.query.type] = {
        [Op.substring]: `${req.query.value}`
      };
    }
    // 배열 liked 정보 바탕으로 where 조건 구성
    else if (req.query.type === 'liked') {
      const liked = await user.findOne({
        attributes: ['liked'],
        where: {
          id: req.query.value
        }
      });
      queryInfo.where['id'] = {
        [Op.or]: JSON.parse(liked.liked)
      }
    }
    // author_id 기준으로 where 조건 구성
    else if (req.query.type === 'published') {
      queryInfo.where['author_id'] = req.query.value;
    }
    // 추천(article.like_user_id)을 많이 받은 순으로 order 구성 변경
    else if (req.query.type === 'mostLiked') {
      queryInfo.order = [[sequelize.fn('length', sequelize.col('like_user_id')), 'DESC']]
    }
    // articleList 전달
    const articleList = await article.findAll(queryInfo);
    articleList.forEach(data => {
      data.thumbnail_color = JSON.parse(data.thumbnail_color);
      data.ingredient = JSON.parse(data.ingredient);
    });
    res.json({ data: articleList })
  } catch (error) {
    console.log(error);
    res.send("sorry");
  }
};
