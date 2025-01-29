import { AiOutlineCalendar, AiOutlineInteraction } from "react-icons/ai";
import { FaHashtag, FaUserAlt, FaUserMd } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { IoCheckmarkDone } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import useRegiCamp from "../../hooks/useRegiCamp";
import toast from "react-hot-toast";
import SearchInput from "../../components/SearchInput";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";


const ManageRegiCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('')
  const [allCamp, refetch] = useRegiCamp({searchText});

  const handleDeleteRegiCamp = (item) => {
    const {_id,campName,participantName,participantEmail} = item;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        try {
          const res = await axiosSecure.delete(`/regiCamp/${_id}`);
          if (res.data?.deletedCount > 0) {
            const notifyData = {
              participantName: participantName,
              participantEmail: participantEmail,
              message: `Your ${campName} Camp has been rejected.`,
              notifyDate: new Date()
            }
            await axiosSecure.post('/notification', notifyData)
            refetch();
          }
        } catch (error) {
          console.error("Error deleting camp:", error);
        }
      }
    });
  };
  // update RegiCamp status ========================
  const handleUpdateStatus = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/regiCamp/${id}`, {
      confirmationStatus: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      toast.success("Confirmed successfully");
      // For update confirmation status in payment history
      await axiosSecure.patch(`/paymentHistory/${id}`,{confirmationStatus: newStatus})
      refetch();
    }
  };
  // Pagination ===================
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(10)
  const lastPostIndex = currentPage*postPerPage 
  const firstPostIndex = lastPostIndex - postPerPage 
  const currentPost = allCamp.slice(firstPostIndex,lastPostIndex)

 
  return (
    <>
      <section className="container relative mx-auto flex flex-col justify-center items-center min-h-[350px] py-10">
        <SearchInput setSearchText={setSearchText} ></SearchInput>
        <div className="w-full  overflow-x-auto">
          <table className="border-collapse border  text-center border-gray-200 w-full">
            <thead className="bg-primary bg-opacity-95 text-white">
              <tr>
                <th className="border font-medium px-2 py-2">
                  <FaHashtag className="inline-block mr-1 text-lg mb-1" />
                </th>
                <th className="border font-medium min-w-[190px] md:min-w-fit px-2 py-2">
                  <FaUserAlt className="inline-block mr-1 text-lg mb-1" />{" "}
                  Participant Name
                </th>
                <th className="border font-medium min-w-[190px] md:min-w-fit px-2 py-2">
                  <FaUserAlt className="inline-block mr-1 text-lg mb-1" /> Camp
                  Name
                </th>
                <th className="border font-medium min-w-[190px] md:min-w-fit px-2 py-2">
                  <AiOutlineCalendar className="inline-block mr-1 text-lg mb-1" />{" "}
                  Camp Fees
                </th>
                <th className="border font-medium min-w-[190px] md:min-w-fit px-2 py-2">
                  <FaLocationDot className="inline-block mr-1 text-lg mb-1" />
                  Payment Status
                </th>
                <th className="border font-medium min-w-[190px] md:min-w-fit px-2 py-2">
                  <FaUserMd className="inline-block mr-1 text-lg mb-1" />
                  Confirmation Status
                </th>
                <th className="border font-medium min-w-[190px] md:min-w-fit px-2 py-2">
                  <AiOutlineInteraction className="inline-block mr-1 text-lg mb-1" />{" "}
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-50">
              {currentPost?.map((item, i) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 py-2 px-2">{i + 1}</td>
                  <td className="border border-gray-300 py-2 px-2">
                    {item.participantName}
                  </td>
                  <td className="border border-gray-300 py-2 px-2">
                    {item.campName}
                  </td>
                  <td className="border border-gray-300 py-2 px-2">
                    $ {item?.campFees}
                  </td>
                  <td className="border border-gray-300 py-2 px-2">
                    {item?.paymentStatus}
                  </td>
                  <td className="border border-gray-300 py-2 px-2">
                    <select
                      disabled={item?.confirmationStatus === "confirmed" || 
                      item?.paymentStatus === "unpaid"}
                      className="border-none outline-none px-2 py-1 bg-white"
                      defaultValue={item?.confirmationStatus}
                      onChange={(e) =>
                        handleUpdateStatus(item._id, e.target.value)
                      }
                      name="status"
                      id=""
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 py-2 px-2">
                    <div className="flex items-center justify-center gap-3">
                      {item?.confirmationStatus === "pending" ||
                      item?.paymentStatus === "unpaid" ? (
                        <>
                          <button
                            onClick={() => handleDeleteRegiCamp(item)}
                            className="text-red-500 bg-white px-2 flex items-center gap-1 border py-1 rounded"
                          >
                            <span className="text-xl">
                              <RxCross2 />
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            disabled
                            className="text-primary bg-white px-2 flex items-center gap-1 border py-1 rounded"
                          >
                            <span className="text-xl">
                              <IoCheckmarkDone />
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {allCamp?.length === 0 && (
            <p className="py-5 absolute left-0 text-center w-full text-lg">
              Camps Not Found
            </p>
          )}
          </table>
          {allCamp.length > 10 && 
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={allCamp?.length}></Pagination>
          }
        </div>
      </section>
    </>
  );
};

export default ManageRegiCamp;
