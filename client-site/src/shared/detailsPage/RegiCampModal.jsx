/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RegiCampModal = ({ isOpen, closeModal, detailsInfo,refetch }) => {
  const { user } = useAuth();
  const { _id, campName, campFees, location, healthCareName } = detailsInfo;
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const regiCampInfo = {
      campId: _id,
      campName: data.campName,
      campFees: parseInt(data.campFees),
      location: data.location,
      healthCareName: data.healthCareName,
      participantName: data.participantName,
      participantEmail: data.participantEmail,
      participantAge: data.participantAge,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      emergencyNo: data.emergencyNo,
      paymentStatus: 'unpaid',
      confirmationStatus: 'pending'
    };
    await axiosSecure.post(`/regiCamps/${user?.email}`, regiCampInfo)
    .then(async(res) => {
      if(res.data?.message){
       return toast.error(res.data?.message)
      }
      if(res.data.insertedId){
        reset()
        closeModal()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Camp added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        await axiosSecure.patch(`/updateCount/${_id}`)
        .then((res)=>{
          if(res.data.modifiedCount > 0){
            refetch()
          }
        })
      }
    });
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99]"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:w-8/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Join Camp
                  </Dialog.Title>
                  <div className="mt-4">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                      <div>
                        <label className="col-span-2 text-sm font-medium text-gray-700">
                          Camp Name
                        </label>
                        <input
                          {...register("campName")}
                          readOnly
                          type="text"
                          name="campName"
                          placeholder="Enter camp name"
                          className="w-full border border-gray-300 rounded-md p-2"
                          defaultValue={campName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Camp Fees
                        </label>
                        <input
                          {...register("campFees")}
                          readOnly
                          type="text"
                          name="campFees"
                          placeholder="Enter camp fees"
                          className="w-full border border-gray-300 rounded-md p-2"
                          defaultValue={campFees}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          {...register("location")}
                          readOnly
                          type="text"
                          name="location"
                          placeholder="Enter location"
                          className="w-full border border-gray-300 rounded-md p-2"
                          defaultValue={location}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Healthcare Professional
                        </label>
                        <input
                          {...register("healthCareName")}
                          readOnly
                          type="text"
                          name="healthCareName"
                          placeholder="Enter professional name"
                          className="w-full border border-gray-300 rounded-md p-2"
                          defaultValue={healthCareName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Participant Name
                        </label>
                        <input
                          {...register("participantName")}
                          readOnly
                          type="text"
                          name="participantName"
                          placeholder="Enter your name"
                          className="w-full border border-gray-300 rounded-md p-2"
                          defaultValue={user?.displayName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Participant Email
                        </label>
                        <input
                          {...register("participantEmail")}
                          readOnly
                          type="email"
                          name="participantEmail"
                          placeholder="Enter your email"
                          className="w-full border border-gray-300 rounded-md p-2"
                          defaultValue={user?.email}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Age
                        </label>
                        <input
                          {...register("participantAge")}
                          type="number"
                          min='1'
                          name="participantAge"
                          placeholder="Enter your age"
                          className="w-full border border-gray-300 rounded-md p-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          {...register("phoneNumber")}
                          type="number"
                          min='1'
                          name="phoneNumber"
                          placeholder="Enter phone number"
                          className="w-full border border-gray-300 rounded-md p-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Gender
                        </label>
                        <select
                          {...register("gender")}
                          name="gender"
                          defaultValue=""
                          className="w-full border border-gray-300 rounded-md p-2"
                          required
                        >
                          <option disabled value="">
                            Select Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Emergency Contact
                        </label>
                        <input
                          {...register("emergencyNo")}
                          type="text"
                          min='1'
                          name="emergencyNo"
                          placeholder="Enter emergency contact"
                          className="w-full border border-gray-300 rounded-md p-2"
                          required
                        />
                      </div>
                      <div className="mt-6 col-span-2 flex justify-end space-x-4">
                        <button
                          type="button"
                          className="px-5 py-1 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-300"
                          onClick={()=>{
                            closeModal()
                            reset()
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-1 rounded bg-primary text-white hover:bg-green-700"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RegiCampModal;
