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
    // getFirmSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.firms = payload.data;
    // },
    //!2. yöntemle butun verileri url ile getirme
    getStockSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.url] = payload.apiData;
    },

    getProPurBrandFirmSuccess: (state, { payload }) => {
      state.products = payload[0] || [];
      state.purchases = payload[1] || [];
      state.brands = payload[2] || [];
      state.firms = payload[3] || [];
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getStockSuccess,
  fetchFail,
  getProPurBrandFirmSuccess,
} = authSlice.actions;
export default authSlice.reducer;
