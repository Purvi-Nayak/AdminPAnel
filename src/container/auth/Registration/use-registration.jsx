// // use-registration.jsx
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// import {
//   setUser,
//   setToken,
//   addToUsersList,
// } from "../../../redux/slices/userSlice";
// import { api } from "../../../api/client";
// import { registerValidation } from "../../../utils/validation";

// const useRegistration = () => {
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(registerValidation),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: "user",
//     },
//   });

//   const checkExistingUser = async (email) => {
//     try {
//       const response = await api.USERS.getAll();
//       return response.data?.some(
//         (user) => user.email.toLowerCase() === email.toLowerCase()
//       );
//     } catch (error) {
//       console.error("Error checking existing user:", error);
//       throw new Error("Failed to check existing user");
//     }
//   };

//   const onSubmit = async (values) => {
//     try {
//       const userExists = await checkExistingUser(values.email);

//       if (userExists) {
//         setIsSuccess(false);
//         setErrorMessage("User already exists");
//         setAlertOpen(true);
//         return;
//       }

//       const response = await api.USERS.register({
//         data: {
//           name: values.name,
//           email: values.email,
//           password: values.password,
//           role: values.role,
//           createdAt: new Date().toISOString(),
//         },
//       });

//       const newUser = response.data;
//       const token = btoa(
//         JSON.stringify({
//           id: newUser.id,
//           email: newUser.email,
//           role: newUser.role,
//         })
//       );

//       setIsSuccess(true);
//       setSuccessMessage("Registration successful! Redirecting...");
//       setAlertOpen(true);
//       setErrorMessage("");

//       dispatch(addToUsersList(newUser));
//       dispatch(setUser(newUser));
//       dispatch(setToken(token));

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       console.error("Registration error:", error);
//       setIsSuccess(false);
//       setErrorMessage("Registration failed");
//       setAlertOpen(true);
//     }
//   };

//   return {
//     register,
//     handleSubmit,
//     errors,
//     isSubmitting,
//     onSubmit,
//     alertOpen,
//     setAlertOpen,
//     errorMessage,
//     successMessage,
//     isSuccess,
//   };
// };

// export default useRegistration;
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
import { registerValidation } from "../../../utils/validation"; // Assuming this path is correct

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
      // In a real application, this check would be done server-side before registration.
      // For JSON Server, we'll fetch all users and check
      const response = await api.USERS.getAll(); // Assuming api.USERS.getAll fetches all users
      return response.data?.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking existing user:", error);
      // It's better to return false or rethrow a specific error if the check itself failed
      throw new Error("Failed to check existing user data.");
    }
  };

  const onSubmit = async (values) => {
    try {
      const userExists = await checkExistingUser(values.email);

      if (userExists) {
        setIsSuccess(false);
        setErrorMessage("User already exists with this email.");
        setAlertOpen(true);
        return;
      }

      // Assuming api.USERS.register sends a POST request to create a new user
      const response = await api.USERS.register({
        data: {
          name: values.name,
          email: values.email,
          password: values.password, // In a real app, hash this before sending!
          role: values.role,
          createdAt: new Date().toISOString(),
        },
      });

      const newUser = response.data; // Assuming response.data is the newly created user object
      
      // Generating token consistently with auth.cjs for demo purposes.
      // In a real app, the token would come from the server after registration or login.
      const tokenPayload = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Example expiration
      };
      const token = btoa(JSON.stringify(tokenPayload));
console.log(token)

      setIsSuccess(true);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setAlertOpen(true);
      setErrorMessage("");

      // Dispatch user and token to Redux store
      dispatch(addToUsersList(newUser)); // Assuming you want to add the new user to a list
      dispatch(setUser(newUser)); // Set the currently logged-in user (though they need to login properly)
      dispatch(setToken(token)); // Store the token

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Registration error:", error);
      setIsSuccess(false);
      setErrorMessage(error.response?.data?.error || "Registration failed. Please try again.");
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