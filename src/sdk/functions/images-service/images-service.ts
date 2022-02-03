import { http } from "./../../config/http-client";

// POST /api/v1/images

const postImage = async (image) => {
  const fd = new FormData();
  fd.append("file", image);
  return await http.post("/images", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const postImageV2 = async (image, metadata?: Object, category?: string) => {
  const fd = new FormData();
  // if(metadata) {
  //   fd.append('metadatas', JSON.stringify(metadata))
  // }
  // console.log(fd)
  fd.append("file", image);
  return await http.post(
    "/images",
    fd,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        category: category ? category : "avatar",
      },
    },
    2
  );
};

// GET /api/v1/images/view/{imageId}
const getImageViewUrl = async (imageId: string) => {
  return await http.get(`/images/view/${imageId}`);
};

export default {
  postImage,
  postImageV2,
  getImageViewUrl,
};
