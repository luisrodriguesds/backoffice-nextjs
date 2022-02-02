import { createSlice } from '@reduxjs/toolkit';

export const serviceAddonSlice = createSlice({
  name: 'serviceAddonSlice',
  initialState: {
    serviceAddon: {
      serviceDefinition: {
        image: '',
      },
      serviceUid: '',
      image: '',
      requiredFeatureSupport: '',
      countries: [],
    },
    opco: [],
    currentCountry: {
      country: '',
      name: '',
      description: '',
      termsAndConditionsUrl: '',
      active: '',
      addonCard: {
        headline: '',
        buttons: [
          {
            caption: '',
            content: '',
            phoneNumber: '+',
            url: '',
          },
        ],
      },
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [],
          },
        ],
      },
    },
    error: '',
  },

  reducers: {
    initState: (state, data) => {
      state.serviceAddon = data.payload;
    },
    setRequiredFeatureSupport: (state, data) => {
      state.serviceAddon.requiredFeatureSupport = data.payload;
    },
    setImage: (state, data) => {
      state.serviceAddon.serviceDefinition.image = data.payload;
    },
    setOpco: (state, data) => {
      state.opco = data.payload;
    },
    setCountries: (state, data) => {
      state.serviceAddon.countries = data.payload;
    },
    setCurrentCountry: (state, data) => {
      state.currentCountry = data.payload;
    },
    setCurrentCountryState: (state, data) => {
      state.currentCountry = data.payload;
    },
    setCurrentCountryRequiredUserInfo: (state, data) => {
      state.currentCountry.requiredUserInfo.sections[0].informationChunks = data.payload;
    },
    setCurrentCountryAddonHealine: (state, data) => {
      state.currentCountry.addonCard.headline = data.payload;
    },
    setCurrentCountryAddonButtons: (state, data) => {
      state.currentCountry.addonCard.buttons[data.payload.position] = data.payload.data;
    },
    setError: (state) => {
      state.error = '1';
    },
  },
});

export const {
  initState,
  setOpco,
  setCountries,
  setCurrentCountry,
  setCurrentCountryState,
  setCurrentCountryRequiredUserInfo,
  setCurrentCountryAddonHealine,
  setCurrentCountryAddonButtons,
  setImage,
  setRequiredFeatureSupport,
  setError,
} = serviceAddonSlice.actions;

export const setInitState = (data) => (dispatch) => {
  dispatch(initState(data));
};
export const setRequiredFeatureSupportData = (data) => (dispatch) => {
  dispatch(setRequiredFeatureSupport(data));
};
export const setServiceAddonImageData = (data) => (dispatch) => {
  dispatch(setImage(data));
};
export const setOpcoData = (data) => (dispatch) => {
  dispatch(setOpco(data));
};

export const setCountriesData = (data) => (dispatch) => {
  dispatch(setCountries(data));
};
export const setCurrentCountryData = (data) => (dispatch, getState) => {
  let oldCountries = [...getState().serviceAddons.serviceAddon.countries];
  let country;

  oldCountries.map((curr) => {
    if (curr.country === data.country) {
      country = { ...curr };
      if (!country.requiredUserInfo) {
        country.requiredUserInfo = {
          sections: [
            {
              informationChunks: [
                {
                  key: '',
                  type: '',
                  name: '',
                  localValidation: {
                    maxLength: '',
                    pattern: '',
                  },
                  optional: false,
                },
              ],
            },
          ],
        };
      }
      dispatch(setCurrentCountry(country));
    }
  });
};

export const saveLastCountry = () => (dispatch, getState) => {
  let lastCountry = { ...getState().serviceAddons.currentCountry };

  if (lastCountry.country !== '') {
    let oldCountries = [...getState().serviceAddons.serviceAddon.countries];
    let newObj = [];

    oldCountries.map((curr) => {
      if (curr.country === lastCountry.country) {
        newObj.push(lastCountry);
      } else {
        newObj.push(curr);
      }
    });

    dispatch(setCountries(newObj));
  }
};

export const resetCurrentCountryStateData = () => (dispatch) => {
  const currentCountry = {
    country: '',
    name: '',
    description: '',
    termsAndConditionsUrl: '',
    active: '',
    addonCard: {
      headline: '',
      buttons: [
        {
          caption: '',
          content: '',
          phoneNumber: '+',
          url: '',
        },
      ],
    },
    requiredUserInfo: {
      sections: [
        {
          informationChunks: [],
        },
      ],
    },
  };

  dispatch(setCurrentCountryState(currentCountry));
};

export const setCurrentCountryStateData = (data) => (dispatch) => {
  dispatch(setCurrentCountryState(data));
};

export const setCurrentCountryInfoData = (data) => (dispatch) => {
  dispatch(setCurrentCountryRequiredUserInfo(data));
};

export const setHeadline = (data) => (dispatch) => {
  dispatch(setCurrentCountryAddonHealine(data));
};

export const setAddon = (data) => (dispatch, getState) => {
  const oldObj = { ...getState().serviceAddons.currentCountry.addonCard.buttons[data.position] };

  const newObj = {
    ...oldObj,
    caption: data[data.positionName],
  };

  dispatch(setCurrentCountryAddonButtons({ data: newObj, position: data.position }));
};

export const setAddonInput = (data) => (dispatch, getState) => {
  const oldObj = { ...getState().serviceAddons.currentCountry.addonCard.buttons[data.position] };
  const type = data[data.dropdownType];
  let newObj = { ...oldObj };

  switch (type) {
    case 'phoneNumber':
      newObj = {
        ...oldObj,
        type: 'click2call',
        phoneNumber: data[data.positionName],
      };
      break;

    case 'url':
      newObj = {
        ...oldObj,
        type: 'click2webview',
        url: data[data.positionName],
      };
      break;

    case 'content':
      newObj = {
        ...oldObj,
        type: 'click2view',
        content: data[data.positionName],
      };
      break;
    default:
      newObj = {
        ...oldObj,
        type: 'editUserInfo',
      };
      break;
  }

  dispatch(setCurrentCountryAddonButtons({ data: newObj, position: data.position }));
};

export default serviceAddonSlice.reducer;
