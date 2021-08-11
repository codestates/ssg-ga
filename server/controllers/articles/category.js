const { user, article } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
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
    // 전달
    res.status(200).json({
      data: {
        tags: tagsArr.slice(0, 5).map(el => el[0]),  // 상위 태그 5개
        ingredients: ingredientsArr.slice(0, 5).map(el => el[0]),  // 상위 재료 5개
      }
    })
  } catch (error) {
    console.log(error);
    res.send("sorry");
  }
};
