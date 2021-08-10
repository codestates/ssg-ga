const { article, user } = require("../../db/models");

module.exports = {
  get: async (req, res) => {
    const articleId = req.params.articleId;
    // articleId 로 해당 게시물 검색    
    const singleArticle = await article.findOne({
      where: {
        id: articleId
      },
      include: {
        model: user,
        attributes: ['username', 'image'],
        as: 'author'
      }
    })
    // JSON 정보 해독
    singleArticle.thumbnail_color = JSON.parse(singleArticle.thumbnail_color);
    singleArticle.tag = JSON.parse(singleArticle.tag);
    singleArticle.ingredient = JSON.parse(singleArticle.ingredient);
    res.status(200).json({ data: singleArticle });
  },
  post: async (req, res) => {
    const { author_id, title, thumbnail_type, thumbnail_color, content, tag, ingredient } = req.body;
    // 새 게시물 생성
    const newArticle = await article.create({
      author_id,
      title,
      thumbnail_type,
      thumbnail_color: JSON.stringify(thumbnail_color),
      content,
      tag: JSON.stringify(tag),
      ingredient: JSON.stringify(ingredient)
    })

    res.send("Article posted successfully")
  },
  patch: async (req, res) => {
    const articleId = req.params.articleId
    const { title, thumbnail_type, thumbnail_color, content, tag, ingredient } = req.body;
    // 게시물 수정
    await article.update({
      title,
      thumbnail_type,
      thumbnail_color: JSON.stringify(thumbnail_color),
      content,
      tag: JSON.stringify(tag),
      ingredient: JSON.stringify(ingredient)
    }, {
      where: {
        id: articleId
      }
    })
    res.send("Article edited successfully")
  },
  delete: async (req, res) => {
    const articleId = req.params.articleId;
    await article.destroy({
      where: {
        id: articleId
      }
    })
    res.send("Article deleted successfully")
  },
}