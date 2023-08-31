import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import inventoryReducer from './slices/inventorySlice';
import salesReducer from './slices/salesSlice';
import purchaseReducer from './slices/purchaseSlice';

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  sales:salesReducer,
  purchase:purchaseReducer,
});

export default rootReducer;
