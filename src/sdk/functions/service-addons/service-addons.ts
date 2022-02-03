import { SaveServiceAddonDto } from './../../models/interfaces/service-addon/SaveServiceAddonDto';
import {http} from '../../config/http-client';

// GET api/v1/service-addons
const getServiceAddons = async () => {
  return await http.get('/service-addons');
}

// GET api/v1/service-addons/{serviceUid}
const getServiceAddon = async (serviceUid: string) => {
  return await http.get(`service-addons/${serviceUid}`);
}

const getAddonsImages = async (id: string) => {
    return await http.get(`/images/view/${id}`);
  }

//POST /api/v1/service-addons/register
const registerService = async (request: any) => {
  return await http.post('/service-addons/register', request);
}

const getOpco = async () => {
  return await http.get('/opco');
}

// PUT api/v1/service-addons/{serviceUid}
const saveServiceAddon = async (serviceUid: string, serviceAddon: SaveServiceAddonDto) => {
  return await http.put(`service-addons/${serviceUid}`, serviceAddon)
}

//POST /api/v1/service-addons/register
const saveUnconfiguredAddon = async (serviceAddon: any) => {
  return await http.post('/service-addons', serviceAddon);
}



export default {
    getServiceAddons,
    getServiceAddon,
    saveServiceAddon,
    getAddonsImages,
    registerService,
    getOpco,
    saveUnconfiguredAddon
}
