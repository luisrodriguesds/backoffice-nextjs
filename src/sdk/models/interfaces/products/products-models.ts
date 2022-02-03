interface ProductModel {
  id: string;
  name: string;
  hardware: [];
  hardwareOperand: string;
  countries: ProductCountryModel[];
  deviceUidInput: [];
  icons: [];
  avatars: [];
  images: [];
  productCapability: {};
  deleted: false;
  version: string;
}
interface ProductCountryModel {
  callingCode: string;
  contactInfo: string;
  countryCode: string;
  emailId: string;
  instructionVideo: string;
  locale: string;
  partnerUrl: string;
  privacyPolicy: string;
  requiresKYC: boolean;
  requiresPaymentExperience: boolean;
  requiresProfileCompleteness: boolean;
  serviceId: any;
  status: string;
  termsAndConditions: string;
  version: string;
  customProperties?: Map<string, string>;
}

interface CustomField {
  name: string;
  label: string;
  type: "CHECKBOX" | "SELECTBOX" | "TEXTBOX" | "MULTISELECTBOX";
  values: Object;
  options: string;
}

interface SpecificCountryInfo {
  fields: CustomField[];
}

export { ProductCountryModel, CustomField, SpecificCountryInfo, ProductModel };
