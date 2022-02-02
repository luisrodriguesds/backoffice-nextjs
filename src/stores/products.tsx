import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'products',
    initialState: {
        products: {
            countries: [],
            deleted: '',
            deviceUidInput: [],
            hardware: [],
            hardwareOperand: '',
            icons: [],
            id: '',
            images: [],
            name: '',
            productCapability: '',
            version: '',
        }
    },
    reducers: {
        setProducts: (state, data) => {
            state.products = data.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProducts } = counterSlice.actions

export const setProductsData = (data) => dispatch => {
    dispatch(setProducts(data));
};


export default counterSlice.reducer;
