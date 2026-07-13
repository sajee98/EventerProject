import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserProtectedRoute = () => {

  const { user, loading } = useAuth();


  // Wait until checking cookie is finished
  if (loading) {
    return <div>Loading...</div>;
  }


  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  // Allow logged-in users
  return <Outlet />;
};


export default UserProtectedRoute;