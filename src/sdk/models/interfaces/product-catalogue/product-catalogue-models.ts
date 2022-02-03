interface OrdenatedTableModel {
  name: String;
  priorityOrder: Number;
  productId: String;
}

interface ObjectName {
  name: SVGStringList;
}

interface Products {
  avatars: [];
  countries: [];
  deleted: Boolean;
  deviceUidInput: [];
  hardware: [];
  hardwareOperand: String;
  icons: [];
  id: String;
  images: [];
  name: String;
  productCapability: {};
  version: String;
}

export { OrdenatedTableModel, ObjectName, Products };
