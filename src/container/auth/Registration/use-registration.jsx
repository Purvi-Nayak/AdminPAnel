// use-registration.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  setUser,
  setToken,
  addToUsersList,
} from "../../../redux/slices/userSlice";
import { api } from "../../../api/client";
import { registerValidation } from "../../../utils/validation";

const useRegistration = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const checkExistingUser = async (email) => {
    try {
      const response = await api.USERS.getAll();
      return response.data?.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking existing user:", error);
      throw new Error("Failed to check existing user");
    }
  };

  const onSubmit = async (values) => {
    try {
      const userExists = await checkExistingUser(values.email);

      if (userExists) {
        setIsSuccess(false);
        setErrorMessage("User already exists");
        setAlertOpen(true);
        return;
      }

      const response = await api.USERS.register({
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          createdAt: new Date().toISOString(),
        },
      });

      const newUser = response.data;
      const token = btoa(
        JSON.stringify({
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        })
      );

      setIsSuccess(true);
      setSuccessMessage("Registration successful! Redirecting...");
      setAlertOpen(true);
      setErrorMessage("");

      dispatch(addToUsersList(newUser));
      dispatch(setUser(newUser));
      dispatch(setToken(token));

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setIsSuccess(false);
      setErrorMessage("Registration failed");
      setAlertOpen(true);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    alertOpen,
    setAlertOpen,
    errorMessage,
    successMessage,
    isSuccess,
  };
};

export default useRegistration;
