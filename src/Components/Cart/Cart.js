import React, { Component } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
class Cart extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <div className="Cart">
        <h3>Cart</h3>
        <ul>
          {this.props._cart.map(item => {
            if (item.quantity > 0) {
              return (
                <li className="item" key={item.id} id={item.id}>
                  <img alt="" src={item.img} />
                  <div>
                    <p>{item.title}</p>
                    <p>Price: ${item.price / 100}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="buttons">
                    <button
                      className="minus"
                      onClick={() => this.props.changeQuantity(item.id, -1)}
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
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
          Total: $<span className="total">{this.props.total / 100}</span>
        </p>

        <Link to="/checkout">
          <button className="checkout" onClick={this.props.handleCheckout}>
            Check Out
          </button>
        </Link>
      </div>
    );
  }
}

export default Cart;
