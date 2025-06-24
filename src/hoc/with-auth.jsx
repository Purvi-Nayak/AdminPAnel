import { Navigate } from "react-router-dom";
import { URLS } from "../constant/urls";
import { useSelector } from "react-redux";

const withAuth = (Component) => {
  return (props) => {
    const isLoggedin = useSelector((state) => state.users.isLoggedin);
    return isLoggedin ? (
      <Navigate to={URLS.INITIAL} replace />
    ) : (
      <Component {...props} />
    );
  };
};

export default withAuth;