import { Navigate } from "react-router-dom";



export function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" />;
}
