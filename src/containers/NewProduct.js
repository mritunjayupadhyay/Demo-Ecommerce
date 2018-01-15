import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFirebase, addCategory, addItemsToFirebase } from '../actions/CrudProduct.js';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageName: '',
      name: '',
      progress: 0,
      properties: [],
      categories: {}
    };
  }
  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }
  componentWillReceiveProps(nextProps) {
    if (!this.isEqual(this.props.categories, nextProps.categories)) {
      this.setState({ categories: nextProps.categories });
    }
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
  uploadImage(val) {
    const file = val.target.files[0];
    const storageRef = firebase.storage().ref(`productImages/${file.name}`);
    const task = storageRef.put(file).then((snapshot) => {
      console.log(snapshot);
      const v = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({ progress: v });
      this.setState({ imageName: file.name });
    });
  }
  renderAllProperties() {
    return this.state.properties.map((d, i) =>
        {
          return (
            <li>
            <input type="text" className="ImageButton field-style field-full" value={d} onChange={(val) => this.editProperty(val.target.value, i)} />

            </li>
          );
        }
    );
  }
  editProperty(v, i) {
    const arr = this.state.properties;
    const newArr = arr.map((d, index) => {
      if (i === index) {
        return v;
      }
      return d;
    });
    this.setState({ properties: newArr });
  }
  addProperty() {
    const v =  this.state.property;
    if (v === '') {
      return;
    }
    console.log(v);
    this.setState({ properties: [ ...this.state.properties, v], property: ''});
  }
  renderPropertyField() {

      return (
        <li style={{ flexDirection: 'row', display: 'flex' }}>
          <input type="text" className="ImageButton field-style field-full" value={this.state.property} onChange={(val) => this.setState({ property: val.target.value })} />
          <button className="Form-Button" onClick={() => this.addProperty()}>add</button>
        </li>
      );
  }
  renderSubmitButton() {
    if (!(this.state.name && this.state.price && this.state.category)) {
      return;
    }
    return (
      <li>
        <Link to="/">
            <input type="submit" onClick={() => this.saveDataToFirebase() } className="Form-Button field-style field-full" style={{ borderRadius: 20 }} />
        </Link>
      </li>
    );
  }
  saveDataToFirebase() {
    const obj = {};
    obj.name = this.state.name;
    obj.price = this.state.price;
    obj.properties = this.state.properties;
    obj.imageName = this.state.imageName;
    obj.category = this.state.category;
    const category = this.state.category;
    const copy = Object.assign({}, this.state.categories);
    this.props.addCategory(copy, category);
    this.props.addItemsToFirebase(obj, category);
  }
  render() {
    return (
      <div className="single-product-outer">
        <div className="single-product-inner ProductForm" style={styles.makeInCenter}>
          <h3 className="form-style-9-header">Fill Product Details</h3>
          <div className="form-style-9">
          <ul>
          <li>
            <h5 className="Fomlabel">Add Product Category</h5>
            <input type="text" className="ImageButton field-style field-full" value={this.state.category} onChange={(val) => this.setState({ category: val.target.value })}/>
          </li>
          <li>
            <h5 className="Fomlabel">Add Product Image</h5>
            <progress value={this.state.progress} max="100" className="uploader"></progress>
            <input type="file" className="ImageButton field-style field-full" value={this.state.image} onChange={(val) => this.uploadImage(val)}/>
          </li>
          <li>
            <h5 className="Fomlabel">Add Product Name</h5>
            <input type="text" className="ImageButton field-style field-full" value={this.state.name} onChange={(val) => this.setState({ name: val.target.value })}/>
          </li>
          <li>
            <h5 className="Fomlabel">Add Product Price</h5>
            <input type="number" className="ImageButton field-style field-full" value={this.state.price} onChange={(val) => this.setState({ price: val.target.value })}/>
          </li>
            <h5 className="Fomlabel">Add Product Properties</h5>
            {this.renderAllProperties()}
            {this.renderPropertyField()}
            {this.renderSubmitButton()}
          </ul>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
   makeInCenter: {
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center'
   }
};
function mapStateToProps(state) {
  return {
    categories: state.product.categories
  };
}

export default connect(mapStateToProps, { addToFirebase, addCategory, addItemsToFirebase })(NewProduct);
