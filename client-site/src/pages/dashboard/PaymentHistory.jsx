import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { FaHashtag } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { LiaCampgroundSolid } from 'react-icons/lia';
import { MdOutlinePayment, MdOutlinePriceCheck } from 'react-icons/md';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });
  //Pagination Functions ======================
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = paymentHistory.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <section className="container mx-auto flex flex-col justify-center items-center md:py-5 px-2">
        <div className="w-full relative overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700">
          <table className="w-full border-collapse text-center bg-white dark:bg-darkCard">
            <thead className="bg-primary text-white">
              <tr>
                <th className="font-medium border-b border-gray-300 px-2 py-3">
                  <FaHashtag className="inline-block mr-1 text-lg mb-1" />
                </th>
                <th className="font-medium border-b border-gray-300 px-2 py-3 min-w-[190px] text-left">
                  <LiaCampgroundSolid className="inline-block mr-1 text-lg mb-1" />
                  Camp Name
                </th>
                <th className="font-medium border-b border-gray-300 px-2 py-3 min-w-[190px] text-left">
                  <GrTransaction className="inline-block rotate-90 mr-1 text-lg mb-1" />
                  Transaction ID
                </th>
                <th className="font-medium border-b border-gray-300 px-2 py-3 min-w-[150px]">
                  <MdOutlinePriceCheck className="inline-block mr-1 text-lg mb-1" />
                  Camp Fees
                </th>
                <th className="font-medium border-b border-gray-300 px-2 py-3 min-w-[150px]">
                  <MdOutlinePayment className="inline-block mr-1 text-lg mb-1" />
                  Payment Status
                </th>
                <th className="font-medium border-b border-gray-300 px-2 py-3 min-w-[190px]">
                  <GiConfirmed className="inline-block mr-1 text-lg mb-1" />
                  Confirmation Status
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPost?.map((item, i) => (
                <tr key={item._id} className="text-gray-800 dark:text-darkLight hover:bg-gray-50 dark:hover:bg-[#222]">
                  <td className="py-2 border-b border-gray-200 dark:border-gray-700 px-2">{i + 1}</td>
                  <td className="text-left py-2 border-b border-gray-200 dark:border-gray-700 px-2">
                    {item.campName}
                    <p className="text-xs text-gray-600 dark:text-gray-400">{format(new Date(item?.notifyDate), 'P | p')}</p>
                  </td>
                  <td className="text-left text-sm py-2 border-b border-gray-200 dark:border-gray-700 px-2">{item?.transactionsId}</td>
                  <td className="py-2 px-2 border-b border-gray-200 dark:border-gray-700">${item.campFees}</td>
                  <td className="py-2 px-2 border-b border-gray-200 dark:border-gray-700">{item?.paymentStatus}</td>
                  <td className="py-2 px-2 border-b border-gray-200 dark:border-gray-700">{item?.confirmationStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {paymentHistory?.length > 5 && (
            <div className="mt-4">
              <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={paymentHistory?.length} />
            </div>
          )}

          {paymentHistory?.length === 0 && <p className="py-5 absolute left-0 mx-auto right-0 text-center w-full text-lg text-gray-600 dark:text-gray-400">There are no payment history</p>}
        </div>
      </section>
    </>
  );
};

export default PaymentHistory;
