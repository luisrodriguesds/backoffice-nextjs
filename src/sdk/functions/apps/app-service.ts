import {http} from '../../config/http-client';

// GET /api/v1/apps

const getAllApps = async () => {
  return await http.get('/apps');
}

const getApp = async (id: string) => {
  return await http.get(`/apps/${id}`);
}

const getAppImg = async (id: string) => {
  return await http.get(`/images/view/${id}`);
}

const addApp = async (body: any) => {
  return await http.post(`/apps`, body);
}

const editApp = async (id: string, body: any) => {
  return await http.put(`/apps/${id}`, body);
}


export default {
  getAllApps,
  getApp,
  getAppImg,
  addApp,
  editApp
}
