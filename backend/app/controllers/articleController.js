const db = require("../models");
const Article = db.articles;

// insert data function
exports.create = (req, res) => {
  // get request body from client
  const article = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published ? req.body.published : false,
  };

  // insert data into database using create function from Sequelize
  Article.create(article)
    .then((data) => {
      // send response with article data
      res.send(data);
    })
    .catch((err) => {
      // if there's any error, give some response message to client
      res.status(500).send({
        message: err.message || "Something is wrong when creating article",
      });
    });
};

// get all data function
exports.findAll = (req, res) => {
  // get title from client request
  const title = req.query.title;
  // define condition for search feature using title column
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // get all data using confition if there not empty
  Article.findAll({ where: condition })
    .then((data) => {
      // send data if the data is avalaible
      res.send(data);
    })
    .catch((err) => {
      // return some error if there's return empty data
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

// get single data function
exports.findOne = (req, res) => {
  // define id from client request
  const id = req.params.id;

  // by using Sequelize function findByPk, it will return single data
  Article.findByPk(id)
    .then((data) => {
      // send data to clien if the data is avalaible
      res.send(data);
    })
    .catch((err) => {
      // return error if return empty data
      res.status(500).send({
        message: "Error retrieving Article with id=" + id,
      });
    });
};

// updata data function
exports.update = (req, res) => {
  // define id from client request
  const id = req.params.id;

  // update data using where condition by sending id from client
  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      // if there found 1 data
      if (num == 1) {
        // update the data
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        // return message if there's not found data
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      // return error to client if there's any unsuccesfully process
      res.status(500).send({
        message: "Error updating Article with id=" + id,
      });
    });
};

// delete function to delete data
exports.delete = (req, res) => {
  // define id from client request
  const id = req.params.id;

  // delete data using Sequelize function destroy
  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      // if there found 1 data
      if (num == 1) {
        // delete the found data
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        // return message if there's not found data
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err) => {
      // return error to client if there's any unsuccesfully process
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
      });
    });
};

// delete all data function
exports.deleteAll = (req, res) => {
  // delete all data using Sequelize function
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles.",
      });
    });
};

// get only published article
exports.findAllPublished = (req, res) => {
  Article.findAll({ where: { published: true } })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};
