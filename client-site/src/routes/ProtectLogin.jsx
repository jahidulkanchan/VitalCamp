import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

// eslint-disable-next-line react/prop-types
const ProtectLogin = ({children}) => {
  const {user,loading} = useAuth()
  const location = useLocation()
  if (loading) {
    return <LoadingSpinner/>
  }
  if (user) {
    return <Navigate to={location?.state || "/"} />;
  }
  return children;
};

export default ProtectLogin;