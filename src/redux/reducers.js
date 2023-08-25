import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import inventoryReducer from './slices/inventorySlice';
import salesReducer from './slices/salesSlice';

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  sales:salesReducer,
});

export default rootReducer;
