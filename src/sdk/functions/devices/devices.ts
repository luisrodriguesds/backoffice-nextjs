import { AxiosResponse } from "axios";
import { http } from "../../config/http-client";
import { DeviceModel, DevicesContentModel, ProvisionInfoResponseModel } from "../../models/interfaces/devices/devices-models";

const getDevices = async () => {
  return await http.get("/devices");
};

const getDevicesByPage = async (pageNumber) => {
  return await http.get(`/devices?page=${pageNumber}&perPage=25`);
};

const getDevicesBySearch = async (search) => {
  return await http.get(`/devices?size=10&uid=${search}`);
};

const getDevicesSearchByModal = async (search) => {
  return await http.get(`/devices?${search}`);
};

const getProductsDeleted = () => {
  return http.get("/products/deleted");
};

const createDevice = (payload: DeviceModel) => {
  return http.post('/devices', payload);
}

const saveDevice = (deviceUid: string, payload: DevicesContentModel) => {
  return http.put(`/devices/${deviceUid}`, payload, {}, 2);
}

const getProvisioningInfo = (hardwareUid: string): Promise<AxiosResponse<ProvisionInfoResponseModel>> => {
  return http.get(`/hardware/${hardwareUid}/provisioningInfo`);
}

const deleteDevice = (deviceUid: string) => {
  return http.delete(`/devices/${deviceUid}`, {}, 2);
}

export default {
  getDevices,
  getDevicesByPage,
  getDevicesBySearch,
  getDevicesSearchByModal,
  createDevice,
  getProvisioningInfo,
  saveDevice,
  deleteDevice
};
