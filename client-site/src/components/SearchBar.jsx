/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsLayoutSplit } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { LuLayoutGrid } from "react-icons/lu";

const SearchBar = ({isLayout,setIsLayout,category,setCategory}) => {
  const [search, setSearch] = useState("");
  return (
    <>
      {/* <div className="filter-box mb-5 flex md:justify-center flex-wrap gap-5 md:gap-7">
          <div className="search rounded max-w-[320px] flex items-center gap-2 pr-4 border bg-white w-fit">
            <div className="relative">
              <input
                placeholder="Search Camps"
                // onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="p-2 text-sm bg-transparent outline-none"
                type="text"
              />
              <div className="icon text-lg absolute top-2 right-0">
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
           className="py-2 text-sm rounded px-4 border">
            {isLayout? <p className="flex items-center gap-2"><BsLayoutSplit /> 2 Layout</p> : <p className="flex items-center gap-2"><LuLayoutGrid /> 3 Layout</p>}
          </button>
          <button
            className="py-2 text-sm px-3 w-fit rounded border bg-white outline-none"
          >
           <GrPowerReset />
          </button>
      </div> */}
    </>
  );
};

export default SearchBar;