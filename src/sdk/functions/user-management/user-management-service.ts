import { http } from '../../config/http-client';

// GET /api/v1/users

const getUserList = async () => {
  return await http.get('/users');
};

export default { getUserList };
