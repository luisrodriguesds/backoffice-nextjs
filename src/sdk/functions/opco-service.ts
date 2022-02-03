import { http } from "../config/http-client";

// GET /api/v1/users

const getOpco = async () => {
  return await http.get("/opco");
};

export default { getOpco };
