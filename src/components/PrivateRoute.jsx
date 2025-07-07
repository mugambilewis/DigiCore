import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.user?.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
// This component checks if the user is logged in before allowing access to protected routes.
// If not logged in, it redirects to the login page.