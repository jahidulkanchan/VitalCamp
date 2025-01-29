/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminRoute = ({children}) => {
  const {user,loading} = useAuth()
  const location = useLocation()
  const [isAdmin,isAdminLoading] = useAdmin()
  if(loading || isAdminLoading) return <LoadingSpinner/>
  if(user && isAdmin){
    return children
  }
  return <Navigate to='/dashboard/userHome' state={location?.pathname} ></Navigate>
};

export default AdminRoute;