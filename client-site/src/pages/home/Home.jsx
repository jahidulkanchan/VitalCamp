import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";
import AboutUs from "./AboutUs";
import AllFeedBack from "./AllFeedBack";
import Banner from "./Banner";
import Contact from "./Contact";
import FaqItems from "./FaqItems";
import PopularCamp from "./PopularCamp";
import PopularHealthCare from "./PopularHealthCare";
import Subscribe from "./Subscribe";

const Home = () => {
  const {loading} = useAuth()
  if(loading) return <LoadingSpinner/>
  return (
    <>
      <Banner/>
      <PopularCamp/>
      <PopularHealthCare/>
      <AboutUs/>
      <FaqItems/>
      <AllFeedBack/>
      <Contact/>
      <Subscribe/>
    </>
  );
};

export default Home;