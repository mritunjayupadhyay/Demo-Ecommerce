import { combineReducers } from 'redux';
import Product from './ProductReducer.js';

const rootReducer = combineReducers({
  product: Product
});

export default rootReducer;
