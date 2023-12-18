import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils"; // Import your utility function

const ProtectedRoute = ({ element } : any) => {
  const token = getToken();
  const location = useLocation();
  console.log(token, "token");
  if (token) { 
    // Check if user is authenticated
    console.log("Token Found")
    return element;
} else {
    // Redirect to login page and add the current page to state
    console.log("Token UnFound")
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
