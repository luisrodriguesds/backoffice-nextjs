import { ProductModel } from "../products/products-models";

interface DevicesModel {
  devicesData: {
    devices: {
      content: DevicesContentModel[];
      pageable: {
        pageNumber: boolean;
        pageSize: Number;
        offset: Number;
        paged: boolean;
        unpaged: boolean;
        sort: {};
      };
      last: boolean;
      totalPages: number;
      totalElements: Number;
      first: boolean;
      sort: {};
      numberOfElements: Number;
      size: Number;
      number: Number;
      empty: boolean;
    };
    filterProducts: [];
    filterCustomer: string;
    linkSearch: string;
  };
}

interface DevicesContentModel {
  id?: string;
  deviceUid: string;
  hardwareUid: string;
  status: string;
  linkStatus: string;
  statusTimestamp: string;
  deleted: boolean;
  everInUse: boolean;
  iccid: string;
  imsi: string;
  msisdn: string;
  customInfo: {};
  deviceControlResourceAvailable: boolean;
  provisionInfo: { [key: string]: string };
  product: ProductModel | string;
  productId?: string;
  subscriptionInfo: {
    opcoId: string;
  };
  customerId: string;
}

interface ProductsTags {
  avatars: [];
  countries: [];
  deleted: false;
  deviceUidInput: [];
  hardware: [];
  hardwareOperand: string;
  icons: [];
  id: string;
  images: [];
  name: string;
  productCapability: {};
  version: string;
}

interface dropdownValues {
  target: {
    value: "";
  };
}

interface DevicesTransactionsModel {
  transactionId: string;
  hardwareUid: string;
  productId: string;
  requestorId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deviceCreated: {
    deviceUid: string;
    provisionInfo: { imei: string; imsi: string };
  };
  importFileData: {
    s3Key: string;
    fileSize: string;
  };
  importResult: {
    successCount: number;
    failedCount: number;
    failureReason: string;
    failureFileS3Key: string;
  };
}
interface DeviceModel {
  productId: string;
  hardwareUid: string;
  deviceUid: string;
  customerId: string;
  provisionInfo: { [key: string]: string };
}

interface ProvisionInfoResponseModel {
  fields: ProvisionInfoFieldResponseModel[];
}

interface ProvisionInfoFieldResponseModel {
  name: string;
  label: string;
  required: boolean;
}

interface DeviceInfoModel {
  info: {};
  infoLabelsGroup: DeviceInfoLabels[];
}

interface DeviceInfoLabels {
  name: string;
  infoLabels: [
    {
      infoKey: string;
      label: string;
    }
  ];
}

export {
  DevicesModel,
  DevicesContentModel,
  ProvisionInfoResponseModel,
  ProductsTags,
  dropdownValues,
  DevicesTransactionsModel,
  DeviceModel,
  ProvisionInfoFieldResponseModel,
  DeviceInfoModel,
};
