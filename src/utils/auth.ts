import { jwtDecode, JwtPayload } from "jwt-decode";

interface ExtendedJwtPayload extends JwtPayload {
  email: string;
}

export const getTokenFromLocalStorage = ():ExtendedJwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const decoded: ExtendedJwtPayload = jwtDecode(token);
  return decoded;
};

export const isUserAuthenticated = () => {
  const tokenData = getTokenFromLocalStorage();
  if (!tokenData || !tokenData.exp) {
    return false; // Token or expiration time not found, assume not authenticated
  }
  const { exp: dateInSeconds } = tokenData;
  const currentSeconds = Math.floor(Date.now() / 1000); // Current time in seconds

  if (dateInSeconds > currentSeconds) {
    return true; // Token is still valid
  }

  return false; // Token has expired
};

export const isAdminAuthenticated = () => {
  const tokenData = getTokenFromLocalStorage();
  if (!tokenData || !tokenData.email) {
    return false; // Token or expiration time not found, assume not authenticated
  }

  if (tokenData.email.includes("admin")) {
    return true;
  }

  return false;
};
