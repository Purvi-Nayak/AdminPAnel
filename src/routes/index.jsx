import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layout/public-layout";
import PrivateLayout from "../layout/private-layout";
import useRoute from "../hooks/useroutes";
import NotFoundPage from "../pages/not-foundpage"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Routing = () => {
  const { privateRoutes, publicRoutes } = useRoute();
    const user = useSelector(state => state.users.user);
  const isAdmin = user?.role === 'admin';
  return (
    <>
      <Routes>

            {isAdmin && (
          <Route 
            path="/" 
            element={<Navigate to="/admin" replace />} 
          />
        )}
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<PublicLayout />}>
          {publicRoutes.map(({ id, element: Element, ...other }) => (
            <Route key={id} element={<Element />} {...other} />
          ))}
        </Route>

        <Route element={<PrivateLayout />}>
          {privateRoutes.map(({ id, element: Element, ...other }) => (
            <Route key={id} element={<Element />} {...other} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default Routing;