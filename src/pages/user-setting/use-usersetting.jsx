// use-usersetting.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../api/client";
import { logout } from "../../redux/slices/userSlice";
import { adminSettingsSchema } from "../../utils/validation";

const useUserSetting = () => {
  const currentUser = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(adminSettingsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.USERS.getUsers();
      const currentUserData = response.data.find(
        (user) => user.id === currentUser.id
      );

      if (
        !currentUserData ||
        currentUserData.password !== data.currentPassword
      ) {
        setErrorMessage("Current password is incorrect");
        return;
      }

      const { currentPassword, ...rest } = currentUserData;
      const updateResponse = await api.USERS.update({
        userId: currentUser.id,
        data: {
          ...rest,
          password: data.newPassword,
          updatedAt: new Date().toISOString(),
        },
      });

      if (updateResponse.data) {
        setSuccessMessage("Password updated successfully! Please login again.");
        setTimeout(() => {
          dispatch(logout());
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to update password");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    errorMessage,
    setErrorMessage,
    successMessage,
    onSubmit,
  };
};

export default useUserSetting;
