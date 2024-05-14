import { storage } from "../../firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const useFirebase = () => {
  let progressCallback: ((progress: number) => void) | null = null;

  const setProgressCallback = (callback: (progress: number) => void) => {
    progressCallback = callback;
  };

  const uploadFile = (imageFile: File, location: string) => {
    return new Promise((resolve, reject) => {
      if (imageFile) {
        const name = imageFile.name;
        const storageRef = ref(storage, `images/${location}/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progressCallback) {
              progressCallback(progress);
            }
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url: string) => {
                resolve(url);
              })
              .catch((error) => {
                reject(error.message);
              });
          }
        );
      } else {
        reject("no file");
      }
    });
  };

  const deleteFile = (location: string) => {
    const desertRef = ref(storage, location);
    deleteObject(desertRef)
      .then(() => {
        return "success";
      })
      .catch((error) => {
        return error.message;
      });
  };

  return {
    uploadFile,
    deleteFile,
    setProgressCallback,
  };
};

export default useFirebase;
