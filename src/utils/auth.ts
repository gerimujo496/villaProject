import { jwtDecode, JwtPayload } from "jwt-decode";

interface ExtendedJwtPayload extends JwtPayload {
  email: string;
}

export const getTokenFromLocalStorage = () => {
  // const token = localStorage.getItem("token") || '';
  const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9naW4tYzE2ZTMiLCJhdWQiOiJsb2dpbi1jMTZlMyIsImF1dGhfdGltZSI6MTcyMTY4Njg4OSwidXNlcl9pZCI6IlVwMWpYcURzdDVmQ3Zzc1JpSVJ1WWtDVDgxRjIiLCJzdWIiOiJVcDFqWHFEc3Q1ZkN2c3NSaUlSdVlrQ1Q4MUYyIiwiaWF0IjoxNzIxNjg2ODg5LCJleHAiOjE3MjE2OTA0ODksImVtYWlsIjoiYmFuaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYmFuaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.O-2yfEH0Lcgwz5Uw1e4x1tiumgqkbbUuWcTXbNvE7dy_KwZYkMlVYzlBpvzJh0l6g3Rd89ATsxemJBOVUO_ku-AYt1SnsJ03sYEAaYnz1S87wqr6CTCv35X9fn1gbhLYbvkjjHVeg50UAVwQPQMj4W7wZbo13uRC_0D3o5slYfaYWF9LboKaOuX-tYMI2RzBglwoskFcCmuZ3CezP34Je3ETrYMn8gaoAuio0hFaEBh-i3Hf2NQgQWKX258JAkHA-js9IKZH2iLb-jJLomIy1K9lSOK_YoJ-OBvnUqTDiihSw9Bi7FSLslCPZ_xzqkDB2_DLS5BjcM0h84z8NhqYdA"
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
