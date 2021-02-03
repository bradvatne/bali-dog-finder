import axios from "axios";
import imageCompression from "browser-image-compression";

export default function uploadImage(initialFile, setImage, setImageLoading, imageLoading) {
  setImageLoading(true);
  imageCompression(initialFile, { maxWidthOrHeight: 250 })
    .then((blob) => {
      return imageCompression.getDataUrlFromFile(blob);
    })
    .then((compressedFile) => {
      return axios({
        url: "https://api.cloudinary.com/v1_1/ddkclruno/image/upload",
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        data: {
          file: compressedFile,
          upload_preset: process.env.CLOUDINARY_PRESET,
        },
      });
    })
    .then((res) => {
      localStorage.setItem("imageurl", res.data.url);
      localStorage.setItem('loading', 'false')
      setImageLoading(false)
      setImage(res.data.url);
    })
    .catch((err) => setImageLoading(false));
}
