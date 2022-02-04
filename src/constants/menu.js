import ProductApps from  '../../public/icons/ProductApps.png';
import HardwareTypes from  '../../public/icons/HardwareTypes.png';
import Products from '../../public/icons/Products.png';
import ServiceCatalogue from  '../../public/icons/ServiceCatalogue.png';
import ServiceAddons from  '../../public/icons/ServiceAddons.png';
import Devices from  '../../public/icons/Devices.png';
import Customers from  '../../public/icons/Customers.png';
import Reports from  '../../public/icons/Reports.png';
import ClientConfiguration from  '../../public/icons/ClientConfiguration.png';
import Translations from  '../../public/icons/Translations.png';
import UserManagement from  '../../public/icons/UserManagement.png';
import TelUriCredentials from  '../../public/icons/TelUriCredentials.png';
import EventManagement from  '../../public/icons/EventManagement.png';
import FirmwareManagement from  '../../public/icons/FirmwareManagement.png';
import Warning from  '../../public/icons/warning_notification.png';

const menu = [
  { id: 0, name: "Product Apps", auth: true, iconSrc: ProductApps.src, Permission:'VIEW_APPS', route:'apps' },
  { id: 1, name: "Hardware Types", auth: true, iconSrc: HardwareTypes.src, Permission:'VIEW_HARDWARE', route:'hardware' },
  { id: 2, name: "Products", auth: true, iconSrc: Products.src, Permission: 'VIEW_PRODUCTS', route:'products' },
  { id: 3, name: "Product Catalogue", auth: true, iconSrc: ServiceCatalogue.src, Permission: 'VIEW_TOC' , route:'product-catalogue' },
  { id: 4, name: "Service Addons", auth: true, iconSrc: ServiceAddons.src, Permission: 'VIEW_PRODUCTS' , route:'service-addons' },
  { id: 5, name: "Devices", auth: true, iconSrc: Devices.src, Permission: 'VIEW_DEVICES', route:'devices'  },
  { id: 6, name: "Customers", auth: true, iconSrc: Customers.src, Permission: 'VIEW_CUSTOMERS', route:'customers'  },
  { id: 7, name: "Reports", auth: true, iconSrc: Reports.src, Permission: 'VIEW_REPORTS', route:'reports'  },
  { id: 8, name: "Client Configuration", auth: true, iconSrc: ClientConfiguration.src, Permission: 'VIEW_CLIENT_CONFIG', route:'client-config'  },
  { id: 9, name: "Translations", auth: true, iconSrc: Translations.src, Permission: 'VIEW_TRANSLATIONS', route:'translations'  },
  { id: 10, name: "User Management", auth: true, iconSrc: UserManagement.src, Permission: 'VIEW_USERS', route:'user-management'  },
  { id: 11, name: "TelUri Credentials", auth: true, iconSrc: TelUriCredentials.src, Permission: 'VIEW_TELURI', route:'teluri-credentials' },
  { id: 12, name: "EventManagement", auth: true, iconSrc: EventManagement.src, Permission: 'IMPORT_TRANSLATIONS', route:'event'  },
  { id: 13, name: "Firmware Management", auth: true, iconSrc: FirmwareManagement.src, Permission: 'IMPORT_TRANSLATIONS', route:'teluri-credentials'},
];

//Enable debugger menu for specific environments only
if (typeof window !== "undefined") {
  // Client-side-only code
  if([
    'content-vader.smartlife.vodafo.ne',
    'content-yoda.smartlife.vodafo.ne',
    'content-luke.smartlife.vodafo.ne',
    'content.smartlife.vodafo.ne', //staging
    'localhost',
  ].includes(window.location.hostname)) menu.push(
    { id: 666, name: "Debugger", auth: true, iconSrc: Warning.src, Permission: 'DEBUGGER', route:'debugger-screen'} 
  );
}

export default menu;
