import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  vendor: [],
  purchaseOrder: [],
  purchaseReceives: [],
  bills: [],
  paymentMode: [],
  vendorCredits:[]
};
const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },
    setpurchaseOrder: (state, action) => {
      state.purchaseOrder = action.payload;
    },
    setPurchaseReceives: (state, action) => {
      state.purchaseReceives = action.payload;
    },
    setBills: (state, action) => {
      state.bills = action.payload;
    },
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload;
    },
    setVendorCredits: (state, action) => {
        state.vendorCredits = action.payload;
      },
  }
});

export const { setVendor,setpurchaseOrder,setPurchaseReceives,setBills,setPaymentMode,setVendorCredits } =
  purchaseSlice.actions;
export default purchaseSlice.reducer;
