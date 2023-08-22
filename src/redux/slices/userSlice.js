import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentuser: null,
  allUSer: []
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentuser = action.payload;
    },
    getAllUser: (state, action) => {
      state.allUSer = action.payload;
    }
  }
});

export const { setCurrentUser, getAllUser } = userSlice.actions;
export default userSlice.reducer;
