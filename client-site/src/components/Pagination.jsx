/* eslint-disable react/prop-types */

import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({setCurrentPage,currentPage,postPerPage,allDataCamp}) => {
  let pages = []
  for(let i = 1; i <= Math.ceil(allDataCamp/postPerPage); i++){
    pages.push(i)
  }
  return (
    <>
       <div className="overflow-x-scroll mt-5 md:mt-8 flex justify-center items-center sm:overflow-hidden">
                  <div className="pagination flex gap-4 md:gap-5">
                  <button
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    className="px-3 rounded md:px-5  flex items-center border border-primary text-primary hover:bg-primary hover:text-white"
                  >
                   <span><MdKeyboardDoubleArrowLeft /></span>  Prev
                  </button>
                  {pages.map((page, i) => (
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`border rounded border-primary text-primary hover:bg-primary hover:text-white duration-100 px-3 md:px-5 ${
                        currentPage === page ? "bg-primary text-white" : ""
                      }`}
                      key={i}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      currentPage < pages.length &&
                      setCurrentPage(currentPage + 1)
                    }
                    className="px-3 md:px-5 rounded flex items-center border border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Next <span><MdKeyboardDoubleArrowRight /></span>
                  </button>
                </div>
        </div>
    </>
  );
};

export default Pagination;