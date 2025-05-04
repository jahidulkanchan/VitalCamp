/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RegiCampModal = ({ isOpen, closeModal, detailsInfo, refetch }) => {
  const { user } = useAuth();
  const { _id, campName, campFees, location, healthCareName } = detailsInfo;
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

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
      confirmationStatus: 'pending',
    };
    await axiosSecure.post(`/regiCamps/${user?.email}`, regiCampInfo).then(async (res) => {
      if (res.data?.message) {
        return toast.error(res.data?.message);
      }
      if (res.data.insertedId) {
        reset();
        closeModal();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Camp added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        await axiosSecure.patch(`/updateCount/${_id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
          }
        });
      }
    });
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={closeModal}>
          {/* Backdrop */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70" />
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
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full md:w-8/12 transform overflow-hidden rounded-2xl bg-white dark:bg-darkCard p-6 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-darkLight">
                    Join Camp
                  </Dialog.Title>

                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Form Fields */}
                      {[
                        { label: 'Camp Name', name: 'campName', defaultValue: campName, type: 'text', readOnly: true },
                        { label: 'Camp Fees', name: 'campFees', defaultValue: campFees, type: 'text', readOnly: true },
                        { label: 'Location', name: 'location', defaultValue: location, type: 'text', readOnly: true },
                        { label: 'Healthcare Professional', name: 'healthCareName', defaultValue: healthCareName, type: 'text', readOnly: true },
                        { label: 'Participant Name', name: 'participantName', defaultValue: user?.displayName, type: 'text', readOnly: true, required: true },
                        { label: 'Participant Email', name: 'participantEmail', defaultValue: user?.email, type: 'email', readOnly: true, required: true },
                        { label: 'Age', name: 'participantAge', type: 'number', min: 1, required: true },
                        { label: 'Phone Number', name: 'phoneNumber', type: 'number', min: 1, required: true },
                        {
                          label: 'Gender',
                          name: 'gender',
                          type: 'select',
                          options: [
                            { value: '', label: 'Select Gender', disabled: true },
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                          ],
                          required: true,
                        },
                        { label: 'Emergency Contact', name: 'emergencyNo', type: 'text', min: 1, required: true },
                      ].map((field, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
                          {field.type === 'select' ? (
                            <select
                              {...register(field.name)}
                              name={field.name}
                              defaultValue={field.defaultValue || ''}
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                              required={field.required}>
                              {field.options.map((option, i) => (
                                <option key={i} value={option.value} disabled={option.disabled} className="dark:bg-gray-700">
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              {...register(field.name)}
                              type={field.type}
                              name={field.name}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className={`w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
                                field.readOnly ? 'cursor-not-allowed opacity-80' : ''
                              }`}
                              defaultValue={field.defaultValue}
                              readOnly={field.readOnly}
                              min={field.min}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}

                      {/* Action Buttons */}
                      <div className="mt-6 col-span-2 flex justify-end space-x-4">
                        <button
                          type="button"
                          className="px-5 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          onClick={() => {
                            closeModal();
                            reset();
                          }}>
                          Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-md bg-primary hover:bg-secondary text-white transition-colors">
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
