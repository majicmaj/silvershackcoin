import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

// Components
import Cart from "./Components/Cart/Cart";
import Nav from "./Components/Nav/Nav";
import Listings from "./Components/Listings/Listings";
import Checkout from "./Components/Checkout/Checkout";
import Item from "./Components/Item/Item";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      searchString: "",
      cart: [],
      listings: [],
      total: 0
    };
  }

  componentDidMount() {
    axios.get("https://silvershackcoins.herokuapp.com/listings").then(r => {
      let listings = r.data;
      this.setState({ listings: listings });
      console.log(r.data);
    });
    // this.refs.search.focus();
  }
  handleChange = str => {
    this.setState({
      searchString: str
    });
  };

  handleCheckout = () => {
    console.log(this.state.total);
    console.log(this.state.cart.filter(item => item.quantity > 0));
  };
  changeQuantity = (id, num) => {
    console.log(num);

    this.setState(state => {
      const cart = state.cart.filter(item => {
        if (item.id === id) {
          this.setState({
            total: Number(Number(this.state.total) + num * item.price).toFixed(
              2
            )
          });
          item.quantity += num;
          if (item.quantity) {
            return item;
          } else {
            console.log("Deleted");
            item = undefined;
            return null;
          }
        } else {
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
            console.log(this.state.total);
          }
          return item;
        });
      } else {
        cart = state.cart;
        let item = this.state.listings[id];
        item.quantity = 1;
        cart.push(item);
      }
      return cart;
    });
    this.setState({
      total: Number(
        Number(this.state.total) + this.state.listings[id].price
      ).toFixed(2)
    });
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
        <Nav
          search={search}
          searchString={this.state.searchString}
          handleChange={this.handleChange}
        />
        <div className="body">
          <Switch>
            <Route
              path="/cart"
              component={() => (
                <Cart
                  total={this.state.total}
                  _cart={_cart}
                  changeQuantity={this.changeQuantity}
                  handleCheckout={this.handleCheckout}
                />
              )}
            />
            <Route
              path="/checkout"
              component={() => (
                <Checkout
                  total={this.state.total}
                  _cart={_cart}
                  changeQuantity={this.changeQuantity}
                  handleCheckout={this.handleCheckout}
                />
              )}
            />
            <Route
              path="/listings/:id"
              exact
              render={routeProps => (
                <Item
                  _listings={_listings}
                  addToCart={this.addToCart}
                  changeQuantity={this.changeQuantity}
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/"
              component={() => (
                <Listings _listings={_listings} addToCart={this.addToCart} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
