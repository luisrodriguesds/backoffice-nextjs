import { http } from '../../config/http-client';

const getProductById = async (id) => {
    return await http.get(`/products/${id}`);
}

const getHardwareList = async () => {
    return await http.get('/hardware/list');
}

//POST /api/v1/service-addons/register

const registerService = async (request: any) => {
    return await http.post('/products/register', request);
}

//PUT /api/v1/products/productId

const saveProduct = async (productId: string, product: any) => {
  return await http.put(`/products/${productId}`, product)
}

//POST /api/v1/products/${productID}/delete
const deleteProduct = async (productId: string) => {
  return await http.post(`/products/${productId}/delete`)
}

//Post /api/v1/products
const createProduct = async (payload: any) => {
  return await http.post('/products', payload);
}

export default {
    getProductById,
    getHardwareList,
    registerService,
    saveProduct,
    deleteProduct,
    createProduct
}
