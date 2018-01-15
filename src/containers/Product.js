import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, setItemName, getItem, makeItemNil, addToCart } from '../actions/CrudProduct.js';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }
  componentDidMount() {
    if (this.props.item) {
      console.log('componentDidMount product', this.props.item);
      this.setLocalItem(this.props.item);
    } else {
      this.props.getItem(this.props.match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item) {
      if (!this.isEqual(this.props.item, nextProps.item)) {
         this.setLocalItem(nextProps.item);
      }
    }
  }
  componentWillUnmount() {
    this.props.makeItemNil();
  }
  isEqual(obj1, obj2) {
    if (obj1 === null) { return false };
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }
    let key;
    for (let i = 0; i < keys1.length; i++) {
      key = keys1[i];
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  setLocalItem(obj) {
    const name = obj.imageName;
    firebase.storage().ref(`productImages/${name}`).getDownloadURL()
    .then((url) => {
      obj['imageUrl'] = url;
      this.setState({ item: obj });
    });
  }
  renderProperty(arr) {
    if (arr) {
      return arr.map((d, i) => {
        return (
          <li key={i}><span className="grey-circle"></span>{d}</li>
        );
      });
    }
  }
  render() {
    console.log('one items ', this.state.item);
    return (
      <div className="single-product-outer">
        <div className="single-product-inner">
          <div className="img-part">
            <div className="mycontainer">
              <img src={this.state.item.imageUrl} className="img-responsive" />
            </div>
          </div>
          <div className="img-description">
             <div className="img-description-heading">
               <div>
                <h4 className="single-product-name">{this.state.item.name}</h4>
                <div>
                  <span className="user-saw-product">Trending product! 3000+ users saw yesterday </span>
                </div>
               </div>
              </div>
             <div className="img-description-price-bank-detail">
                <div className="img-description-price-detail">
                  <h4 className="img-description-price">{this.state.item.price}</h4>
                  <div className="product-intertal-details">
                    <ul>
                    {this.renderProperty(this.state.item.properties)}
                    </ul>
                  </div>
                  </div>
             </div>
             <div className="buy-product-grey-background">
               <div className="choose-color-for-product">
                 <span>Colour</span>
                 <div className="button-group">
                  <div className="button-group-single-button">
                    <a type="button" className="choose-color-for-product-button"><span className="circle-gold"></span> Gold </a>
                    <span className="left-item-with-color">1 left</span>
                  </div>
                  <div className="button-group-single-button">
                    <a type="button" className="choose-color-for-product-button"><span className="circle-grey"></span> Grey </a>
                    <span className="left-item-with-color"></span>
                 </div>
                 <div className="button-group-single-button">
                    <a type="button" className="choose-color-for-product-button"><span className="circle-rose-gold"></span>Rose Gold </a>
                    <span className="left-item-with-color"></span>
                 </div>
                </div>
              </div>
              <div className="choose-color-for-product">
               <span></span>
                <div className="button-group">
                  <a type="button" className="add-cart-for-product-button add-cart-for-product-button-red"><i className="fa fa-cart-arrow-down margin-right-5"></i> BUY NOW </a>
                  <a type="button" onClick={() => this.props.addToCart(this.state.item)} className="add-cart-for-product-button add-cart-for-product-button-black"> ADD TO CART </a>
                </div>
              </div>
          </div>
        </div>
       </div>
       </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.product.items,
    categories: state.product.categories,
    itemName: state.product.itemName,
    item: state.product.item
  };
}

export default connect(mapStateToProps, { getItems, setItemName, getItem, makeItemNil, addToCart })(Product);
