import React, { Component } from "react";
import ArticlesDataServices from "../services/article.service";

export default class AddArticles extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    this.state = {
      id: null,
      title: "",
      content: "",
      published: false,
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }

  saveArticle() {
    var data = {
      title: this.state.title,
      content: this.state.content,
    };

    ArticlesDataServices.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newArticle() {
    this.setState({
      id: null,
      title: "",
      content: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newArticle}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      name="title"
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input
                      type="text"
                      className="form-control"
                      id="content"
                      required
                      value={this.state.content}
                      onChange={this.onChangeContent}
                      name="content"
                    />
                  </div>
                  <br />
                  <button
                    onClick={this.saveArticle}
                    className="btn btn-success"
                  >
                    Submit Article
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
