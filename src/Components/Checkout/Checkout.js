import React, { Component } from "react";

import "../Cart/Cart.css";
import "./Checkout.css";
class Checkout extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${"majd.tarbin@outlook.com"}`);
      });
    });
  };
  componentDidMount() {}
  render() {
    return (
      <div className="Checkout">
        <div className="Cart">
          <h3>Order Review</h3>
          <ul>
            {this.props._cart.map(item => {
              if (item.quantity > 0) {
                return (
                  <li className="item" key={item.id} id={item.id}>
                    <img alt="" src={item.img} />
                    <div>
                      <p>{item.title}</p>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="buttons">
                      <button
                        className="cart"
                        onClick={() => this.props.changeQuantity(item.id, -1)}
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        className="cart"
                        onClick={() => this.props.changeQuantity(item.id, 1)}
                      >
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                  </li>
                );
              } else return "";
            })}
          </ul>
          <p>
            Total: $<span className="total">{this.props.total}</span>
          </p>
        </div>
        <div className="shipping">
          <p>Name</p>
          <input />
          <div className="row">
            <div className="col">
              <p>Street Address</p>
              <input />
            </div>
            <div className="col">
              <p>Street Address 2</p>
              <input />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>City</p>
              <input />
            </div>
            <div className="col">
              <p>State</p>
              <input />
            </div>
            <div className="col">
              <p>Zip Code</p>
              <input />
            </div>
          </div>
          <p>Phone Number</p>
          <input />
        </div>
        <button className="checkout">Place Order</button>
      </div>
    );
  }
}

export default Checkout;
