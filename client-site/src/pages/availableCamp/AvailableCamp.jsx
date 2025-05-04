import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BsLayoutSplit } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import { LuLayoutGrid } from 'react-icons/lu';
import notFoundIcon from '../../assets/not-available.jpg';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CampCard from '../../shared/campCard/CampCard';

const AvailableCamp = () => {
  const axiosPublic = useAxiosPublic();
  const [isLayout, setIsLayout] = useState(false);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const { loading } = useAuth();
  const { data: allCamps = [] } = useQuery({
    queryKey: ['availableCamp', category, search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allCamps?category=${category}&search=${search}`);
      return res.data;
    },
  });
  const handleResetFilter = () => {
    setCategory('');
    setSearch('');
  };
  // Pagination ===================
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = allCamps.slice(firstPostIndex, lastPostIndex);
  if (loading) return <LoadingSpinner />;
  return (
    <>
      <section className="container mx-auto py-5 px-2 lg:px-5 pt-[80px]">
        <div className="filter-box mb-8 flex flex-wrap items-center gap-3 sm:gap-5 md:gap-6">
          {/* Search Input */}
          <div className="relative rounded-lg min-w-[200px] max-w-[320px] flex items-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkCard transition-all duration-300 hover:shadow-sm">
            <input
              placeholder="Search for Camps"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="p-2.5 pl-3 pr-10 w-full text-sm bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
            />
            <div className="absolute right-3 text-gray-500 dark:text-gray-400">
              <IoIosSearch className="text-lg" />
            </div>
          </div>

          {/* Category Select */}
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkCard outline-none text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-sm"
            name="category"
            id="category"
            value={category}
            required>
            <option value="" disabled className="dark:bg-darkCard">
              Select by category
            </option>
            <option value="mostRegistered" className="dark:bg-darkCard">
              Most Registered
            </option>
            <option value="campFees" className="dark:bg-darkCard">
              Camp Fees
            </option>
            <option value="campName" className="dark:bg-darkCard">
              Camp Name A to Z
            </option>
          </select>

          {/* Layout Toggle Button */}
          <button
            onClick={() => setIsLayout(!isLayout)}
            className="hidden md:flex items-center gap-2 py-2 px-4 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkCard text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800">
            {isLayout ? (
              <>
                <BsLayoutSplit className="text-primary dark:text-secondary" />
                <span>Grid View</span>
              </>
            ) : (
              <>
                <LuLayoutGrid className="text-primary dark:text-secondary" />
                <span>List View</span>
              </>
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              handleResetFilter();
              setIsLayout(false);
            }}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkCard text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label="Reset filters">
            <GrPowerReset className="text-primary dark:text-secondary" />
          </button>
        </div>
        <div className={`grid gap-5 mb-10 grid-cols-1 sm:grid-cols-2 ${isLayout ? 'md:grid-cols-2 md:gap-20' : 'md:grid-cols-3'}`}>
          {currentPost?.map((item) => (
            <CampCard isLayout={isLayout} key={item._id} camp={item} />
          ))}
        </div>
        {allCamps.length > 9 && <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={allCamps?.length}></Pagination>}
        {allCamps?.length === 0 && (
          <div className="flex gap-2 font-medium pb-8 min-h-[200px] justify-center items-center">
            <img className="w-[20px] md:w-[30px]" src={notFoundIcon} alt="not Available" />
            <p className="text-xl md:text-2xl">Camps Not Found</p>
          </div>
        )}
      </section>
    </>
  );
};

export default AvailableCamp;
