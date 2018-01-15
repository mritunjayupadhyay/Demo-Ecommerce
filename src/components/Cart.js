import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementItemCard, decrementItemCard, getCardItem, removeItemFromCart } from '../actions/CrudProduct.js';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardItems: [],
      total: 0
    };
  }
  componentDidMount() {
    // this.getItemsAllTime();
    this.props.getCardItem();
    if (this.props.cardItems) {
      this.setState({ cardItems: this.props.cardItems });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('i fount it unequal', this.props.cardItems, nextProps.cardItems);
      this.setState({ cardItems: nextProps.cardItems });
  }
  isEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for( let i = 0; i < arr1.length; i++) {
      if (arr1[i].no_of_items !== arr2[i].no_of_items) {
        return false;
      }
    }
    return true;
  }
  getItemsAllTime() {
    firebase.database().ref('Cart').on('value', (snapshot) => {
      const obj = snapshot.val();
      const arr = [];
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        arr.push(obj[keys[i]]);
      }
      if ((arr.length === 0)) {
        this.setState({ cardItems: []});
      } else {
        this.setState({ cardItems: arr });
      }
    });
  }
  renderCardItems() {
    console.log('no card items', this.state.cardItems);
    return this.state.cardItems.map((d, i) => {
      return (
        <div className="item">
          <div className="buttons">
            <i className="fa fa-times delete-btn" onClick={() => this.props.removeItemFromCart(d.id)}></i>
          </div>

          <div className="image">
            <img src={d.imageUrl} alt="" className="img-responsive" />
          </div>

          <div className="description">
          {this.renderProperty(d.properties)}
          </div>

          <div className="quantity">
            <button className="plus-btn" type="button" name="button" onClick={() => this.props.incrementItemCard(d)}>
              <i className="fa fa-plus"></i>
            </button>
            <input type="text" name="name" value={d.no_of_items} />
            <button className="minus-btn" type="button" name="button" onClick={() => this.props.decrementItemCard(d)}>
              <i className="fa fa-minus"></i>
            </button>
          </div>


          <div className="total-price">${d.price}</div>
        </div>
      );
    });
  }
  renderProperty(arr) {
    if (arr) {
      return arr.map((d, i) => {
        return (
          <span key={i}>{d}</span>
        );
      });
    }
  }
  renderTotal() {
    const total = this.state.cardItems.reduce(function(sum, value) {
                return sum + (value.price * value.no_of_items);
              }, 0);
        return(
          <span>Total: ${total}</span>
        );
  }
  render() {
    return (
          <div className="shopping-cart" style={{ position: 'relative'}}>
            <div className="title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30 }}>
              <p style={{ marginBottom: 0 }}>Shopping Cart</p>
              <a className="mycart" style={{ backgroundColor: '#6300D6'}}>
                 <span className="shopping-cart-logo" style={{ backgroundColor: '#6300D6', borderRadius: 50 }}>
                   <i className="fa fa-credit-card"></i>
                   <strong className="writing-cart" style={{ fontSize: 14 }}>payment</strong>
                 </span>
              </a>
            </div>
           {this.renderCardItems()}
            <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 80 }}>
                {this.renderTotal()}
            </div>
          </div>
    );

  }
}
function mapStateToProps(state) {
  return {
    cardItems: state.product.cardItems
  };
}


export default connect(mapStateToProps, { incrementItemCard, decrementItemCard, getCardItem, removeItemFromCart })(Cart);
