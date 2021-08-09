const { article } = require("../../db/models");

module.exports = {
  get: async (req, res) => {
    const articleId = req.params.articleId;
    // articleId 로 해당 게시물 검색
    const singleArticle = await article.findOne({
      where: {
        id: articleId
      }
    })
    // JSON 정보 해독
    singleArticle.thumbnail_color = JSON.parse(singleArticle.thumbnail_color);
    singleArticle.tag = JSON.parse(singleArticle.tag);
    singleArticle.ingredient = JSON.parse(singleArticle.ingredient);
    // data 에 담아 전송
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

    const data = {};
    if (title) data.title;
    if (thumbnail_type) data.thumbnail_type = thumbnail_type;
    if (thumbnail_color) data.thumbnail_color = thumbnail_color;
    if (content) data.content = content;
    if (tag) data.tag = tag;
    if (ingredient) data.ingredient = ingredient;

    await article.update(data, {
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