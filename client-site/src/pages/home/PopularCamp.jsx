import { useEffect, useState } from "react";
import useCamps from "../../hooks/useCamps";
import CampCard from "../../shared/campCard/CampCard";
import { Link } from "react-router-dom";


const PopularCamp = () => {
  const [allCamps] = useCamps()
  const [popularCamp,setPopularCamp] =useState()
  useEffect(()=>{
    const sorted = [...allCamps].sort((a, b) => b.participantCount - a.participantCount).slice(0, 6);
    setPopularCamp(sorted);
  },[allCamps])
  return (
    <>
      <section className="container bg-white dark:bg-darkBg py-10 px-5 mx-auto">
        <h2 className="text-center py-5 text-2xl md:text-4xl text-black dark:text-white">Most Popular Medical Camps</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
          {popularCamp?.map((item, i) => (
            <CampCard key={i} camp={item}></CampCard>
          ))}
        </div>
        <div onClick={() => window.scrollTo(0, 0)} className="w-fit mx-auto mt-10">
          <Link className="text-white bg-primary px-5 py-2 rounded hover:bg-secondary" to="/availableCamp">
            See All Camps
          </Link>
        </div>
      </section>
    </>
  );
};

export default PopularCamp;