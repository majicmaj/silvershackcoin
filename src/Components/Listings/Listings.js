import React, { Component } from "react";
import "./Listings.css";

class Listings extends Component {
  render() {
    return (
      <div className="Listings">
        <ul>
          {this.props._listings.map(item => (
            <li className="item listing" key={item.id} id={item.id}>
              <img alt="" src={item.img} />
              <div className="details">
                <h3>{item.title}</h3>
                <p>{item.blurb}</p>
                <p className="price">US ${item.price}</p>
              </div>
              <button onClick={() => this.props.addToCart(item.id)}>
                <i className="fas fa-cart-plus" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Listings;
