import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItems, getItem, addToCart } from '../actions/CrudProduct.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    if (this.props.category) {
      this.props.getItems(this.props.category);
    } else {
      if (this.props.categories.length > 0) {
        this.props.getItems(this.props.categories[0].name);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.props.getItems(nextProps.category);
    }
    if (nextProps.item) {
      this.setItemsToRender({item: nextProps.item});
    } else {
      if (!this.isEqual(this.props.items, nextProps.items)) {
        this.setState({ items: [] });
          this.setItemsToRender(nextProps.items);
      }
    }

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
  setItemsToRender(items) {
    console.log('in setItemsToRender', items);
    const keys = Object.keys(items);
    this.setState({ items: [] });
    for (let i = 0; i < keys.length; i++) {
      this.addToLocalState(items[keys[i]]);
    }
  }
  addToLocalState(obj) {
    const name = obj.imageName;
    console.log('why undefinded', obj);
    firebase.storage().ref(`productImages/${name}`).getDownloadURL()
    .then((url) => {
      obj['imageUrl'] = url;
      this.setState({ items: [ ...this.state.items, obj ]});
    }
  );
  }

  renderItem() {
    if (this.state.items.length === 0) {
      return (
        <div style={{ height: 100, justifyContent: 'center', alignItems: 'center', display: 'flex', flex: 1 }}>
          <p>
            Select from category to see product
          </p>
        </div>
      );
    }
    return this.state.items.map((d, i) => {
      return (
        <Link to={`product/${d.id}`} onClick={() => this.props.getItem(d.id)} className="grid__item" href="#" key={i}>
        <div className="product-img-details">
          <div className="product-img-product-img">
            <img src={d.imageUrl} alt="" className="img-responsive" style={styles.ProductImage} />
          </div>
          <div className="product-img-product-details">
              <h3 className="text-left" style={styles.productImageTitle}>{d.name}</h3>
              <p className="text-left" style={styles.productInfo}>
                {d.price}
              </p>
          </div>
        </div>
        <div className="grid__item-view-on-hover">
          <div className="grid__item-view-on-hover-container">
              <div className="grid__item-view-on-hover-container-top-line">
                <p>
                  {d.category}
                </p>
              </div>
              <div className="grid__item-view-on-hover-container-middle-line">
                  <div className="cart-button">
                    <button type="button" name="button" onClick={() => this.seeIfFire(d)} className="btn btn-white-cart-button"><i className="fa fa-cart-plus"></i>  Buy</button>
                  </div>
                  <div className="cart-button">
                    <button type="button" name="button" className="btn btn-white-cart-button"><i className="fa fa-info" style={{ marginRight: 10 }}></i>  More</button>
                  </div>
              </div>
              <div className="grid__item-view-on-hover-container-bottom-line">
                <h3 className="text-left">{d.name}</h3>
                <p className="text-left">
                  {d.price}
                </p>
              </div>
          </div>
        </div>
      </Link>
      );
    });
  }
  seeIfFire(d) {
    console.log('seeIfFire ',d);
    this.props.addToCart(d)
  }
  render() {
    console.log('aal items', this.state.items);
    return (
      <div className="main">
        <section className="grid">
        {this.renderItem()}
        </section>
      </div>
    );
  }
}

const styles = {
  productImageTitle: {
    textTransform:'uppercase',
    color: '#343434',
    marginBottom: 0,
    fontWeight:'bold',
    fontSize: 18,
    marginTop: 10
  },
  productInfo: {
    color: '#6900E1',
    fontSize: 16,
    fontWeight: 'bold'
  }
};

function mapStateToProps(state) {
  return {
    categories: state.product.categories,
    category: state.product.category,
    items: state.product.items,
    item: state.product.item,
    itemName: state.product.itemName
  };
}

export default connect(mapStateToProps, { getItems, getItem, addToCart })(App);
