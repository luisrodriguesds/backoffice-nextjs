import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'device',
  initialState: {
    device: {
      productId: '',
      hardwareUid: '',
      deviceUid: '',
      customerId: '',
      provisionInfo: {},
    },
  },
  reducers: {
    setDevice: (state, data) => {
      state.device = data.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDevice } =
  counterSlice.actions;

export const setDeviceData = (data) => (dispatch) => {
  dispatch(setDevice(data));
};

export const setResetData = () => (dispatch) => {
  dispatch(setDevice( {
    productId: '',
    hardwareUid: '',
    deviceUid: '',
    customerId: '',
    provisionInfo: {},
  }));
};


export default counterSlice.reducer;
