import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHashtag } from "react-icons/fa";
import { MdOutlinePayment, MdOutlinePriceCheck } from "react-icons/md";
import { format } from "date-fns";
import { GrTransaction } from "react-icons/gr";
import { GiConfirmed } from "react-icons/gi";
import { LiaCampgroundSolid } from "react-icons/lia";
import Pagination from "../../components/Pagination";
import { useState } from "react";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const {data: paymentHistory=[]} = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async()=>{
      const {data} = await axiosSecure.get(`/payments/${user?.email}`)
      return data;
    }
  })
  //Pagination Functions ====================== 
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage,setPostPerPage] = useState(10)
    const lastPostIndex = currentPage*postPerPage 
    const firstPostIndex = lastPostIndex - postPerPage 
    const currentPost = paymentHistory.slice(firstPostIndex,lastPostIndex)
  return (
    <>
      <section className="container mx-auto flex flex-col justify-center items-center md:py-5">
        <div className="w-full relative">
          <table className="border-collapse border  overflow-x-hidden text-center -gray-200 w-full">
            <thead className="bg-primary bg-opacity-95 text-white">
              <tr>
                <th className=" font-medium border-b px-2 py-2">
                  <FaHashtag className="inline-block mr-1 text-lg mb-1" />
                </th>
                <th className=" font-medium border-b min-w-[190px] md:min-w-fit px-2 py-2">
                <LiaCampgroundSolid className="inline-block mr-1 text-lg mb-1" /> Camp
                  Name
                </th>
                <th className=" font-medium border-b min-w-[190px] md:min-w-fit px-2 py-2">
                <GrTransaction className="inline-block rotate-90 mr-1 text-lg mb-1" />{" "}
                  Transaction ID:
                </th>
                <th className=" font-medium border-b min-w-[190px] md:min-w-fit px-2 py-2">
                  <MdOutlinePriceCheck className="inline-block mr-1 text-lg mb-1" />{" "}
                  Camp Fees
                </th>
                <th className=" font-medium border-b min-w-[190px] md:min-w-fit px-2 py-2">
                <MdOutlinePayment className="inline-block mr-1 text-lg mb-1" />{" "}
                 Payment Status
                </th>
                <th className=" font-medium border-b min-w-[190px] md:min-w-fit px-2 py-2">
                <GiConfirmed  className="inline-block mr-1 text-lg mb-1" />
                  Confirmation Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentPost?.map((item, i) => (
                <tr key={item._id}>
                  <td className="py-2 border-b px-2">{i + 1}</td>
                  <td className=" text-left py-2 border-b px-2">
                    {item.campName} <br />
                   <p className="text-xs text-slate-600 text-left">{format(new Date(item?.notifyDate), 'P | p')}</p>
                  </td>
                  <td className=" text-sm py-2 border-b px-2">
                    {item?.transactionsId}
                  </td>
                  <td className=" py-2 px-2 border-b">
                    ${item.campFees}
                  </td>
              
                  <td className=" py-2 px-2 border-b">
                    $ {item?.paymentStatus}
                  </td>
                  <td className=" py-2 px-2 border-b">
                    {item?.confirmationStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paymentHistory.length > 5 && 
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postPerPage={postPerPage} allDataCamp={paymentHistory?.length}></Pagination>
          }
            {paymentHistory?.length === 0 && (
            <p className="py-5 absolute left-0 mx-auto right-0 text-center w-full text-lg">
              There are no payment history
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default PaymentHistory;