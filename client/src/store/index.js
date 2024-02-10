import { configureStore, createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { logged: false, details: {}, viewing: false, course: 1, dashboard: false },
  reducers: {
    login(state, action) {
      state.logged = true;
    },
    logout(state, action) {
      state.logged = false;
    },
    setUserDetails(state, action) {
      state.details = action.payload;
    },
    setViewTrue(state, action) {
      state.viewing = true;
    },
    setViewFalse(state, action) {
      state.viewing = false;
    },
    setCurrCourseView(state, action) {
      state.course = action.payload;
    },
    setDashTrue(state,action) {
      state.dashboard = true;
    },
    setDashFalse(state,action) {
      state.dashboard = false;
    },
  },
});

export const {
  login,
  logout,
  setUserDetails,
  setViewTrue,
  setViewFalse,
  setCurrCourseView,
  setDashTrue,
  setDashFalse,
} = userDetailsSlice.actions;

const store = configureStore({
  reducer: userDetailsSlice.reducer,
});

export default store;
