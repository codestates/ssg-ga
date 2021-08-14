const { article, user } = require("../../db/models");

module.exports = {
  get: async (req, res) => {
    try {
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
      });
      const like = { value: false }
      // 좋아요 정보 추가
      if (req.query.user_id) {
        const liked = JSON.parse(singleArticle.like_user_id);
        if (liked.includes(Number(req.query.user_id))) {
          like.value = true;
        }
      }
      // JSON 정보 해독
      singleArticle.thumbnail_color = JSON.parse(singleArticle.thumbnail_color);
      singleArticle.tag = JSON.parse(singleArticle.tag);
      singleArticle.ingredient = JSON.parse(singleArticle.ingredient);
      res.status(200).json({
        data: {
          singleArticle,
          like
        }
      });
    } catch (error) {
      console.log(error);
      res.send("sorry");
    }
  },

  post: async (req, res) => {
    try {
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
      res.status(200).json({ id: newArticle.id });
    } catch (error) {
      console.log(error);
      res.send("sorry");
    }
  },

  patch: async (req, res) => {
    try {
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
      res.status(200).send("article edited successfully");
    } catch (error) {
      console.log(error);
      res.send("sorry");
    }
  },

  delete: async (req, res) => {
    try {
      const articleId = req.params.articleId;
      await article.destroy({
        where: {
          id: articleId
        }
      })
      res.status(200).send("article deleted successfully");
    } catch (error) {
      console.log(error);
      res.send("sorry");
    }
  },
}