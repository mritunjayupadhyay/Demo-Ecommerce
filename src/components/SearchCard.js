import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setItemName, getItem, getCardItem } from '../actions/CrudProduct.js';
import Cart from './Cart.js';

class SearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      cardItems: [],
      modalVisible: false,
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
      if (obj === null) {
        this.setState({ cardItems: []});
      }
      else {
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
      }

    });
  }
  serchThisName(name) {
    console.log('name is here', name);
    firebase.database().ref(`NameAndId`).once('value', (snapshot) => {
      const obj = snapshot.val();
      const keys = Object.keys(obj);
      const arr = [];
      for (let i = 0; i < keys.length; i++) {
        if (name.toLowerCase() === (obj[keys[i]].name).toLowerCase()){
          this.props.getItem(obj[keys[i]].id);
          break;
        }
      }
    });
  }
  renderBilling() {
    if (!this.state.modalVisible) {
      return;
    }
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 200 }}>
             <i className="fa fa-times" style={styles.closeCart} onClick={() => this.setState({ modalVisible: false})}></i>
             <Cart />
      </div>
    );
   }
   renderNoOfAllItem() {
     console.log('card itesm for gtsting tootal', this.state.cardItems);
     if (this.state.cardItems.length === 0) {
       return;
     }
     const total = this.state.cardItems.reduce(function(sum, value) {
                 return sum + (1 * value.no_of_items);
               }, 0);

     return (
       <strong>{total}</strong>
     );
   }
   render() {
    return (
      <div style={{ flex: 1, display: 'flex', marginTop: -1, flexDirection: 'row-reverse', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
      {this.renderBilling()}
        <div style={{height: 50, display: 'flex', width: 150, borderLeft: '1px solid #ddd', alignItems: 'center', justifyContent: 'center' }}>
           <a className="mycart" onClick={() => this.setState({ modalVisible: true })}>
              <span className="shopping-cart-logo">
                <i className="fa fa-shopping-cart"></i>
                <strong className="writing-cart">cart</strong>
              </span>
              <span className="counting-cart-number">
                <small href="#" className="counting-cart-number">{this.renderNoOfAllItem()}</small>
              </span>
           </a>
        </div>
        <div style={{height: 50, flex: 1, display: 'flex', borderBottom: '1px solid #ddd', justifyContent: 'center' }}>
            <input type='text' placeholder='Search Any Item...' value={this.state.itemName} onBlur={() => this.serchThisName(this.state.itemName)} onChange={(val) => this.setState({ itemName: val.target.value })} style={styles.SearchItem}/>
        </div>
      </div>
    );
   }
}

const styles = {
  SearchItem: {
    display: 'flex',
    flex: 1,
    height: 50,
    border: 0,
    paddingLeft: 20,
    outline: 'none'
  },
  closeCart: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 35,
    zIndex: 250,
    cursor: 'pointer'
  }
};
function mapStateToProps(state) {
  return {
    cardItems: state.product.cardItems
  };
}

export default connect(null, { setItemName, getItem, getCardItem })(SearchCard);
