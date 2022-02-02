import { createSlice } from '@reduxjs/toolkit';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const counterSlice = createSlice({
  name: 'customer',
  initialState: {
    listCustomers: [],
    billing: {
      year: new Date().getFullYear(),
      month: months[new Date().getMonth()],
    },
  },
  reducers: {
    setCustomersList: (state, data) => {
      state.listCustomers = data.payload;
    },
    setBillingYear: (state, data) => {
      state.billing.year = data.payload;
    },
    setBillingMonth: (state, data) => {
      state.billing.month = data.payload;
    },
  },
});

export const { setCustomersList, setBillingYear, setBillingMonth } = counterSlice.actions;

export const setBillingYearData = (data) => (dispatch) => {
  dispatch(setBillingYear(data));
};

export const setBillingMonthData = (data) => (dispatch) => {
  dispatch(setBillingMonth(data));
};

export const setCustomersListData = (data) => (dispatch) => {
  dispatch(setCustomersList(data));
};

export default counterSlice.reducer;
