import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUpload = async (image) => {
  if (!image) return "";
  //   Upload data
  try {
    // Follow theo cloudinary documentation
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    //Gui data về sever
    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    // data trả về
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
