const { article, user } = require("../../db/models");
const { isAuthorized_access } = require("../tokenFunctions");

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
      if (!author_id || !title || !thumbnail_type || !thumbnail_color || !content || !ingredient) {
        return res.status(404).send("insufficient information");
      }
      const isAuthorizedUser = await isAuthorized_access(req);
      if (isAuthorizedUser === null || isAuthorizedUser.id !== author_id) {
        return res.status(401).send("invalid user");
      }
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
      const isAuthorizedUser = await isAuthorized_access(req);
      if (isAuthorizedUser === null) {
        return res.status(401).send("invalid user");
      }
      const { title, thumbnail_type, thumbnail_color, content, tag, ingredient } = req.body;
      if (!title || !thumbnail_type || !thumbnail_color || !content || !ingredient) {
        return res.status(404).send("insufficient information");
      }
      // 게시물 수정
      const modifiedArticle = await article.update({
        title,
        thumbnail_type,
        thumbnail_color: JSON.stringify(thumbnail_color),
        content,
        tag: JSON.stringify(tag),
        ingredient: JSON.stringify(ingredient)
      }, {
        where: {
          id: articleId,
          author_id: isAuthorizedUser.id
        }
      });
      if (modifiedArticle[0] === 0) {
        return res.status(401).send("invalid user");
      }
      res.status(200).send("article edited successfully");
    } catch (error) {
      console.log(error);
      res.send("sorry");
    }
  },

  delete: async (req, res) => {
    try {
      const isAuthorizedUser = await isAuthorized_access(req);
      if (isAuthorizedUser === null) {
        return res.status(401).send("invalid user");
      }
      const articleId = req.params.articleId;
      const deletedArticle = await article.destroy({
        where: {
          id: articleId,
          author_id: isAuthorizedUser.id
        }
      });
      if (deletedArticle === 0) {
        return res.status(401).send("invalid user");
      }
      res.status(200).send("article deleted successfully");
    } catch (error) {
      console.log(error);
      res.send("sorry");
    }
  },
}