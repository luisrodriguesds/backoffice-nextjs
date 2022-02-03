import { http } from '../../config/http-client';

// GET api/v1/featureTag/addon
const getAllFeatureTags = async () => {
  return await http.get('/featureTag/adddon');
}

// POST api/v1/featureTag/
const addNewFeatureTags = async (tags: string[]) => {
  return await http.post('/featureTag/adddon', tags);
}

export default {
  getAllFeatureTags,
  addNewFeatureTags
}
