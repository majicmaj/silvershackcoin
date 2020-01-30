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
        <div className="labels">
          <p>Cart</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Adjust</p>
          <p>Total</p>
        </div>
        <div className="items">
          {this.props._cart.map(item => {
            if (item.quantity > 0) {
              return (
                <div className="item" key={item.id} id={item.id}>
                  <img alt="" src={item.img} />
                  <div>
                    <p>{item.title}</p>
                    <p>{item.blurb}</p>
                  </div>
                  <div>
                    <p>${item.price / 100}</p>
                  </div>
                  <div>
                    <p>{item.quantity}</p>
                  </div>
                  <div>
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
                  <div>${(item.price * item.quantity) / 100}</div>
                </div>
              );
            } else return null;
          })}
        </div>
        <div>
          <p>Subtotal: {this.props.total / 100}</p>
          <p>Tax: {(this.props.total / 100) * 0.05}</p>
          <p>Shipping: $15:00</p>
          <p>
            Total: {this.props.total / 100 + (this.props.total / 100) * 0.05}
          </p>
        </div>
      </div>
      // <div className="Cart">
      //   <h3>Cart</h3>
      //   <ul>
      //     {this.props._cart.map(item => {
      //       if (item.quantity > 0) {
      //         return (
      //           <li className="item" key={item.id} id={item.id}>
      //             <img alt="" src={item.img} />
      //             <div>
      //               <p>{item.title}</p>
      //               <p>Price: ${item.price / 100}</p>
      //               <p>Quantity: {item.quantity}</p>
      //             </div>
      //             <div className="buttons">
      //               <button
      //                 className="minus"
      //                 onClick={() => this.props.changeQuantity(item.id, -1)}
      //               >
      //                 <i className="fas fa-minus" />
      //               </button>
      //               <button
      //                 onClick={() => this.props.changeQuantity(item.id, 1)}
      //               >
      //                 <i className="fas fa-plus" />
      //               </button>
      //             </div>
      //           </li>
      //         );
      //       } else return "";
      //     })}
      //   </ul>
      //   <p>
      //     Total: $<span className="total">{this.props.total / 100}</span>
      //   </p>

      //   <Link to="/checkout">
      //     <button className="checkout" onClick={this.props.handleCheckout}>
      //       Check Out
      //     </button>
      //   </Link>
      // </div>
    );
  }
}

export default Cart;
