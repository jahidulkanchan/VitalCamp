import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const {data: isAdmin={}, isPending: isAdminLoading} = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async()=>{
       const {data} = await axiosSecure.get(`/users/admin/${user?.email}`)
       return data?.admin;
    }
  })
  return [isAdmin , isAdminLoading]
};

export default useAdmin;