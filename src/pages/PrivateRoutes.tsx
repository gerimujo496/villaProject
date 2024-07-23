import { Navigate, Outlet } from "react-router-dom";
import {isUserAuthenticated } from "../utils/auth";

function PrivateRoutes() {
  const isUserAuth = isUserAuthenticated();

  if (isUserAuth) { // change it later to !
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default PrivateRoutes;
