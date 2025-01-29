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
      <section>
        <div>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-5 px-5">
            <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full">
               <div className="w-full lg:w-1/2">
                <img
                  src={detailsInfo.image}
                  alt={detailsInfo.campName}
                  className="w-full h-72 lg:h-full object-cover"
                />
              </div> 
              
             <div className="p-6 lg:w-1/2">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {detailsInfo.campName}
                </h1>
                <p className="text-gray-600 text-base mb-6">
                  {detailsInfo.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>
                      <strong>Location:</strong> {detailsInfo.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUserMd className="text-green-500" />
                    <span>
                      <strong>Healthcare Professional:</strong>{" "}
                      {detailsInfo.healthCareName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-orange-500" />
                    <span>
                      <strong>Date:</strong>{" "}
                      {new Date(detailsInfo.dateTime).toLocaleDateString()}{" "}
                      <br />
                      <strong>Time:</strong>{" "}
                      {new Date(detailsInfo.dateTime).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-purple-500" />
                    <span>
                      <strong>Participants:</strong>{" "}
                      {detailsInfo.participantCount}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-6">
                  <strong>Fees:</strong> ${detailsInfo.campFees}
                </p>

                <div className="text-center flex justify-between lg:text-left">
                  
                  <Link onClick={()=> window.scrollTo(0,0)} to='/availableCamp' className="bg-slate-100 hover:bg-slate-300 duration-200 w-fit px-4 flex items-center text-md rounded gap-1"><RiArrowLeftDoubleFill />Go Back</Link>
                  
                  <button
                disabled={isAdmin && user}
                onClick={() => {
                  openModal(),
                  !user && navigate("/login");
                }}
                className={`${
                      isAdmin && user
                        ? "bg-gray-300 text-slate-500"
                        : "bg-primary text-white hover:bg-secondary"
                    }  px-4 py-2  rounded transition`}
                  >
                    Join Camp
                  </button>
                  <RegiCampModal refetch={refetch} detailsInfo={detailsInfo} className='z-[99999999]'  isOpen={isModalOpen}
                closeModal={closeModal} />
                </div>
              </div> 
             </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
