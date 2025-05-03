/* eslint-disable react/prop-types */
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaUsers, FaHospital } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CampCard = ({ camp, isLayout }) => {
  return (
    <>
      <div className="card overflow-hidden dark:bg-darkCard group hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-xl bg-white">
        {/* Image with hover effect */}
        <figure className="mb-4 overflow-hidden rounded-lg">
          <img src={camp?.image} alt={camp?.campName} className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg ${isLayout ? 'h-[300px]' : 'h-[200px]'}`} />
        </figure>

        <div className="flex flex-col flex-grow justify-between">
          <div>
            {/* Title */}
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-darkLight hover:text-primary transition-colors">{camp?.campName}</h2>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="space-y-2">
                <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <FaCalendarAlt className="mr-2 text-primary" />
                  {new Date(camp?.dateTime).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <FaMapMarkerAlt className="mr-2 text-primary" />
                  {camp?.location}
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <FaDollarSign className="mr-2 text-primary" />${camp?.campFees}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <FaUsers className="mr-2 text-primary" />
                  {camp?.participantCount} participants
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <FaHospital className="mr-2 text-primary" />
                  {camp?.healthCareName}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">{camp?.description}</p>
          </div>

          {/* Button */}
          <div className="card-actions flex justify-end">
            <Link to={`/details/${camp._id}`} className="bg-primary hover:bg-secondary transition-colors duration-300 text-white px-5 py-2 rounded-lg font-medium flex items-center">
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampCard;
