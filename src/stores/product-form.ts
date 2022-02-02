import { createSlice } from '@reduxjs/toolkit';

export const PRODUCT_FORM_INIT = {
  productInfo: {
    id: '',
    name: '',
    hardware: [],
    countries: [],
    deviceUidInput: [],
    icons: [],
    avatars: [],
    images: [],
    productCapability: {},
  },
  permissions: {
    create: false,
    update: false,
    delete: false,
  },
  error: '',
  opco: [],
  currentCountry: {
    callingCode: '',
    contactInfo: '',
    countryCode: '',
    emailId: '',
    instructionVideo: '',
    locale: '',
    partnerUrl: '',
    privacyPolicy: '',
    requiresKYC: false,
    requiresPaymentExperience: true,
    requiresProfileCompleteness: false,
    serviceId: {
      addonServices: [],
      packages: [],
      paymentPartner: '',
      serviceId: '',
    },
    status: '',
    termsAndConditions: '',
    version: '',
  },
  serviceAddonsList: [],
};

export const productFormSlice = createSlice({
  name: 'ProductFormSlice',
  initialState: PRODUCT_FORM_INIT,
  reducers: {
    initState: (state, data) => {
      state.productInfo = data.payload;
    },
    restartState: (state, data) => {
      state.productInfo = data.payload.productInfo;
      state.currentCountry = data.payload.currentCountry;
      state.permissions = data.payload.permissions;
      state.serviceAddonsList = data.payload.serviceAddonsList;
      state.opco = data.payload.opco;
      state.error = data.payload.error;
    },
    setError: (state) => {
      state.error = '1';
    },
    setName: (state, data) => {
      state.productInfo.name = data.payload;
    },
    setHardware: (state, data) => {
      state.productInfo.hardware = data.payload;
    },
    setOpco: (state, data) => {
      state.opco = data.payload;
    },
    setCountries: (state, data) => {
      state.productInfo.countries = data.payload;
    },
    setCurrentCountryState: (state, data) => {
      state.currentCountry = data.payload;
    },
    setCurrentCountry: (state, data) => {
      state.currentCountry = data.payload;
    },
    setPackagesCurrentCountry: (state, data) => {
      state.currentCountry.serviceId.packages = data.payload;
    },
    setServiceAddonCurrentCountry: (state, data) => {
      if (state.currentCountry.serviceId.addonServices) {
        state.currentCountry.serviceId.addonServices = data.payload;
        return;
      }
      state.currentCountry.serviceId = {
        // @ts-ignore
        addonServices: data.payload,
        ...state.currentCountry.serviceId,
      };
    },
    setDeviceUidInput: (state, data) => {
      state.productInfo.deviceUidInput = data.payload;
    },
    setProductImages: (state, data) => {
      state.productInfo.images = data.payload;
    },
    setProductIcons: (state, data) => {
      state.productInfo.icons = data.payload;
    },
    setProductAvatars: (state, data) => {
      state.productInfo.avatars = data.payload;
    },
    setServiceAddonsList: (state, data) => {
      state.serviceAddonsList = data.payload;
    },
    setPermissions: (state, data) => {
      state.permissions = data.payload;
    },
    setServiceId: (state, data) => {
      state.currentCountry.serviceId.serviceId = data.payload;
    },
    setPaymentPartner: (state, data) => {
      state.currentCountry.serviceId.paymentPartner = data.payload;
    },
  },
});

export const {
  initState,
  restartState,
  setError,
  setName,
  setHardware,
  setOpco,
  setCountries,
  setCurrentCountryState,
  setCurrentCountry,
  setPackagesCurrentCountry,
  setServiceAddonCurrentCountry,
  setDeviceUidInput,
  setProductImages,
  setProductIcons,
  setProductAvatars,
  setServiceAddonsList,
  setPermissions,
  setServiceId,
  setPaymentPartner,
} = productFormSlice.actions;

export const setInitState = (data) => (dispatch) => {
  dispatch(initState(data));
};

export const setRestartState = (data) => (dispatch) => {
  dispatch(restartState(data));
};

export const setNameState = (data) => (dispatch) => {
  dispatch(setName(data));
};

export const setHardwareState = (data) => (dispatch) => {
  dispatch(setHardware(data));
};

export const setOpcoData = (data) => (dispatch) => {
  dispatch(setOpco(data));
};

export const setCountriesData = (data) => (dispatch) => {
  dispatch(setCountries(data));
};

export const setCurrentCountryStateData = (data) => (dispatch) => {
  dispatch(setCurrentCountryState(data));
};

export const setPackagesCurrentCountryData = (data) => (dispatch, getState) => {
  dispatch(setPackagesCurrentCountry(data));
};

export const setServiceAddonCurrentCountryData = (data) => (dispatch, getState) => {
  dispatch(setServiceAddonCurrentCountry(data));
};

export const setServiceAddonsListData = (data) => (dispatch, getState) => {
  dispatch(setServiceAddonsList(data));
};

export const setServiceIdData = (data) => (dispatch, getState) => {
  dispatch(setServiceId(data));
};

export const setPaymentPartnerData = (data) => (dispatch, getState) => {
  dispatch(setPaymentPartner(data));
};

export const saveLastCountry = () => (dispatch, getState) => {
  let lastCountry = { ...getState().product.currentCountry };

  if (lastCountry.countryCode !== '') {
    let oldCountries = [...getState().product.productInfo.countries];
    let newObj = [];

    oldCountries.map((curr) => {
      if (curr.countryCode === lastCountry.countryCode) {
        newObj.push(lastCountry as never);
      } else {
        newObj.push(curr as never);
      }
    });

    dispatch(setCountries(newObj));
  }
};

export const setCurrentCountryData = (data) => (dispatch, getState) => {
  let oldCountries = [...getState().product.productInfo.countries];
  let country;
  oldCountries.map((curr) => {
    if (curr.countryCode === data.countryCode) {
      country = { ...curr };
      dispatch(
        setCurrentCountry({
          ...country,
          serviceId: {
            ...country.serviceId,
            packages: country.serviceId.packages || [],
            addonServices: country.serviceId.addonServices || [],
          },
        })
      );
    }
  });
};

export const setReloadCurrentCountry = (data) => (dispatch) => {
  dispatch(setCurrentCountry(data));
};

export const setDeviceUidInputData = (data) => (dispatch) => {
  dispatch(setDeviceUidInput(data));
};

export const setProductImagesData = (data) => (dispatch) => {
  dispatch(setProductImages(data));
};

export const setProductAvatarsData = (data) => (dispatch) => {
  dispatch(setProductAvatars(data));
};

export const setProductIconsData = (data) => (dispatch) => {
  dispatch(setProductIcons(data ? [{ ...data }] : []));
};

export const setPermissionsData = (data) => (dispatch) => {
  dispatch(setPermissions(data));
};

export default productFormSlice.reducer;
