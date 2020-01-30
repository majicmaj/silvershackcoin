import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Item.css";
class Item extends Component {
  constructor(props) {
    super();
    this.state = {
      item: {}
    };
  }
  componentDidMount() {
    this.setState({
      item: this.props._listings[this.props.match.params.id]
    });
    console.log(this.state.item);
  }
  render() {
    const item = this.state.item;
    if (item) {
      return (
        <div className="single-item" key={item.id} id={item.id}>
          <h3>{item.title}</h3>
          <img alt="" src={item.img} />
          <div className="details">
            <p>Price: ${item.price / 100}</p>
            <p>
              Quantity in
              <i className="fas fa-shopping-cart" />: {item.quantity || "none"}
            </p>
          </div>
          <div className="buttons">
            <button
              className="minus"
              onClick={() => this.props.addToCart(item.id)}
            >
              <i className="fas fa-cart-plus" />
            </button>
          </div>
        </div>
      );
    } else return <Redirect to="/" />;
  }
}

export default Item;
