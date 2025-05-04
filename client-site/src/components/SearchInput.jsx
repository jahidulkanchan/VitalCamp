/* eslint-disable react/prop-types */
// import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from 'react-icons/io';
const SearchInput = ({ setSearchText }) => {
  return (
    <>
      <div className="search rounded min-w-[250px] md:min-w-[320px] mb-5 flex items-center gap-2 pr-4 border border-slate-400 dark:border-gray-600 bg-white dark:bg-darkBg transition">
        <div className="relative w-full">
          <input
            placeholder="Search Camps"
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-2 text-sm bg-transparent text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none"
            type="text"
          />
          <div className="icon text-lg absolute top-2 right-2 text-gray-600 dark:text-gray-300">
            <IoIosSearch />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
