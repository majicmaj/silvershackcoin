import React, { Component } from "react";
import "./Listings.css";
import "../Item/Item";
import { Link } from "react-router-dom";

class Listings extends Component {
  isAvailable = props => {
    let a = props.a;
    console.log(a);
    if (a.availability) {
      return (
        <button onClick={() => this.props.addToCart(a.id)}>
          <i className="fas fa-cart-plus" />
        </button>
      );
    } else return <p className="oos">SOLD OUT</p>;
  };
  render() {
    return (
      <div className="Listings">
        <div className="listView">
          {this.props._listings.map(item => (
            <li className="item listing" key={item.id} id={item.id}>
              <img alt="" src={item.img} />
              <div className="details">
                <Link to={"/listings/" + item.id}>
                  <h3>{item.title}</h3>
                </Link>
                <p className="blurb">{item.blurb}</p>
                <p className="price">US ${item.price / 100}</p>
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
