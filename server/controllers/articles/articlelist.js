const { user, article } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    if (!req.query.type) {
      // 상위 태그 및 재료 검색
      const tagsAndIngredients = await article.findAll({
        attributes: ['tag', 'ingredient'],
        limit: 20,  // 최근 20개 게시물 기준으로 검색
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      const tags = {};
      const ingredients = {};
      // 게시물에서 태그와 재료 분류해 가져오기
      tagsAndIngredients.forEach(data => {
        data.tag = JSON.parse(data.tag);
        data.tag.forEach(tag => {
          tags.hasOwnProperty(tag) ? tags[tag] = tags[tag] + 1 : tags[tag] = 0;
        });
        data.ingredient = JSON.parse(data.ingredient);
        data.ingredient.forEach(ingredient => {
          ingredients.hasOwnProperty(ingredient[0]) ? ingredients[ingredient[0]] = ingredients[ingredient[0]] + 1 : ingredients[ingredient[0]] = 0;
        })
      });
      // 상위 태그 배열로 만들어 sort
      const tagsArr = [];
      for (let el in tags) {
        tagsArr.push([el, tags[el]]);
      }
      for (let i = 0; i < tagsArr.length; i++) {
        tagsArr.sort((a, b) => b[1] - a[1]);
      }
      // 상위 재료 배열로 만들어 sort
      const ingredientsArr = [];
      for (let el in ingredients) {
        ingredientsArr.push([el, ingredients[el]]);
      }
      for (let i = 0; i < ingredientsArr.length; i++) {
        ingredientsArr.sort((a, b) => b[1] - a[1]);
      }
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
      res.status(200).json({
        data: {
          tags: tagsArr.slice(0, 5).map(el => el[0]),  // 상위 태그 5개
          ingredients: ingredientsArr.slice(0, 5).map(el => el[0]),  // 상위 재료 5개
          articleList
        }
      })
    }
    // 태그/재료/북마크/게시 로 분류된 게시물 요청 시
    else {
      // tag/ingredient 로 요청 시
      if (req.query.type === 'tag' || req.query.type === 'ingredient') {
        const queryInfo = {
          attributes: ['id', 'title', 'thumbnail_type', 'thumbnail_color', 'ingredient'],
          limit: 10,
          offset: 0,
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
        const sortedByType = await article.findAll(queryInfo);
        sortedByType.forEach(data => {
          data.thumbnail_color = JSON.parse(data.thumbnail_color);
          data.ingredient = JSON.parse(data.ingredient);
        });
        res.json({ data: sortedByType });
      }
      // liked/published 로 요청 시
      else if (req.query.type === 'liked' || req.query.type === 'published') {
        const queryInfo = {
          attributes: ['id', 'title', 'thumbnail_type', 'thumbnail_color', 'ingredient'],
          limit: 10,
          offset: 0,
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
          const sortedByLiked = await article.findAll(queryInfo);
          sortedByLiked.forEach(data => {
            data.thumbnail_color = JSON.parse(data.thumbnail_color);
            data.ingredient = JSON.parse(data.ingredient);
          });
          res.json({ data: sortedByLiked })
        }
        // published 인 경우
        else if (req.query.type === 'published') {
          // author_id 기준으로 where 조건 구성
          queryInfo.where['author_id'] = req.query.value;

          const sortedByPublished = await article.findAll(queryInfo);
          sortedByPublished.forEach(data => {
            data.thumbnail_color = JSON.parse(data.thumbnail_color);
            data.ingredient = JSON.parse(data.ingredient);
          });
          res.json({ data: sortedByPublished })
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.send("sorry");
  }
};
