import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import inventoryReducer from './slices/inventorySlice';

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer
});

export default rootReducer;
