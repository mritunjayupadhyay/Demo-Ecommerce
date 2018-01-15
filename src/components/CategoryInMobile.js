import React, { Component } from 'react';
import CategoryList from './CategoryList.js';
import SearchCard from './SearchCard.js';


class CategoryInMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: true
    };
  }
  handleClick() {
    this.setState(prevState => ({
      close: !prevState.close
    }));
  }
  closeOrOpen() {
    if (this.state.close) {
      return (
        <button
        onClick={() => this.handleClick()}
        style={styles.closeContainer}>
          <i className="fa fa-bars" />
        </button>
    );
    }
    return (
      <div
      onClick={() => this.handleClick()}
      >
        <div style={{ flexDirection: 'row', display: 'flex', border: '1px solid #ddd' }}>
        <button
        style={{ width: 40, height: 50, border: 0, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <i className="fa fa-close" />
        </button>
        </div>
        <CategoryList />
      </div>
    );
  }
  render() {
    return (
      <div style={{ paddingVertical: 5 }}>
        <SearchCard />
        {this.closeOrOpen()}
      </div>
    );
  }
}
const styles = {
  closeContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 150,
    left: 0,
    zIndex: 100,
    border: 0
  }
};
export default CategoryInMobile;
