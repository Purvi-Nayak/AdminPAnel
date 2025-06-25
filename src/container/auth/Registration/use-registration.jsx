import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { addToUsersList } from "../../../redux/slices/userSlice";
import { api } from "../../../api/client";
import { registerValidation } from "../../../utils/validation";
import { fetchUsers } from "../../../redux/slices/userSlice";


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

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const checkExistingUser = async (email) => {
    try {
    
      const response = await api.USERS.getAll();
      console.log(response)
      return response.data?.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
    } catch (error) {
      throw new Error("Failed to check existing user data.");
    }
  };

  const onSubmit = async (values) => {
    try {
      const userExists = await checkExistingUser(values.email);

      if (userExists) {
        setIsSuccess(false);
        // setErrorMessage("User already exists with this email.");
        setAlertOpen(true);
        return;
      }

      // Register the user
      const response = await api.USERS.register({
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        },
      });
console.log(response);
      if (response.status === 201 || response.status === 200) {
        dispatch(addToUsersList(response.data));
        setIsSuccess(true);
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setIsSuccess(false);
        setAlertOpen(true);
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage("Registration error.");
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
    isSuccess,
    setIsSuccess,
    onSubmit,
  };
};

export default useRegistration;
