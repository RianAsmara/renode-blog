// define model for Article table.
module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    title: {
      type: Sequelize.STRING,
    },

    content: {
      type: Sequelize.STRING,
    },

    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Article;
};
