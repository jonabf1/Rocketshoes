import { combineReducers } from 'redux';

import reducer from './cart/reducer';

// loader de reducers
export default combineReducers({
  cart: reducer.cart,
  favorite: reducer.favorite,
});
