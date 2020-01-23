import React, { Component } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

let listings = [
  {
    id: 0,
    title: "Silver Indian Head Round Bullion",
    blurb:
      "1 Gram .999 Fine Silver Fractional Bullion Round -Indian Head Design",
    img: "https://i.ebayimg.com/images/g/6i0AAOSwnyNdK8OP/s-l500.jpg",
    price: 1.99
  },
  {
    id: 1,
    title: "1964 Kenndefy Half Dollar",
    blurb: "1964 Kennedy Half Dollar Brilliant Uncirculated - BU",
    img: "https://i.ebayimg.com/images/g/jdcAAOSwcrdcoaC5/s-l1600.jpg",
    price: 11.95
  },
  {
    id: 2,
    title: "Unsearched Half Dollar Roll",
    blurb: "1 Unsearched, Bank Sealed Half Dollar Roll",
    img: "https://i.ebayimg.com/images/g/p4cAAOSwDcJcYxz9/s-l1600.jpg",
    price: 17.87
  }
];
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
        <div className="Listings">
          <p>Listings</p>
          <input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="search for an item"
          />
          <ul>
            {_listings.map(item => (
              <li
                key={item.id}
                id={item.id}
                style={{ border: "1px solid black" }}
              >
                <img alt="" src={item.img} style={{ maxHeight: "100px" }} />
                <h3>{item.title}</h3>
                <p>{item.blurb}</p>
                <p>price: US ${item.price}</p>
                <button onClick={() => this.addToCart(item.id)}>
                  add to cart
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="Cart">
          <p>Cart</p>
          <p>{this.state.cart.toStrting}</p>
          <ul>
            {_cart.map(item => {
              if (item.quantity > 0) {
                return (
                  <li
                    key={item.id}
                    id={item.id}
                    style={{ border: "1px solid black" }}
                  >
                    <img alt="" src={item.img} style={{ maxHeight: "100px" }} />
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
    );
  }
}

export default App;
