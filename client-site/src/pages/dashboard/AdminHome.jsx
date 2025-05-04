import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiSolidEnvelope } from 'react-icons/bi';
import { FaCircleUser } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { useAuth } from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const image_host_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;
const AdminHome = () => {
  const axiosPublic = useAxiosPublic();
  const [isShow, setIsShow] = useState(false);
  const { user, setLoading, updateUserProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const name = data?.name;
    const photoFile = { image: data?.image[0] };
    const res = await axiosPublic.post(image_host_api, photoFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.data?.success) {
      const photoURL = res.data.data.url;
      updateUserProfile(name, photoURL).then(() => {
        toast.success('Profile updated successfully');
        setIsShow(false);
        setLoading(false);
      });
    }
  };
  return (
    <>
      <section className="mt-10 max-w-2xl mx-auto rounded-2xl bg-white dark:bg-darkCard shadow-md py-5 md:py-10 border border-gray-200 dark:border-gray-700">
        <div className="flex-col flex md:flex-row gap-5 px-2 md:px-10 justify-center items-center">
          {/* User Avatar */}
          <div className="relative">
            <img
              className="w-[100px] h-[100px] md:h-[180px] rounded-full object-cover md:w-[180px] border-4 border-primary dark:border-secondary"
              src={user?.photoURL}
              alt="User Profile"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
                e.target.onerror = null;
              }}
            />
          </div>

          {/* User Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl gap-3 flex items-center font-medium md:text-2xl text-gray-800 dark:text-darkLight">
              <FaCircleUser className="text-primary dark:text-secondary text-2xl" />
              {user?.displayName || 'User Name'}
            </h2>
            <p className="md:text-md flex text-slate-600 dark:text-gray-300 items-center gap-2 justify-center md:justify-start">
              <BiSolidEnvelope className="text-primary dark:text-secondary" />
              {user?.email || 'User Email'}
            </p>
            <p className="px-3 mt-2 py-[2px] bg-primary dark:bg-secondary text-white w-fit rounded-full text-xs text-center mx-auto md:mx-0">Organizer</p>
            <button
              onClick={() => setIsShow(true)}
              className="bg-primary hover:bg-secondary dark:hover:bg-primary rounded-lg px-4 py-2 mt-5 text-white inline-block mx-auto md:mx-0 w-fit text-center transition-colors duration-200">
              Update Profile
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isShow && (
          <div className="fixed inset-0 bg-gray-600/50 dark:bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white dark:bg-darkCard rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-700">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-darkLight">Edit Your Profile</h3>
                <button onClick={() => setIsShow(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <RxCross2 className="text-2xl" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                      User Name:
                    </label>
                    <input
                      className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800 dark:text-gray-200"
                      type="text"
                      {...register('name')}
                      placeholder="Your Name"
                      name="name"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300" htmlFor="image">
                      Profile Image:
                    </label>
                    <input
                      className="block w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary dark:file:text-secondary hover:file:bg-primary/20 transition-colors"
                      type="file"
                      accept="image/*"
                      {...register('image')}
                      name="image"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsShow(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-primary hover:bg-secondary dark:hover:bg-primary text-white transition-colors">
                    Update Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AdminHome;
