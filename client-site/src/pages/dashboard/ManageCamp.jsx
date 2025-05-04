import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaEdit, FaUserAlt, FaUserMd } from 'react-icons/fa';
import { FaHashtag, FaLocationDot } from 'react-icons/fa6';
import { MdDeleteForever, MdOutlineSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination';
import SearchInput from '../../components/SearchInput';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiAlertCircle } from 'react-icons/fi';

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');
  const { data: campaign = [], refetch } = useQuery({
    queryKey: ['adminAllCamps', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminAllCamps?search=${searchText}`);
      return res.data;
    },
  });
  const handleDeleteCamp = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/allCamps/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
          }
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'This campaign deleted successfully',
          icon: 'success',
        });
      }
    });
  };
  // Pagination ===================
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = campaign.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <section className="container mx-auto flex flex-col justify-center items-center min-h-[350px] py-10 px-4 dark:bg-darkBg">
        {/* Search Input */}
        <div className="w-full max-w-3xl mb-6">
          <SearchInput setSearchText={setSearchText} />
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-lg shadow-sm">
          <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
            {/* Table Header */}
            <thead className="bg-primary dark:bg-secondary text-white">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                  <FaHashtag className="inline-block mr-2" />
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                  <FaUserAlt className="inline-block mr-2" /> Name
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                  <AiOutlineCalendar className="inline-block mr-2" /> Date & Time
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                  <FaLocationDot className="inline-block mr-2" /> Location
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                  <FaUserMd className="inline-block mr-2" /> Healthcare Professional
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                  <MdOutlineSettings className="inline-block mr-2" /> Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white dark:bg-darkCard divide-y divide-gray-200 dark:divide-gray-700">
              {currentPost?.map((item, i) => (
                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">{i + 1}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">{item.campName}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                    {format(new Date(item?.dateTime), 'PPpp')} {/* Shows date and time */}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">{item?.location}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">{item?.healthCareName}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/updateCamp/${item?._id}`}
                        className="text-white bg-primary dark:bg-secondary hover:bg-opacity-90 px-3 py-1.5 flex items-center gap-2 rounded-md transition-colors"
                        title="Edit">
                        <FaEdit className="text-lg" />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteCamp(item._id)}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 flex items-center gap-2 rounded-md transition-colors"
                        title="Delete">
                        <MdDeleteForever className="text-lg" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {campaign.length === 0 && (
            <div className="w-full py-10 flex flex-col items-center justify-center bg-white dark:bg-darkCard rounded-b-lg">
              <FiAlertCircle className="text-4xl text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-lg text-gray-600 dark:text-gray-400">No camps found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {campaign.length > 5 && (
          <div className="mt-6 w-full">
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={campaign?.length} />
          </div>
        )}
      </section>
    </>
  );
};

export default ManageCamp;
