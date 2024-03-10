import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils"; // Import your utility function

const ProtectedRoute = ({ element } : any) => {
  const token = getToken();
  const location = useLocation();
  if (token) { 
    // Check if user is authenticated
    return element;
} else {
    // Redirect to login page and add the current page to state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
