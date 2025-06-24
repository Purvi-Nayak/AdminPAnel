import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { forgetPasswordValidation } from "../../../utils/validation";
import { api } from "../../../api/client";

export const useForgetPassword = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(forgetPasswordValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const usersResponse = await api.USERS.getUsers({
        params: {
          email: values.email,
        },
      });

      const user = usersResponse.data?.[0];

      if (!user) {
        setErrorMessage("No account found with this email address.");
        setAlertOpen(true);
        return;
      }

      const response = await api.USERS.updateUser({
        userId: user.id,
        data: {
          ...user,
          password: values.password,
          updatedAt: new Date().toISOString(),
        },
      });

      if (response.data) {
        setSuccessMessage(
          "Password has been reset successfully. Please login with your new password."
        );
        setAlertOpen(true);
        reset();
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
      setAlertOpen(true);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    alertOpen,
    setAlertOpen,
    successMessage,
    errorMessage,
  };
};
