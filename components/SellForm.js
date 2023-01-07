import React from "react";
import Controls from "../components/controls/Controls";
import { generate } from "randomstring";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { firestore, auth, storage, STATE_CHANGED } from "../lib/firebase";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import kebabCase from "lodash.kebabcase";
import useForm, { Form } from "./useForm";
import TextInput from "./controls/TextInput";
// import * as productCategoryService from "../services/productCategoryService";
import { getProductCategory } from "../data/productCategory";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import Loader from "./Loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../lib/context";

const shareToItems = [
  { id: "friends", title: "Friends" },
  { id: "public", title: "Public" },
];

const getUserName = async (uid) => {
  const userNameSnap = await getDoc(doc(getFirestore(), "users", uid));
  const userName = userNameSnap.data().username;
  return userName;
};

const initialFormData = {
  uid: "",
  username: "",
  postType: "sell",
  productCategory: "",
  imageURL: "",
  postTitle: "",
  slug: "",
  productDescription: "",
  price: "",
  shareTo: "",
  postEndDate: null,
  postStatus: "active",
  createdAt: null,
  updatedAt: null,
  queueCount: 0,
};

export default function SellForm() {
  const validate = (fieldValues = formData) => {
    let temp = { ...errors };
    if ("productCategory" in fieldValues) {
      temp.productCategory = fieldValues.productCategory ? "" : "Required";
    }
    if ("postTitle" in fieldValues) {
      temp.postTitle = fieldValues.postTitle ? "" : "Required";
    }
    if ("productDescription" in fieldValues) {
      temp.productDescription = fieldValues.productDescription
        ? ""
        : "Required";
    }
    if ("price" in fieldValues) {
      temp.price = /^[0-9]+$/.test(fieldValues.price) ? "" : "Required";
    }
    if ("shareTo" in fieldValues) {
      temp.shareTo = fieldValues.shareTo ? "" : "Required";
    }

    setErrors({ ...temp });

    // return true if no errors/ all values are "" in temp, false otherwise
    if (fieldValues == formData) {
      return Object.values(temp).every((x) => x == "");
    }
  };

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFormData, true, validate);
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    console.log(uid, username);
    getUserName(uid).then((userName) => {
      setFormData({ ...formData, uid, username: userName });
    });
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      const postRef = doc(
        getFirestore(),
        "users",
        auth.currentUser.uid,
        "posts",
        formData.slug
      );
      await setDoc(postRef, formData);
      toast.success("Post created");
      router.push(`/`);
    }
  };

  const [imageUploading, setImageUploading] = useState(false);
  const [imageProgress, setimageProgress] = useState(0);

  const uploadImageFile = async (e) => {
    e.preventDefault();
    // Get file
    console.log("object from uploadImageFile", e.target.files);
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    const fileRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setImageUploading(true);

    console.log("fileRef", fileRef);
    console.log("file", file);

    // starts the upload
    const task = uploadBytesResumable(fileRef, file);

    task.on(STATE_CHANGED, (snapshot) => {
      console.log("snapshot", snapshot);
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(2);
      setimageProgress(pct);
    });

    task
      .then((d) => getDownloadURL(fileRef))
      .then((url) => {
        setFormData({
          ...formData,
          imageURL: url,
        });
        setImageUploading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box>
      <Form onSubmit={createPost}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Box flex={1}>
            <Stack spacing={3}>
              <Box>
                <Loader show={imageUploading} />
                {imageUploading && <h3>{imageProgress}%</h3>}

                {!imageUploading && (
                  <>
                    <label htmlFor="img-button">
                      <input
                        id="img-button"
                        type="file"
                        onChange={uploadImageFile}
                        accept="image/x-png,image/gif,image/jpeg"
                      />
                      <Button variant="contained" component="span">
                        Upload Image
                      </Button>
                    </label>
                  </>
                )}
              </Box>
              {"" && FormData.imageURL}

              <Controls.Select
                name="productCategory"
                label="Product Category"
                value={formData.productCategory}
                onChange={handleInputChange}
                // options={productCategoryService.getProductCategory()}
                options={getProductCategory()}
                error={errors.productCategory}
              />

              <TextInput
                name="postTitle"
                label="Post Title"
                value={formData.postTitle}
                onChange={handleInputChange}
                error={errors.postTitle ? true : false}
              />

              <TextInput
                name="productDescription"
                label="Product Description"
                value={formData.productDescription}
                onChange={handleInputChange}
                error={errors.productDescription ? true : false}
                multiline
                rows={5}
              />
              <TextInput
                name="price"
                label="Price"
                value={formData.price}
                onChange={handleInputChange}
                error={errors.price}
                sx={{ width: "30%" }}
              />
              <Controls.RadioGroup
                name="shareTo"
                value={formData.shareTo}
                label="Share To"
                onChange={handleInputChange}
                error={errors.shareTo ? true : false}
                items={shareToItems}
              />
              <Controls.DatePicker
                name="postEndDate"
                value={formData.postEndDate}
                label="End Date (Optional)"
                onChange={handleInputChange}
                items={shareToItems}
                sx={{ width: "30%" }}
              />
            </Stack>
          </Box>
          <Box flex={1}>
            <Image
              src={formData.imageURL || "/product_placeholder.png"}
              alt="product image"
              height={500}
              width={500}
            />
          </Box>
        </Box>
        <Stack
          sx={{ float: "right", mr: 10, mt: 10 }}
          direction="row"
          spacing={2}
        >
          <Button variant="outlined" onClick={resetForm}>
            Reset
          </Button>
          <Button variant="contained" type="submit">
            Confirm
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}
