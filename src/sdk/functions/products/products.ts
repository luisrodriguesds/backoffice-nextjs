import { http } from "../../config/http-client";
import { ProductCountryModel } from "../../models/interfaces/products/products-models";

type GetProducts = {
  hardwareUid?: string;
};
const getProducts = async ({ hardwareUid = "" }: GetProducts = {}) => {
  let res = await http.get("/products");
  if (!res.data.length) {
    return res;
  }

  if (hardwareUid) {
    const products = res.data.filter(
      (prod) => prod.hardware[0]?.hardwareUid === hardwareUid
    );
    return {
      ...res,
      data: products,
    };
  }

  return res;
};

const getProductsDeleted = async () => {
  return await http.get("/products/deleted");
};

const getProductsImages = async (id: string) => {
  return await http.get(`/images/view/${id}`);
};

//POST /api/v1/service-addons/register

const registerService = async (request: any) => {
  return await http.post("/products/register", request);
};

const getOpco = async () => {
  return await http.get("/opco");
};

const getCountrySpecificInfo = async (id: string, opco: string) => {
  return await http.get(`/products/${id}/country-specific-info/${opco}`);
};

// Post /api/v1/hardware/${hardwareUid}/productInfo
const getProductInfo = async (
  hardwareUid: string,
  country: ProductCountryModel
) => {
  return await http.post(`/hardware/${hardwareUid}/productInfo`, country);
};

// Get /v1/payment-partners
const getPaymentPartners = async () => {
  return await http.get("/payment-partners");
};

export default {
  getProducts,
  getProductsDeleted,
  getProductsImages,
  registerService,
  getOpco,
  getCountrySpecificInfo,
  getProductInfo,
  getPaymentPartners,
};
