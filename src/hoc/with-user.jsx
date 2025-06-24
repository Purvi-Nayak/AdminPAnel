import { Navigate } from "react-router-dom";
import { URLS } from "../constant/urls";
import { useSelector } from "react-redux";

const withUser = (Component) => {
  return (props) => {
    const isLoggedin = useSelector((state) => state.users.isLoggedin);
    return isLoggedin ? (
      <Component {...props} />
    ) : (
      <Navigate to={URLS.LOGIN} replace />
    );
  };
};

export default withUser;