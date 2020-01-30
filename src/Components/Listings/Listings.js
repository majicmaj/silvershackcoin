import React, { Component } from "react";
import "./Listings.css";
import "../Item/Item";
import { Link } from "react-router-dom";

class Listings extends Component {
  constructor(props) {
    super();
    this.state = {
      view: "list"
    };
  }
  isAvailable = props => {
    let a = props.a;
    if (a.availability) {
      return (
        <button onClick={() => this.props.addToCart(a.id)}>
          <i className="fas fa-cart-plus" />
        </button>
      );
    } else return <button className="oos">SOLD OUT</button>;
  };
  changeView = () => {
    if (this.state.view === "list") {
      this.setState({ view: "item" });
    } else this.setState({ view: "list" });
  };
  render() {
    if (this.state.view === "list") {
      return (
        <div className="Listings">
          <div className="view">
            <button className="toggle" onClick={this.changeView}>
              <i className="fas fa-list button" />
            </button>
          </div>
          {this.props._listings.map(item => (
            <li className="listing" key={item.id} id={item.id}>
              <div className="container">
                <img alt="" src={item.img} />
              </div>
              <div className="details">
                <Link to={"/listings/" + item.id}>
                  <p className="title">{item.title}</p>
                </Link>
                <p className="blurb">{item.blurb}</p>
                <p className="price">${item.price / 100}</p>
              </div>
              <this.isAvailable a={item} />
            </li>
          ))}
        </div>
      );
    } else
      return (
        <div className="Listings">
          <div className="view">
            <button className="toggle" onClick={() => this.changeView()}>
              <i className="fas fa-th-large" />
            </button>
          </div>
          <div className="itemGrid">
            {this.props._listings.map(item => (
              <li className="item" key={item.id} id={item.id}>
                <div className="container">
                  <img alt="" src={item.img} />
                </div>
                <div className="details">
                  <Link to={"/listings/" + item.id}>
                    <p className="title">{item.title}</p>
                  </Link>
                  <p className="price">${item.price / 100}</p>

                  <p className="blurb">{item.blurb}</p>
                </div>
                <this.isAvailable a={item} />
              </li>
            ))}
          </div>
        </div>
      );
  }
}

export default Listings;
