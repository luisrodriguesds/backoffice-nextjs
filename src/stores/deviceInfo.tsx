import { createSlice } from '@reduxjs/toolkit';
import { boolean } from 'yup/lib/locale';

export const counterSlice = createSlice({
  name: 'device',
  initialState: {
    device: {
      customInfo: {},
      customerId: '',
      deleted: '',
      deviceControlResourceAvailable: '',
      deviceUid: '',
      everInUse: '',
      hardwareUid: '',
      id: '',
      linkStatus: '',
      product: {},
      provisionInfo: {},
      status: '',
      statusTimestamp: '',
    },
    deviceInfo: {
      info: {},
      infoLabelsGroup: [
        {
          name: '',
          infoLabels: {
            infoKey: '',
            label: '',
          },
        },
      ],
    },
  },
  reducers: {
    setDeviceInfo: (state, data) => {
      state.deviceInfo = data.payload;
    },
  },
});

export const { setDeviceInfo } = counterSlice.actions;

export const setDeviceInfoData = (data) => (dispatch) => {
  dispatch(setDeviceInfo(data));
};

export default counterSlice.reducer;
