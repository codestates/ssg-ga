const { article } = require("../../db/models");

module.exports = async (req, res) => {
  const articleList = await article.findAll({
    limit: 10,
    offset: 0
  })

  res.status(200).json({ data: articleList })
};
