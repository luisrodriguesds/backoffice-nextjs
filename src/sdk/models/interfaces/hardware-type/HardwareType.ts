import { App } from "../apps/App";

export type HardwareType = {
  app: App;
  id: string;
  controllable: boolean;
  deleted: boolean;
  firmware: string[];
  hardwareUid: string;
  manufacturer: string;
  model: string;
};
