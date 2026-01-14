import { Outlet } from "react-router";
/*import { useAuth } from "../contexts";
import { Loading } from "../components";*/

const ProtectedLayout = () => {
  //const location = useLocation();

  /*const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  return !loading && !isAuthenticated ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );*/
  // Temporary allow all routes for testing without authentication
  return <Outlet />;
};

export default ProtectedLayout;
