import React, { Component } from "react";
import ArticlesDataServices from "../services/article.service";
import { Link } from "react-router-dom";

export default class ListArticles extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.removeAllArticles = this.removeAllArticles.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Articles: [],
      currentArticle: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveArticles();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveArticles() {
    ArticlesDataServices.getAll()
      .then((response) => {
        this.setState({
          Articles: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveArticles();
    this.setState({
      currentArticle: null,
      currentIndex: -1,
    });
  }

  setActiveArticle(Article, index) {
    this.setState({
      currentArticle: Article,
      currentIndex: index,
    });
  }

  removeAllArticles() {
    ArticlesDataServices.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    ArticlesDataServices.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          Articles: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, Articles, currentArticle, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search Article
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Articles List</h4>
          <ul className="list-group">
            {Articles &&
              Articles.map((Article, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArticle(Article, index)}
                  key={index}
                >
                  {Article.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllArticles}
          >
            Remove All Article
          </button>
        </div>
        <div className="col-md-6">
          {currentArticle ? (
            <div>
              <h4>Article</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentArticle.title}
              </div>
              <div>
                <label>
                  <strong>Content:</strong>
                </label>{" "}
                {currentArticle.content}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentArticle.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/articles/" + currentArticle.id}
                className="btn btn-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Article...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
