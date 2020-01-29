import React, { Component } from "react";
import "./Listings.css";

class Listings extends Component {
  isAvailable = props => {
    let a = props.a;
    console.log(a);
    if (a) {
      return (
        <button onClick={() => this.props.addToCart(item.id)}>
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
                <h3>{item.title}</h3>
                <p>{item.blurb}</p>
                <p className="price">US ${item.price / 100}</p>
              </div>
              <this.isAvailable a={item.availability} />
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default Listings;
