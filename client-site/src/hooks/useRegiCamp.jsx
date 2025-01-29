import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useRegiCamp = ({ searchText = '' } = {}) => {
  const axiosSecure = useAxiosSecure() 
  const {data: regiCampsData = [], refetch,isLoading} = useQuery({
    queryKey: ["regiCampsBoth", searchText],
    queryFn: async()=> {
      const res = await axiosSecure.get(`/regiCamps?search=${searchText}`);
      return res.data;
    }
  }) 
  return [regiCampsData, refetch, isLoading] ;
};

export default useRegiCamp;