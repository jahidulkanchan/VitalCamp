import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDriveFileRenameOutline, MdOutlineFeedback, MdOutlinePayment, MdOutlinePayments } from "react-icons/md";
import { FaHashtag, FaPaperPlane} from "react-icons/fa";
import {  AiOutlineInteraction } from "react-icons/ai";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { VscFeedback } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./payment/CheckoutForm";
import SearchInput from "../../components/SearchInput";
import { LiaCampgroundSolid } from "react-icons/lia";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";


const RegistareCamp = () => {
  const { user } = useAuth();
  const [payInfo,setPayInfo] = useState({})
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFeedBack, setIsModalFeedBack] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handlePayment = (item) => {
    setIsModalOpen(true);
    setPayInfo(item);
  };
  const { data: regiCampData = [], refetch } = useQuery({
    queryKey: ["singleRegiItem", user?.email,searchText],
    queryFn: async () => {
      const response = await axiosSecure.get(`/regiCamps/${user?.email}?search=${searchText}`);
      return response.data;
    },
  });
  const handleDeleteRegiCamp = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/regiCamp/${id}`).then(() => {
          refetch();
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your Register Camp has been deleted.",
          icon: "success"
        });
       
      }
    });
  };

  // Feeback ==================
  const { register, handleSubmit,reset } = useForm();
  const onSubmit = async (data) => {
    const feedbackInfo = {
      authorEmail: user?.email,
      authorName: user?.displayName,
      authorProfile: user?.photoURL,
      feedbackText: data.feedbackText,
      ratingPoint: parseFloat(data.ratingPoint),
    }
    const res = await axiosSecure.post('/feedbacks', feedbackInfo)
    if(res.data){
      toast.success('Thanks for your feedback')
      setIsModalFeedBack(false)
      reset()
    } 
  };

  //Pagination Functions ====================== 
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(10)
  const lastPostIndex = currentPage*postPerPage 
  const firstPostIndex = lastPostIndex - postPerPage 
  const currentPost = regiCampData.slice(firstPostIndex,lastPostIndex)

  // Payment Method ====================
  // recreating the `Stripe` object on every render.
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY)

  return (
    <>
      <section className="container mx-auto flex flex-col justify-center items-center  py-5 md:py-10">
      <SearchInput setSearchText={setSearchText} ></SearchInput>
        <div className="w-full overflow-x-auto">
          <table className="border-collapse border text-center border-gray-200 w-full">
            <thead className="bg-primary bg-opacity-95 text-white">
              <tr>
                <th className="border text-sm font-medium px-1 md:px-2 py-2">
                  <FaHashtag className="inline-block mr-1 text-lg mb-1" />
                </th>
               <th className="border text-sm font-medium px-1 md:px-2 py-2">
                <LiaCampgroundSolid className="inline-block mr-1 text-lg mb-1" /> Camp
                  Name
                </th>
                <th className="border text-sm font-medium px-1 md:px-2 py-2">
                <MdOutlinePayments className="inline-block mr-1 text-lg mb-1" /> Camp
                  Fees
                </th>
                <th className="border text-sm font-medium px-1 md:px-2 py-2">
                <MdDriveFileRenameOutline className="inline-block mr-1 text-lg mb-1" />{" "}
                  Participant Name
                </th>
                <th className="border text-sm font-medium px-1 md:px-2 py-2">
                <MdOutlinePayment className="inline-block mr-1 text-lg mb-1" />
                  Payment Status
                </th>
                <th className="border text-sm font-medium px-1 md:px-2 py-2">
                <GiConfirmed className="inline-block mr-1 text-lg mb-1" />
                  Confirmation Status
                </th>
                <th className="border text-sm font-medium px-1 md:px-2 py-2">
                <AiOutlineInteraction className="inline-block mr-1 text-lg mb-1" />{" "}
                  Actions
                </th>
                <th className="border text-sm font-medium px-1 md:px-2 py-2">
                <MdOutlineFeedback className="inline-block mr-1 text-lg mb-1" />{" "}
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-50">
              {currentPost?.map((item, i) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 py-2 px-2">{i + 1}</td>
                  <td className="border border-gray-300 min-w-[170px] md:min-w-fit py-2 px-2">
                    {item.campName}
                  </td>
                   <td className="border border-gray-300 min-w-[170px] md:min-w-fit py-2 px-2">
                    ${item?.campFees}
                  </td>
                  <td className="border border-gray-300 min-w-[170px] md:min-w-fit py-2 px-2">
                    {item?.participantName}
                  </td>
                  <td className="border border-gray-300 min-w-[170px] md:min-w-fit py-2 px-2">
                    {item?.paymentStatus === "unpaid" ? (
                      <>
                        <button
                          className="text-sm mx-auto px-5 flex items-center gap-1 border py-1 rounded bg-primary text-white"
                          onClick={() =>{
                            handlePayment(item)
                          }}
                        >
                          Pay Now
                        </button>
                      </>
                    ) : (
                      "paid"
                    )}
                  </td>
                  <td className="border border-gray-300 min-w-[170px] md:min-w-fit py-2 px-2">
                    {item?.confirmationStatus}
                  </td>
                  <td className="border border-gray-300 min-w-[170px] md:min-w-fit py-2 px-2">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        disabled={item?.confirmationStatus === "confirmed" || item?.paymentStatus === "paid"}
                        onClick={() => handleDeleteRegiCamp(item._id)}
                        className={` p-1 flex items-center gap-1 border rounded-full ${item?.confirmationStatus === "confirmed" || item?.paymentStatus === "paid" ? 'bg-slate-400 text-slate-100' :
                          'text-red-500 bg-white'} border shadow`}
                      >
                        <span className="text-xl">
                          <RxCross2 />
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 min-w-[170px] md:min-w-fit py-2 px-2">
                    <button
                      onClick={() => setIsModalFeedBack(true)}
                      disabled={item?.confirmationStatus === "pending"}
                      className={`text-sm px-2 flex text-center mx-auto items-center justify-center gap-1 border py-1 rounded ${
                        item?.confirmationStatus === "pending"
                          ? "bg-slate-400 text-slate-50"
                          : "text-white bg-primary"
                      }`}
                    >
                      {" "}
                      <span className="text-md">
                        <VscFeedback />
                      </span> Feedback
                    </button>
                  </td>
                  {/* FeedBack Modal ========================== */}
                  {isModalFeedBack && (
                    <>
                      <div className="fixed inset-0 bg-black bg-opacity-45 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full md:w-2/5">
                          {/* Modal Header */}
                          <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Submit Your Feedback
                            </h3>
                            <button
                              onClick={() => setIsModalFeedBack(false)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                              <RxCross2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Modal Body */}
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-4 space-y-4"
                          >
                            <div className="space-y-2">
                              <label className="block text-left font-medium text-gray-700">
                                Your Feedback
                              </label>
                              <textarea
                                {...register("feedbackText")}
                                name="feedbackText"
                                placeholder="Write your feedback here..."
                                rows="4"
                                className="w-full outline-none px-4 py-2 border rounded-lg "
                                required
                              ></textarea>
                            </div>

                            <div className="space-y-2 text-left w-full">
                              <label className="block text-left font-medium text-gray-700">
                                Rating
                              </label>
                              <input 
                                type="number"
                                min='1'
                                max='5'
                                step="0.1"
                                {...register("ratingPoint")}
                                name="ratingPoint"
                                placeholder="Rating Out of 5"
                                required
                                className="min-w-[200px] sm:w-1/2 outline-none px-4 py-2 border rounded-lg "
                              ></input>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-4 pt-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsModalFeedBack(false)
                                  reset()
                                }}
                                className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 border rounded hover:bg-gray-200 outline-none"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-1 flex gap-2 items-center text-sm font-medium text-white bg-primary rounded hover:bg-secondary outline-none"
                              >
                                Send{" "}
                                <span>
                                  <FaPaperPlane />
                                </span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                  {/* Payment Modal ============================ */}
                  {isModalOpen && (
                    <>
                      {/* Modal Backdrop */}
                      <div className="fixed inset-0 bg-black bg-opacity-20 z-40" />

                      {/* Modal Content */}
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white px-5 pt-4 mx-3 pb-8 rounded-lg shadow-xl w-full max-w-md">
                          {/* Modal Header */}
                          <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Payment Details
                            </h3>
                            <button
                              onClick={() => setIsModalOpen(false)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                              <RxCross2 className="w-5 h-5" />
                            </button>
                          </div>
                          {/* Modal Body */}
                          <Elements stripe={stripePromise}>
                            <CheckoutForm refetch={refetch} payInfo={payInfo} setIsModalOpen={setIsModalOpen} />
                          </Elements>
                        </div>
                      </div>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {regiCampData.length > 5 && 
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={regiCampData?.length}></Pagination>
          }
          {regiCampData.length === 0 && (
            <p className="py-2 min-h-[400px] flex flex-col justify-center items-center left-0 text-center w-full text-lg">
              There is No Camps
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default RegistareCamp;
