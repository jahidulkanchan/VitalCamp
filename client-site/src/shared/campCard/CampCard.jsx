/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const CampCard = ({ camp, isLayout }) => {
  return (
    <>
      <div className="card overflow-hidden group bg-base-100 shadow-xl p-2 flex flex-col">
        <figure className="mb-4">
          <img
            src={camp?.image}
            alt={camp?.campName}
            className={`w-full object-cover group-hover:scale-105 duration-300 rounded-lg ${
              isLayout ? "h-[300px]" : "h-[200px]"
            }`}
          />
        </figure>
        <div className="flex flex-col flex-grow justify-between">
          <h2 className="card-title text-xl font-bold mb-2">
            {camp?.campName}
          </h2>
          <div className="lg:flex items-center justify-between">
            <div className="text-sm text-gray-600 mb-4">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(camp?.dateTime).toLocaleDateString()}
              </p>
              <p>
                <strong>Location:</strong> {camp?.location}
              </p>
              <p>
                <strong>HealthCare:</strong> {camp?.healthCareName}
              </p>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p>
                <strong>Fees:</strong> ${camp?.campFees}
              </p>
              <p>
                <strong>Participants:</strong> {camp?.participantCount}
              </p>
            </div>
          </div>
          <p className="text-gray-800 text-sm line-clamp-3 mb-4">
            {camp?.description}
          </p>
          <div className="card-actions  flex justify-end">
            <Link
              to={`/details/${camp._id}`}
              className="bg-primary hover:bg-secondary rounded text-white px-5 py-2"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampCard;
