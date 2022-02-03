import { AxiosResponse } from "axios";
import { http } from "../../config/http-client";
import {
  DevicesContentModel,
} from "../../models/interfaces/devices/devices-models";

const getDeviceInfo = async (deviceUid) => {
  return await http.get(`/devices/${deviceUid}/deviceInfo`, {}, 2);
};

const getDevice = async (deviceUid) : Promise<AxiosResponse<DevicesContentModel>> => {
  return await http.get(`/devices/uid/${deviceUid}?enrichSubscriptionInfo=true`, {}, 2);
};

export default {
  getDeviceInfo,
  getDevice,
};
