import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactElement; // Specify the type for the element prop
}

export function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" />;
}
