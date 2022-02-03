import { http } from './../../config/http-client';

// GET /api/v1/hardware/list

const getHardwareList = async () => {
    return await http.get('/hardware/list');
}

// PUT /api/v1/hardware/{id}/edit

// TODO review if everything is correct with this call
const updateHardware = async (id: string, body: any) => {
    return await http.put(`/hardware/${id}/edit`, body)
}

// GET /api/v1/plugins/{hardwareUid}/recipes

// TODO service call is retrieving BAD_REQUEST: 'Missing headers Accept-Language' 
const getHardwareRecipes = async (hardwareUid: string) => {
    return await http.get(`/plugins/${hardwareUid}/recipes`);
}

// GET /api/v1/plugins/{hardwareUid}/recipes/{recipeAction}/history

// TODO review what recipeAction type is
const getHardwareRecipeActionHistory = async (hardwareUid: string, recipeAction: any) => {
    return await http.get(`/plugin/${hardwareUid}/recipes/${recipeAction}/history`);
}

// POST /api/v1/plugins/{hardwareUid}/recipes/{recipeAction}/rollback

// TODO review what recipeAction type is
const rollbackRecipeAction = async (hardwareUid: string, recipeAction: any) => {
    return await http.post(`/plugins/${hardwareUid}/recipes/${recipeAction}/rollback`);
}

// POST /api/v1/plugins/{hardwareUid}/recipes

// TODO review what recipes type is
const updateHardwareRecipes = async (hardwareUid: string, recipes: any) => {
    return await http.post(`/plugins/${hardwareUid}/recipes`, recipes);
}

export default {
    getHardwareList,
    getHardwareRecipes,
    getHardwareRecipeActionHistory,
    updateHardware,
    updateHardwareRecipes,
    rollbackRecipeAction
}