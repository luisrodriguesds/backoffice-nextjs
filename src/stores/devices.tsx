import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'devices',
  initialState: {
    devices: {
      content: [{ id: '' }],
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        offset: 0,
        paged: false,
        unpaged: false,
        sort: {},
      },
      last: false,
      totalPages: 0,
      totalElements: 0,
      first: false,
      sort: {},
      numberOfElements: 0,
      size: 0,
      number: 0,
      empty: false,
    },
    filterProducts: [],
    filterCustomer: '',
    linkSearch: '',
  },
  reducers: {
    setDevices: (state, data) => {
      state.devices = data.payload;
    },
    setDevicesFilteredContent: (state, data) => {
      state.devices.content = data.payload;
    },
    setFilterCustomer: (state, data) => {
      state.filterCustomer = data.payload;
    },
    setFilterProducts: (state, data) => {
      state.filterProducts = data.payload;
    },
    setLinkSearch: (state, data) => {
      state.linkSearch = data.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDevices, setDevicesFilteredContent, setFilterProducts, setFilterCustomer, setLinkSearch } =
  counterSlice.actions;

export const setDevicesData = (data) => (dispatch) => {
  dispatch(setDevices(data));
};

export const setDevicesFilteredContentData = (data) => (dispatch) => {
  dispatch(setDevicesFilteredContent(data));
};

export const setFilterProductsData = (data) => (dispatch) => {
  dispatch(setFilterProducts(data));
};

export const setFilterCustomerData = (data) => (dispatch) => {
  dispatch(setFilterCustomer(data));
};

export const setLinkSearchData = (data) => (dispatch) => {
  dispatch(setLinkSearch(data));
};

export default counterSlice.reducer;
