import { Navigate, Outlet } from "react-router-dom";
import { isUserAuthenticated } from "../utils/auth";

function PrivateRoutes() {
  const isUserAuth = isUserAuthenticated();
  if (!isUserAuth) {
   
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default PrivateRoutes;
