// use-login.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken, setError } from "../../../redux/slices/userSlice";
import { api } from "../../../api/client";
import { loginValidation } from "../../../utils/validation";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await api.USERS.login({
        data: {
          email: values.email,
          password: values.password,
        },
      });

      if (!response.data || response.data.length === 0) {
        setIsSuccess(false);
        setAlertOpen(true);
        return;
      }

      const users = response.data;
      setSuccessMessage("login success");
      setAlertOpen(true);

      if (!users || users.length === 0) {
        dispatch(setError("Invalid credentials"));
        setAlertOpen(true);
        return;
      }

      const user = users[0];
      const token = btoa(
        JSON.stringify({
          id: user.id,
          email: user.email,
          role: user.role,
        })
      );

      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setError(null));

      setIsSuccess(true);
      setAlertOpen(true);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.error("Login error:", error);
      setIsSuccess(false);
      setAlertOpen(true);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    alertOpen,
    setAlertOpen,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    rememberMe,
    setRememberMe,
    isSuccess,
    setIsSuccess,
    onSubmit,
  };
};

export default useLogin;
