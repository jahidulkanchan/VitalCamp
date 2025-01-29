import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider";

export const useAuth = ()=>{
  const auth = useContext(AuthContext);
  return auth;
}