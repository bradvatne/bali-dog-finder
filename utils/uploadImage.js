import axios from "axios";
import imageCompression from "browser-image-compression";

export default function uploadImage(initialFile, setImage, setImageLoading) {
  //Set state to loading for loading icon
  setImageLoading(true);
  //imageCompression on the file -> convert Blob to base64 -> send to api
  imageCompression(initialFile, { maxWidthOrHeight: 250 })
    //imageCompression returns a file of type Blob
    .then((blob) => {
      //Use imageCompression method to convert to base64
      return imageCompression.getDataUrlFromFile(blob);
    })
    //Finally can send file to Cloudinary server
    .then((compressedFile) => {
      return axios({
        url: process.env.CLOUDINARY_UPLOAD,
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        data: {
          file: compressedFile,
          upload_preset: process.env.CLOUDINARY_PRESET,
        },
      });
    })
    //Store url value in local storage for access when modal loads
    .then((res) => {
      localStorage.setItem("imageurl", res.data.url);
      localStorage.setItem('loading', 'false')
      //Image loading done
      setImageLoading(false)
      setImage(res.data.url);
    })
    //Catch errors
    .catch((err) => setImageLoading(false));
}
