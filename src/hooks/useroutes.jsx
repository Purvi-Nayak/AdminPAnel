import { useMemo } from "react";
import { URLS } from "../constant/urls";
import Dashboard from "../pages/user-dashboard";
import Login from "../container/auth/login";
import Register from "../container/auth/Registration";
import Tasks from "../pages/Task";
import Users from "../pages/user";
import ForgotPasswod from "../container/auth/ForgetPassword";
import AdminDashboard from "../pages/admin-dashboard";
import Setting from "../pages/user-setting";


const useRoute = () => {
  const allRoutes = useMemo(
    () => [
      {
        id: "login",
        path: URLS.LOGIN,
        element: Login,
        isPublic: true,
      },
      {
        id: "register",
        path: URLS.REGISTER,
        element: Register,
        isPublic: true,
      },
      {
        id: "forgotPassword",
        path: URLS.FORGOTPASSWORD,
        element: ForgotPasswod,
        isPublic: true,
      },
      {
        id: "root",
        path: URLS.INITIAL,
        element: Dashboard,
        isPrivate: true,
      },
      {
        id: "admin-dashboard",
        path: URLS.ADMIN,
        element: AdminDashboard,
        isPrivate: true,
     
      },
      {
        id: "tasks",
        path: URLS.TASKS,
        element: Tasks,
        isPrivate: true,
      },
      {
        id: "users",
        path: URLS.USERS,
        element: Users,
        isPrivate: true,
      },
      {
        id: "settings",
        path: URLS.SETTINGS,
        element: Setting,
        isPrivate: true,
      },
      // {
      //   id:"reset",
      //   path:URLS.RESET,
      //   element: Reset,
      //   isPrivate:true
      // }
    ],
    []
  );

  const privateRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPrivate),
    [allRoutes]
  );
  console.log("Private Routes:", privateRoutes);

  const publicRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPublic),
    [allRoutes]
  );
  console.log("Public Routes:", publicRoutes);
  return { privateRoutes, publicRoutes };
};

export default useRoute;
