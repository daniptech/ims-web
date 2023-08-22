import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  compositeItem: [],
  itemGroup: [],
  priceList: [],
  inventoryAdjustments: []
};
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    },
    setCompositeItem: (state, action) => {
      state.compositeItem = action.payload;
    },
    setItemGroup: (state, action) => {
      state.itemGroup = action.payload;
    },
    setPriceList: (state, action) => {
      state.priceList = action.payload;
    },
    setInventoryAdjustments: (state, action) => {
      state.inventoryAdjustments = action.payload;
    }
  }
});

export const { setItem, setCompositeItem, setItemGroup, setPriceList, setInventoryAdjustments } =
  inventorySlice.actions;
export default inventorySlice.reducer;
