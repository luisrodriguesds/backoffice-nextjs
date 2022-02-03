import { http } from "../../config/http-client";

const getProductCatalogueByCountry = async (id) => {
  return await http.get(`/producttoc/${id}`);
};

const getProductById = async (id) => {
  return await http.get(`/products/${id}`);
};

const getProductDeletedById = async (id) => {
  return await http.get(`/products/deleted/${id}`);
};

//POST /api/v1/service-addons/register

const registerSave = async (id: any, savedProduct) => {
  return await http.put(`/producttoc/${id}`, savedProduct);
};

const registerPublish = async (id: any, publishedProduct) => {
  return await http.put(`/products/productcatalogue/${id}`, publishedProduct);
};

export default {
  getProductCatalogueByCountry,
  registerSave,
  registerPublish,
  getProductById,
  getProductDeletedById,
};
