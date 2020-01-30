import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super();
    this.state = {
      searchString: ""
    };
  }
  componentDidMount() {
    this.refs.search.focus();
  }
  handleChange = () => {
    this.props.handleChange(this.refs.search.value);
  };
  render() {
    return (
      <nav>
        <div className="Nav">
          <div className="left">
            <Link to="/">
              <h1>
                <i className="fas fa-coins logo" /> SILVER SHACK COINS
              </h1>
            </Link>
            <div className="search">
              <input
                type="text"
                value={this.props.searchString}
                ref="search"
                onChange={this.handleChange}
                placeholder="search for an item"
              />
              <Link to="/">
                <i className="fas fa-search button" />
              </Link>
            </div>
          </div>
          <Link className="link" to="/cart">
            <i className="fas fa-shopping-cart button cart" />
          </Link>
        </div>
      </nav>
    );
  }
}

export default Nav;
