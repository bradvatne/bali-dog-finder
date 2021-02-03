import axios from "axios";
import imageCompression from "browser-image-compression";

export default async function uploadImage(initialFile) {
  const options = { maxSizeMB: 0.5, maxWidthOrHeight: 250 };
  imageCompression(initialFile, { options })
    .then((blob) => {
        return imageCompression.getDataUrlFromFile(blob)
    })
    .then((compressedFile) => {
      console.log(compressedFile)
      var formData = new FormData();
      return axios({
        url: "https://api.cloudinary.com/v1_1/ddkclruno/image/upload",
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        data: {
            "file": compressedFile,
            "upload_preset": process.env.CLOUDINARY_PRESET
        },
      });
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
