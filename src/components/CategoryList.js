import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory, setCategory, makeItemNil } from '../actions/CrudProduct.js';


class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    this.props.getCategory();
    this.getCategory(this.props.categories);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      if (!this.isEqual(this.props.categories, nextProps.categories)) {
        this.getCategory(nextProps.categories);
      }
    }
  }
  getCategory(categories) {
    const keys = Object.keys(categories);
    const arr = [];
    for (let i = 0; i < keys.length; i++) {
      arr.push({ name: keys[i], value: categories[keys[i]] });
    }
    this.setState({ categories: arr });
  }
  isEqual(obj1, obj2) {
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
  setCategory(v) {
    console.log(v);
    this.props.makeItemNil();
    this.props.setCategory(v);
  }
  renderList() {
    return this.state.categories.map((d, i) => {
      return (
        <li key={i}><Link to="/" onClick={() => this.setCategory(d.name)}><span className="category-name">{d.name}</span><span className="category-item-number pull-right">{d.value}</span></Link></li>
      );
    });
  }
   render() {
    return (
      <div className="sidebar">
      <h5 style={{ color: '#4a4a4a', fontSize: 16, marginTop: 20, marginLeft: 10}}>Category</h5>
      <ul style={styles.groupListLeft} className='list-unstyled'>
       {this.renderList()}
      </ul>
        <Link to="/product/new"><h5 style={{ alignSelf: 'center', textAlign: 'center', color: '#7210E4' }}><i className="fa fa-plus"></i> add new Product</h5></Link>
      </div>
    );
   }
}

const styles = {
  groupListLeft: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  categoryItem: {
    width: 300,
    height: 45,
    alignItems: 'center',
    display: 'flex',
  },
  categoryItemLink: {
    color: '#4a4a4a',
    fontFamily: 'Roman, Avenir',
    fontSize: 14,
    textDecoration: 'none'
  }
};

function mapStateToProps(state) {
  return {
    categories: state.product.categories
  };
}

export default connect(mapStateToProps, { getCategory, setCategory, makeItemNil })(CategoryList);
