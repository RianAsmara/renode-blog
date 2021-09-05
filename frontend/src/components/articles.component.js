import React, { Component } from "react";
import ArticlesDataServices from "../services/article.service";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      currentArticle: {
        id: null,
        title: "",
        content: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          title: title,
        },
      };
    });
  }

  onChangeContent(e) {
    const content = e.target.value;

    this.setState((prevState) => ({
      currentArticle: {
        ...prevState.currentArticle,
        content: content,
      },
    }));
  }

  getArticle(id) {
    ArticlesDataServices.get(id)
      .then((response) => {
        this.setState({
          currentArticle: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentArticle.id,
      title: this.state.currentArticle.title,
      content: this.state.currentArticle.content,
      published: status,
    };

    ArticlesDataServices.update(this.state.currentArticle.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentArticle: {
            ...prevState.currentArticle,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateArticle() {
    ArticlesDataServices.update(
      this.state.currentArticle.id,
      this.state.currentArticle
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The article was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteArticle() {
    ArticlesDataServices.delete(this.state.currentArticle.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/articles");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentArticle } = this.state;

    return (
      <div>
        {currentArticle ? (
          <div className="edit-form">
            <h4>Article Detail</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArticle.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentArticle.content}
                  onChange={this.onChangeContent}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentArticle.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentArticle.published ? (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-secondary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteArticle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateArticle}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a article...</p>
          </div>
        )}
      </div>
    );
  }
}
