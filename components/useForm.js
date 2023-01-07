import { Stack, TextField } from "@mui/material";
import { React, useState } from "react";
import kebabCase from "lodash.kebabcase";
import { generate } from "randomstring";
import { serverTimestamp } from "firebase/firestore";

export default function useForm(
  initialFValues,
  validateOnChange = false,
  validate
) {
  const [formData, setFormData] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name == "postTitle") {
      console.log("updating slug");
      setFormData({
        ...formData,
        slug: kebabCase(value) + "-" + generate(),
        [name]: value,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (validateOnChange) {
        validate({ [name]: value });
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFValues);
    setErrors({});
  };
  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export function Form(props) {
  const { children, ...other } = props;

  return <form {...other}>{props.children}</form>;
}
