import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddArticles from "./components/add-articles.component";
import Articles from "./components/articles.component";
import ListArticles from "./components/list-articles.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/articles" className="navbar-brand">
            ReactNode Blog
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/articles"} className="nav-link">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Articles
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={ListArticles} />
            <Route exact path="/add" component={AddArticles} />
            <Route path="/articles/:id" component={Articles} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
