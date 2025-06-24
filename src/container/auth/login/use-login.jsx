// // use-login.jsx
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setUser, setToken, setError } from "../../../redux/slices/userSlice";
// import { api } from "../../../api/client";
// import { loginValidation } from "../../../utils/validation";

// const useLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [alertOpen, setAlertOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(loginValidation),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values) => {
//     try {
//       const response = await api.USERS.login({
//         data: {
//           email: values.email,
//           password: values.password,
//         },
//       });

//       if (!response.data || response.data.length === 0) {
//         setIsSuccess(false);
//         setAlertOpen(true);
//         return;
//       }

//       const users = response.data;
//       setSuccessMessage("login success");
//       setAlertOpen(true);

//       if (!users || users.length === 0) {
//         dispatch(setError("Invalid credentials"));
//         setAlertOpen(true);
//         return;
//       }

//       const user = users[0];
//       const token = btoa(
//         JSON.stringify({
//           id: user.id,
//           email: user.email,
//           role: user.role,
//         })
//       );

//       dispatch(setUser(user));
//       dispatch(setToken(token));
//       dispatch(setError(null));

//       setIsSuccess(true);
//       setAlertOpen(true);
//       navigate(user.role === "admin" ? "/admin" : "/");
//     } catch (error) {
//       console.error("Login error:", error);
//       setIsSuccess(false);
//       setAlertOpen(true);
//     }
//   };

//   return {
//     register,
//     handleSubmit,
//     errors,
//     isSubmitting,
//     alertOpen,
//     setAlertOpen,
//     errorMessage,
//     setErrorMessage,
//     successMessage,
//     setSuccessMessage,
//     rememberMe,
//     setRememberMe,
//     isSuccess,
//     setIsSuccess,
//     onSubmit,
//   };
// };

// export default useLogin;
// use-login.jsx
const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, "db.json");

// Helper function to read the database
const readDb = () => {
  try {
    return JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  } catch (error) {
    console.error("Error reading db.json:", error);
    return { users: [] }; // Return a default structure if file is empty or invalid
  }
};

// Helper function to write to the database (even if not used in this specific login-only logic, it's good practice to keep)
const writeDb = (data) => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
};

module.exports = (req, res, next) => {
  // --- LOGIN Logic ---
if (req.method === "POST" && req.url === "/login") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const db = readDb();
      const user = db.users.find(
        (u) => u.email === email && u.password === password // In real app, compare hashed passwords
      );

      if (user) {
        const { password, ...userWithoutPassword } = user; // Never send password to frontend

        // Hardcoded JWT for demonstration.
        const hardcodedToken =
          "token_demo";
        return res.status(200).json({
          message: "Login successful",
          token: hardcodedToken,
          user: userWithoutPassword,
        });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in login middleware: ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Pass all other requests to the next middleware/router
  next();
};

