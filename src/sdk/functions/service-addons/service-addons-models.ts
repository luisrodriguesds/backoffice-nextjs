type ServiceAddonResponseModel = {
  servicePlugin: ServicePluginModel;
}

type ServicePluginModel = {
  serviceDefinition: ServiceDefinitionModel;
  servicePlugin: any;
}

type ServiceDefinitionModel = {
  countries: CountryModel[];
  image: ImageModel;
  requiredFeatureSupport: string[];
}

type ImageModel = {
  id: string,
  size: string,
  mimeType: string,
  md5Hash: string,
  uploadDate: string,
  height: string,
  width: string
}

type CountryModel = {
  addonCard: AddonCardModel;
  conditions?: any[];
  country: string;
  description: string
  name: string;
  requiredUserInfo: any;
  termsAndConditionsUrl: string;
  active: boolean;
}

type AddonCardModel = {
  buttons: ButtonModel[];
  headline: string;
}

type ButtonModel = {
  caption: string;
  phoneNumber: string;
  type: string;
  url: string;
}

export {
  ServiceAddonResponseModel,
  ServicePluginModel,
  ServiceDefinitionModel,
  ImageModel,
  CountryModel,
  AddonCardModel,
  ButtonModel,
}
