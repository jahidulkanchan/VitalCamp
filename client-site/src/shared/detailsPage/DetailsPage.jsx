import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaCalendarAlt, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import RegiCampModal from "./RegiCampModal";
import { useState } from "react";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const DetailsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const {user} = useAuth()
  const [isAdmin]= useAdmin()
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const {id} = useParams();
  const axiosPublic = useAxiosPublic()
  const {data: detailsInfo={}, refetch} = useQuery({
    queryKey: ['details', id],
    queryFn: async()=>{
      const {data} = await axiosPublic(`/details/${id}`)
      return data
    }
  })
  return (
    <>
      <section className="dark:bg-darkBg">
        <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 dark:bg-darkBg">
          <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full border border-gray-200 dark:border-gray-700">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative">
              <img src={detailsInfo.image} alt={detailsInfo.campName} className="w-full h-72 lg:h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 lg:w-1/2">
              <h1 className="text-3xl font-medium text-gray-800 dark:text-darkLight mb-4">{detailsInfo.campName}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed">{detailsInfo.description}</p>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mb-6">
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800 dark:text-gray-200">Location:</strong> {detailsInfo.location}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <FaUserMd className="text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800 dark:text-gray-200">Healthcare Professional:</strong> {detailsInfo.healthCareName}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <FaCalendarAlt className="text-orange-500 dark:text-orange-400 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800 dark:text-gray-200">Date:</strong> {new Date(detailsInfo.dateTime).toLocaleDateString()}
                    <br />
                    <strong className="text-gray-800 dark:text-gray-200">Time:</strong> {new Date(detailsInfo.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <FaUsers className="text-purple-500 dark:text-purple-400 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800 dark:text-gray-200">Participants:</strong> {detailsInfo.participantCount}
                  </span>
                </div>
              </div>

              {/* Fees */}
              <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                  <span className="text-primary dark:text-secondary">Camp Fees:</span> ${detailsInfo.campFees}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/availableCamp"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <RiArrowLeftDoubleFill className="text-primary dark:text-secondary" />
                  Go Back
                </Link>

                <button
                  disabled={isAdmin && user}
                  onClick={() => {
                    openModal(), !user && navigate('/login');
                  }}
                  className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                    isAdmin && user ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary text-white'
                  }`}>
                  Join Camp
                </button>
              </div>

              {/* Modal */}
              <RegiCampModal refetch={refetch} detailsInfo={detailsInfo} isOpen={isModalOpen} closeModal={closeModal} className="z-[9999]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
