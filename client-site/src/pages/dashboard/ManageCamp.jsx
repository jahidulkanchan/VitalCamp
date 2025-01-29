import { FaHashtag, FaLocationDot } from "react-icons/fa6";
import { MdDeleteForever, MdOutlineSettings } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaEdit, FaUserAlt, FaUserMd } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import Pagination from "../../components/Pagination";


const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText,setSearchText] = useState('')
  const {
    data: campaign = [],
    refetch,
  } = useQuery({
    queryKey: ["adminAllCamps",searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminAllCamps?search=${searchText}`);
      return res.data;
    },
  });
  const handleDeleteCamp = async(id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/allCamps/${id}`)
    .then((res)=>{
      if(res.data.deletedCount > 0){
        refetch()
      }
    })
        Swal.fire({
          title: "Deleted!",
          text: "This campaign deleted successfully",
          icon: "success"
        });
      }
    });
  }
  // Pagination ===================
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(10)
  const lastPostIndex = currentPage*postPerPage 
  const firstPostIndex = lastPostIndex - postPerPage 
  const currentPost = campaign.slice(firstPostIndex,lastPostIndex)
  return (
    <>
      <section className="container relative mx-auto flex flex-col justify-center items-center min-h-[350px] py-10">
      <SearchInput setSearchText={setSearchText} ></SearchInput>
        <div className="w-full  overflow-x-auto">
          <table className="border-collapse border text-center border-gray-200 w-full">
            <thead className="bg-primary bg-opacity-95 text-white">
              <tr>
                <th className="border font-medium px-2 py-2">
                  <FaHashtag className="inline-block mr-1 text-lg mb-1" />
                </th>
                <th className="border font-medium px-2 py-2">
                  <FaUserAlt className="inline-block mr-1 text-lg mb-1" /> Name
                </th>
                <th className="border font-medium px-2 py-2">
                  <AiOutlineCalendar className="inline-block mr-1 text-lg mb-1" />{" "}
                 Date & Time 
                </th>
                <th className="border font-medium px-2 py-2">
                  <FaLocationDot
                   className="inline-block mr-1 text-lg mb-1" />
                  Location
                </th>
                <th className="border font-medium px-2 py-2">
                  <FaUserMd 
                   className="inline-block mr-1 text-lg mb-1" />
                  Healthcare Professional
                </th>
                <th className="border font-medium px-2 py-2">
                  <MdOutlineSettings className="inline-block mr-1 text-lg mb-1" />{" "}
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-50">
               {currentPost?.map((item, i) => (
                    <tr key={item._id}>
                      <td className="border border-gray-300 py-2 px-2">
                        {i + 1}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        {item.campName}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        {format(new Date(item?.dateTime), "P")}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        {item?.location}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        {item?.healthCareName}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <div className="flex items-center justify-center gap-3">
                        <Link to={`/dashboard/updateCamp/${item?._id}`}
                            className="text-secondary bg-white px-2 flex items-center gap-1 border py-1 rounded"
                          >
                            <span className="text-xl">
                            <FaEdit />
                            </span>
                          </Link>
                          <button
                            onClick={() => handleDeleteCamp(item._id)}
                            className="text-secondary bg-white px-2 flex items-center gap-1 border py-1 rounded"
                          >
                            <span className="text-xl">
                              <MdDeleteForever />
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {campaign.length > 5 && 
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={campaign?.length}></Pagination>
          }
          { campaign.length === 0 && <p className="py-5 absolute left-0 text-center w-full text-lg">Camps Not Found</p>}
        </div>
      </section>
    </>
  );
};

export default ManageCamp;