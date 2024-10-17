import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  purchases: [],
  sales: [],
  brands: [],
  products: [],
  categories: [],
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "stock",

  initialState: {},
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    //! 1. YÖNTEM
    // getFirmSuccess: (state, {payload}) => {
    //   state.loading = false;
    //   state.firms = payload.data;
    // },
    //!2. yöntemle butun verileri url ile getirme
    getStockSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.url] = payload.apiData;
    },

  

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getStockSuccess, fetchFail } = authSlice.actions;
export default authSlice.reducer;
