import { ProductModel } from "../products/products-models";

interface stateListCustomers {
  customersData: {
    listCustomers: [
      {
        countryCode: string;
        customerId: string;
        devices: [];
        msisdn: string;
        searchCriteria: string;
      }
    ];
  };
}

interface itemList {
  countryCode: string;
  customerId: string;
  devices: [];
  msisdn: string;
  searchCriteria: string;
}

interface customerLogs {
  details: string[];
  message: string;
  timestamp: string;
}

interface customerNotes {
  content: string;
  createdBy: string;
  createdDate: string;
  customerId: string;
}

interface customerBilling {
  items: {
    type: string;
    product: string;
    id: string;
    date: string;
    price: string;
    currency: string;
    service: string;
    purchaseType: string;
    serviceStartDate: string;
    serviceEndDate: string;
    hardwareId: string;
    cardType: string;
    cardLastFourDigits: string;
    links: {
      download: {
        href: string;
        type: string;
      };
    };
  }[];
  links: {
    self: {
      href: string;
      type: string;
    };
    previous: {
      href: string;
      type: string;
    };
  };
  totalItems: string;
}

interface DevicesProps {
  customerId: string;
  customerRole: string;
  deleted: boolean;
  deviceControlResourceAvailable: boolean;
  deviceUid: string;
  everInUse: boolean;
  hardwareUid: string;
  id: string;
  linkStatus: string;
  name: string;
  status: string;
  subscriptionInfo: {
    subscriptionId: string;
    pricingText1: string;
    pricePoint: string;
  };
  provisionInfo: {
    cameraSerialNumber: string;
    deviceSerialNumber: string;
    kit_type: string;
  };
  productId: string;
  product: ProductModel;
}

interface CustomerDevices {
  searchCriteria: string;
  devices: DevicesProps[];
  countryCode: string;
  msisdn: string;
  customerId: string;
}

export {
  stateListCustomers,
  itemList,
  customerLogs,
  customerNotes,
  customerBilling,
  CustomerDevices,
};
