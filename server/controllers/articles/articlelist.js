const { user, article } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    if (!req.query.type) {
      // 게시물 최신순으로 전달
      // 클라이언트에서 무한 스크롤 할 때마다 증가된 count 값을 보냄
      const count = Number(req.query.count);
      const articleList = await article.findAll({
        attributes: ['id', 'title', 'thumbnail_type', 'thumbnail_color', 'ingredient'],
        limit: 6,
        offset: count,
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      articleList.forEach(data => {
        data.thumbnail_color = JSON.parse(data.thumbnail_color);
        data.ingredient = JSON.parse(data.ingredient);
      })
      res.status(200).json({ data: articleList })
    }
    // 태그/재료/북마크/게시 로 분류된 게시물 요청 시
    else {
      // tag/ingredient 로 요청 시
      if (req.query.type === 'tag' || req.query.type === 'ingredient') {
        const count = Number(req.query.count);
        const queryInfo = {
          attributes: ['id', 'title', 'thumbnail_type', 'thumbnail_color', 'ingredient'],
          limit: 6,
          offset: count,
          order: [
            ['createdAt', 'DESC'],
          ],
          where: {}
        };
        // where 조건 동적 할당
        queryInfo.where[req.query.type] = {
          [Op.substring]: `${req.query.value}`
        };
        // queryInfo 를 바탕으로 검색 및 전달
        const articleList = await article.findAll(queryInfo);
        articleList.forEach(data => {
          data.thumbnail_color = JSON.parse(data.thumbnail_color);
          data.ingredient = JSON.parse(data.ingredient);
        });
        res.json({ data: articleList });
      }
      // liked/published 로 요청 시
      else if (req.query.type === 'liked' || req.query.type === 'published') {
        const count = Number(req.query.count);
        const queryInfo = {
          attributes: ['id', 'title', 'thumbnail_type', 'thumbnail_color', 'ingredient'],
          limit: 6,
          offset: count,
          order: [
            ['createdAt', 'DESC'],
          ],
          where: {}
        };
        // liked 인 경우
        if (req.query.type === 'liked') {
          const liked = await user.findOne({
            attributes: ['liked'],
            where: {
              id: req.query.value
            }
          });
          // 배열 liked 정보 바탕으로 where 조건 구성
          queryInfo.where['id'] = {
            [Op.or]: JSON.parse(liked.liked)
          }
          const articleList = await article.findAll(queryInfo);
          articleList.forEach(data => {
            data.thumbnail_color = JSON.parse(data.thumbnail_color);
            data.ingredient = JSON.parse(data.ingredient);
          });
          res.json({ data: articleList })
        }
        // published 인 경우
        else if (req.query.type === 'published') {
          // author_id 기준으로 where 조건 구성
          queryInfo.where['author_id'] = req.query.value;

          const articleList = await article.findAll(queryInfo);
          articleList.forEach(data => {
            data.thumbnail_color = JSON.parse(data.thumbnail_color);
            data.ingredient = JSON.parse(data.ingredient);
          });
          res.json({ data: articleList })
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.send("sorry");
  }
};
