import { Navigate } from "react-router-dom";

export function PrivateRoute({ element }: any) {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" />;
}
