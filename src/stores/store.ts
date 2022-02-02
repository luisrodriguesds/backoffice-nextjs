import { combineReducers, configureStore } from '@reduxjs/toolkit';
import serviceAddonsReducer from './serviceAddons';
import productReducer from './products';
import productFormReducer from './product-form';
import productCatalogueReducer from './product-catalogue';
import devicesReducer from './devices';
import productDeviceSharing from './productDeviceSharing';
import deviceForm from './deviceForm';
import deviceInfo from './deviceInfo';
import customersData from './customers';

export default configureStore({
  reducer: {
    serviceAddons: serviceAddonsReducer,
    products: productReducer,
    product: productFormReducer,
    productCatalogue: productCatalogueReducer,
    devicesData: devicesReducer,
    device: deviceForm,
    deviceInfo: deviceInfo,
    productDeviceSharing: productDeviceSharing,
    customersData: customersData,
  },
});
