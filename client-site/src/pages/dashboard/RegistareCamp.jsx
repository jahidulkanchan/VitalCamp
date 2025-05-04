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
      <section className="container mx-auto flex flex-col justify-center items-center py-5 md:py-10 dark:bg-darkBg">
        <SearchInput setSearchText={setSearchText} />

        <div className="w-full overflow-x-auto">
          <table className="border-collapse border border-gray-200 dark:border-gray-700 w-full rounded-lg overflow-hidden">
            {/* Table Header */}
            <thead className="bg-primary dark:bg-secondary text-white">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <FaHashtag className="inline-block mr-1 text-lg mb-1" />
                </th>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <LiaCampgroundSolid className="inline-block mr-1 text-lg mb-1" /> Camp Name
                </th>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <MdOutlinePayments className="inline-block mr-1 text-lg mb-1" /> Camp Fees
                </th>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <MdDriveFileRenameOutline className="inline-block mr-1 text-lg mb-1" /> Participant Name
                </th>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <MdOutlinePayment className="inline-block mr-1 text-lg mb-1" /> Payment Status
                </th>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <GiConfirmed className="inline-block mr-1 text-lg mb-1" /> Confirmation Status
                </th>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <AiOutlineInteraction className="inline-block mr-1 text-lg mb-1" /> Actions
                </th>
                <th className="border border-gray-300 dark:border-gray-600 text-sm font-medium px-2 py-3">
                  <MdOutlineFeedback className="inline-block mr-1 text-lg mb-1" /> Feedback
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-slate-50 dark:bg-darkCard">
              {currentPost?.map((item, i) => (
                <tr key={item._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-700 py-3 px-3 text-gray-800 dark:text-gray-200">{i + 1}</td>
                  <td className="border border-gray-300 dark:border-gray-700 min-w-[170px] md:min-w-fit py-3 px-3 text-gray-800 dark:text-gray-200">{item.campName}</td>
                  <td className="border border-gray-300 dark:border-gray-700 min-w-[170px] md:min-w-fit py-3 px-3 text-gray-800 dark:text-gray-200">${item?.campFees}</td>
                  <td className="border border-gray-300 dark:border-gray-700 min-w-[170px] md:min-w-fit py-3 px-3 text-gray-800 dark:text-gray-200">{item?.participantName}</td>
                  <td className="border border-gray-300 dark:border-gray-700 min-w-[170px] md:min-w-fit py-3 px-3">
                    {item?.paymentStatus === 'unpaid' ? (
                      <button
                        className="text-sm mx-auto px-5 flex items-center gap-1 border py-1.5 rounded bg-primary dark:bg-secondary hover:bg-secondary dark:hover:bg-primary text-white transition-colors"
                        onClick={() => handlePayment(item)}>
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-green-600 dark:text-green-400">paid</span>
                    )}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 min-w-[170px] md:min-w-fit py-3 px-3">
                    <span className={`${item?.confirmationStatus === 'confirmed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{item?.confirmationStatus}</span>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 min-w-[170px] md:min-w-fit py-3 px-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        disabled={item?.confirmationStatus === 'confirmed' || item?.paymentStatus === 'paid'}
                        onClick={() => handleDeleteRegiCamp(item._id)}
                        className={`p-1.5 flex items-center gap-1 border rounded-full ${
                          item?.confirmationStatus === 'confirmed' || item?.paymentStatus === 'paid'
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            : 'text-red-500 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } border-gray-300 dark:border-gray-600 shadow transition-colors`}>
                        <RxCross2 className="text-xl" />
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 min-w-[170px] md:min-w-fit py-3 px-3">
                    <button
                      onClick={() => setIsModalFeedBack(true)}
                      disabled={item?.confirmationStatus === 'pending'}
                      className={`text-sm px-3 flex text-center mx-auto items-center justify-center gap-1 border py-1.5 rounded ${
                        item?.confirmationStatus === 'pending'
                          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-primary dark:bg-secondary hover:bg-secondary dark:hover:bg-primary text-white'
                      } transition-colors`}>
                      <VscFeedback className="text-md" /> Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {regiCampData.length === 0 && (
            <div className="py-10 min-h-[400px] flex flex-col justify-center items-center text-center w-full">
              <p className="text-lg text-gray-600 dark:text-gray-400">There are no registered camps</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {regiCampData.length > 5 && <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={regiCampData?.length} />}

        {/* Feedback Modal */}
        {isModalFeedBack && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-darkCard rounded-lg shadow-xl w-full md:w-2/5 border border-gray-200 dark:border-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-darkLight">Submit Your Feedback</h3>
                <button
                  onClick={() => {
                    setIsModalFeedBack(false);
                    reset();
                  }}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none transition-colors">
                  <RxCross2 className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-left font-medium text-gray-700 dark:text-gray-300">Your Feedback</label>
                  <textarea
                    {...register('feedbackText')}
                    name="feedbackText"
                    placeholder="Write your feedback here..."
                    rows="4"
                    className="w-full outline-none px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    required></textarea>
                </div>

                <div className="space-y-2 text-left w-full">
                  <label className="block text-left font-medium text-gray-700 dark:text-gray-300">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    {...register('ratingPoint')}
                    name="ratingPoint"
                    placeholder="Rating Out of 5"
                    required
                    className="min-w-[200px] sm:w-1/2 outline-none px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalFeedBack(false);
                      reset();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 flex gap-2 items-center text-sm font-medium text-white bg-primary dark:bg-secondary rounded hover:bg-secondary dark:hover:bg-primary transition-colors">
                    Send <FaPaperPlane />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40" />

            {/* Modal Content */}
            <div className="bg-white dark:bg-darkCard px-5 pt-4 mx-3 pb-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 relative z-10">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-darkLight">Payment Details</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none transition-colors">
                  <RxCross2 className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <Elements stripe={stripePromise}>
                <CheckoutForm refetch={refetch} payInfo={payInfo} setIsModalOpen={setIsModalOpen} />
              </Elements>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default RegistareCamp;
