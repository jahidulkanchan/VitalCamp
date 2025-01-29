import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
  const location = useLocation()
  const {user,loading} = useAuth()
  if(loading) return <LoadingSpinner/>
  if(user) return children;
  return <Navigate to='/' state={location?.pathname}></Navigate>
};

export default PrivateRoute;