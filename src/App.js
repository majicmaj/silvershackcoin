import React, { Component } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import listings from "./listings.json";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      searchString: "",
      cart: [],
      listings: []
    };
  }

  componentDidMount() {
    this.setState({
      listings: listings
    });
    this.refs.search.focus();
  }
  handleChange = () => {
    this.setState({
      searchString: this.refs.search.value
    });
  };
  changeQuantity = (id, num) => {
    console.log(num);

    this.setState(state => {
      const cart = state.cart.map((item, i) => {
        console.log(i + " : " + id);
        if (item.id === id) {
          return (item.quantity = item.quantity + num);
        } else {
          console.log("uh");
          return item;
        }
      });
      return cart;
    });
  };
  addToCart = id => {
    this.setState(state => {
      let cart;
      if (this.state.cart.includes(this.state.listings[id])) {
        cart = this.state.cart.map(item => {
          if (item.id === id) {
            item.quantity++;
          }
          return item;
        });
      } else {
        cart = state.cart;
        let item = listings[id];
        item.quantity = 1;
        cart.push(item);
      }
      return cart;
    });
    console.log(this.state.cart);
  };

  render() {
    let _listings = this.state.listings;
    let _cart = this.state.cart;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _listings = _listings.filter(item => {
        return item.title.toLowerCase().match(search);
      });
    }
    return (
      <div className="App">
        <div className="Nav">
          <h1>Silver Shack Coins</h1>
          <input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="search for an item"
          />
        </div>
        <div className="body">
          <div className="Listings">
            <h3>Listings</h3>
            <ul>
              {_listings.map(item => (
                <li className="item listing" key={item.id} id={item.id}>
                  <img alt="" src={item.img} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.blurb}</p>
                    <p>price: US ${item.price}</p>
                    <button onClick={() => this.addToCart(item.id)}>
                      add to cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="Cart">
            <h3>Cart</h3>
            <ul>
              {_cart.map(item => {
                if (item.quantity > 0) {
                  return (
                    <li className="item cartitem" key={item.id} id={item.id}>
                      <img alt="" src={item.img} />
                      <p>{item.title}</p>
                      <p>Quantity:{item.quantity}</p>
                      <button onClick={() => this.changeQuantity(item.id, -1)}>
                        -
                      </button>
                      <button onClick={() => this.changeQuantity(item.id, 1)}>
                        +
                      </button>
                    </li>
                  );
                } else return "";
              })}
            </ul>
            <button>Check Out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
