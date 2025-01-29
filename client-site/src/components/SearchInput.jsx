/* eslint-disable react/prop-types */
// import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
const SearchInput = ({setSearchText}) =>{
  return (
    <>
      <div className="search rounded min-w-[250px] md:min-w-[320px] mb-5 flex items-center gap-2 pr-4 border border-slate-400 bg-white">
      <div className="relative">
        <input
          placeholder='Search Camps'
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2  min-w-[250px] md:min-w-[320px] text-sm bg-transparent outline-none"
          type="text"
        />
        <div className="icon text-lg absolute top-2 -right-2 md:right-0">
          <IoIosSearch />
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchInput;