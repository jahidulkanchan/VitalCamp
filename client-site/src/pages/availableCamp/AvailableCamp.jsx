import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";
import CampCard from "../../shared/campCard/CampCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoIosSearch } from "react-icons/io";
import { BsLayoutSplit } from "react-icons/bs";
import { LuLayoutGrid } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import notFoundIcon from "../../assets/not-available.jpg"
import Pagination from "../../components/Pagination";


const AvailableCamp = () => {
  const axiosPublic = useAxiosPublic()
  const [isLayout,setIsLayout] = useState(false)
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const {loading} = useAuth()
  const {data: allCamps=[]} = useQuery({
    queryKey: ['availableCamp', category ,search],
    queryFn: async()=>{
      const res = await axiosPublic.get(`/allCamps?category=${category}&search=${search}`)
      return res.data
    }
  })
  const handleResetFilter = () => {
    setCategory("");
    setSearch("");
  };
  // Pagination ===================
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(9)
  const lastPostIndex = currentPage*postPerPage 
  const firstPostIndex = lastPostIndex - postPerPage 
  const currentPost = allCamps.slice(firstPostIndex,lastPostIndex)
  if(loading) return <LoadingSpinner/>
  return (
    <>
      <section className="container mx-auto py-5 px-2 lg:px-5 mt-[100px]">
      <div className="filter-box mb-5 flex md:justify-center flex-wrap gap-2 sm:gap-5 md:gap-7">
              <div className="search relative rounded min-w-[200px] max-w-[320px] flex items-center gap-2 pr-4 border bg-white w-fit">
                <div className="">
                  <input
                    placeholder="Search for Camps"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className="p-2 text-sm bg-transparent outline-none"
                    type="text"
                  />
                  <div className="icon text-lg absolute top-2 right-2">
                    <IoIosSearch />
                  </div>
                </div>
              </div>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 text-sm rounded border w-fit outline-none bg-white"
                name="category"
                id="category"
                value={category}
                required
              >
                <option value="" disabled>
                  Select by category
                </option>
                <option value="mostRegistered">Most Registered</option>
                <option value="campFees">Camp Fees</option>
                <option value="campName">Camp Name A to Z</option>
              </select>
              <button
                onClick={()=>setIsLayout(!isLayout)}
                className="py-2 hidden md:inline-block text-sm rounded px-4 border">
                {isLayout? <p className="flex items-center gap-2"><BsLayoutSplit /> 2 Layout</p> : <p className="flex items-center gap-2"><LuLayoutGrid /> 3 Layout</p>}
              </button>
              <button
                onClick={()=>{
                  handleResetFilter()
                  setIsLayout(false)
                }}
                className="py-2 text-sm px-3 w-fit rounded border bg-white outline-none"
              >
                <GrPowerReset />
              </button>
      </div>
      <div className={`grid gap-5 mb-10 grid-cols-1 sm:grid-cols-2 ${isLayout? 'md:grid-cols-2 md:gap-20' : 'md:grid-cols-3'}`}>
        {currentPost?.map(item=> <CampCard isLayout={isLayout} key={item._id} camp={item} /> )}
      </div>
      {allCamps.length > 9 && (
             <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={allCamps?.length}></Pagination>
        )}
      {allCamps?.length === 0 && <div className="flex gap-2 font-medium pb-8 min-h-[200px] justify-center items-center">
        <img className="w-[20px] md:w-[30px]" src={notFoundIcon} alt="not Available" />
        <p className="text-xl md:text-2xl">Camps Not Found</p>
      </div> }
      </section>
    </>
  );
};

export default AvailableCamp;