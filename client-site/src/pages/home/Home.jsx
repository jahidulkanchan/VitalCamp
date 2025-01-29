import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";
import AllFeedBack from "./AllFeedBack";
import Banner from "./Banner";
import FaqItems from "./FaqItems";
import PopularCamp from "./PopularCamp";

const Home = () => {
  const {loading} = useAuth()
  if(loading) return <LoadingSpinner/>
  return (
    <>
      <Banner/>
      <PopularCamp/>
      <AllFeedBack/>
      <FaqItems/>
    </>
  );
};

export default Home;