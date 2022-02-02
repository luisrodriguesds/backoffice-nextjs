import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'productCatalogue',
  initialState: {
    catalogue: {
      opco: [],
      products: [],
      currentCountry: {
        productTOC: [
          {
            products: [],
          },
          {
            products: [],
          },
        ],
        history: [],
        countryCode: '',
      },
    },
  },
  reducers: {
    setOpco: (state, data) => {
      state.catalogue.opco = data.payload;
    },
    setCurrentCountry: (state, data) => {
      state.catalogue.currentCountry = data.payload;
    },
    setProducts: (state, data) => {
      state.catalogue.products = data.payload;
    },
    setCompleteControl: (state, data) => {
      state.catalogue.currentCountry.productTOC[0].products = data.payload;
    },
    setDataPlan: (state, data) => {
      state.catalogue.currentCountry.productTOC[1].products = data.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpco, setCurrentCountry, setProducts, setCompleteControl, setDataPlan } = counterSlice.actions;

export const setOpcoData = (data: any) => (dispatch: any) => {
  dispatch(setOpco(data));
};

export const setCurrentCountryData = (data: any) => (dispatch: any) => {
  dispatch(setCurrentCountry(data));
};

export const setProductsData = (data: any) => (dispatch: any) => {
  dispatch(setProducts(data));
};

export const setCompleteControlData = (data: any) => (dispatch: any) => {
  dispatch(setCompleteControl(data));
};

export const setDataPlanData = (data: any) => (dispatch: any) => {
  dispatch(setDataPlan(data));
};

export default counterSlice.reducer;
