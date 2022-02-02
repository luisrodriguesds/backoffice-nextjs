import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'productDeviceSharing',
    initialState: {
      productCapability: {},
    },
    reducers: {
        setProductCapability: (state, data) => {
            state.productCapability = data.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProductCapability } = counterSlice.actions

export const setProductCapabilityData = (data) => dispatch => {
    dispatch(setProductCapability(data));
};




export default counterSlice.reducer;
