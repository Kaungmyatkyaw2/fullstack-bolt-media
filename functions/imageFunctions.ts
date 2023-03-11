import { storage } from "../lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const uploadImage = async (file: File, previewUrl: string) => {
  const imageRef = ref(storage, `${previewUrl + Date.now()}`);
  return uploadBytes(imageRef, file).then(() => {
    return getDownloadURL(imageRef);
  });
};

export const deleteImage = async (image: string) => {
  const storageRef = ref(storage, image);
  return deleteObject(storageRef);
};
