import React from "react";
import { useState } from "react";
import { auth, storage, STATE_CHANGE } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from "./Loader";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadFile = async (e) => {
    // Get file
    console.log("object from uploadfile", e.target.files);
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    const fileRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // starts the upload
    const task = uploadBytesResumable(fileRef, file);

    task.on(STATE_CHANGE, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(2);
      setProgress(pct);
    });

    task
      .then((d) => getDownloadURL(fileRef))
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="btn">
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}
      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}
