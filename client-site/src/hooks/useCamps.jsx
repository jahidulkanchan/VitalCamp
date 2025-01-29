import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamps = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allCamps");
      return res.data;
    },
  });
  return [allCamps, isLoading, refetch];
}

export default useCamps;