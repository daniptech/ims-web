import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  customer: [],
  salesOrder: [],
  packages: [],
  shipment: [],
  deliveryChallans: [],
  invoices: [],
  paymentReceived: [],
  return: [],
  creditNotes: []
};
const salesSlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setSalesOrder: (state, action) => {
      state.salesOrder = action.payload;
    },
    setPackages: (state, action) => {
      state.packages = action.payload;
    },
    setShipments: (state, action) => {
      state.shipment = action.payload;
    },
    setDeliveryChallans: (state, action) => {
      state.deliveryChallans = action.payload;
    },
    setInvoice: (state, action) => {
      state.invoices = action.payload;
    },
    setPaymentReceived: (state, action) => {
      state.paymentReceived = action.payload;
    },
    setReturn: (state, action) => {
      state.return = action.payload;
    },
    setCreditNotes: (state, action) => {
      state.creditNotes = action.payload;
    }
  }
});

export const {
  setCustomer,
  setSalesOrder,
  setPackages,
  setShipments,
  setDeliveryChallans,
  setInvoice,
  setPaymentReceived,
  setReturn,
  setCreditNotes
} = salesSlice.actions;
export default salesSlice.reducer;
