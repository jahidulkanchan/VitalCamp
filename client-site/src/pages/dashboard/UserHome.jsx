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
const UserHome = () => {
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
    <section className="mt-10 max-w-2xl mx-auto rounded-2xl bg-white dark:bg-darkCard shadow-md py-10">
      <div className="flex flex-col md:flex-row gap-5 px-4 md:px-10 justify-center items-center">
        <img className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] object-cover rounded-full border border-gray-300 dark:border-gray-600" src={user?.photoURL} alt="User Image" />
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl dark:text-white font-medium flex items-center gap-2">
            <FaCircleUser className="text-primary" />
            {user?.displayName || 'User Name'}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 flex items-center gap-2 mt-1">
            <BiSolidEnvelope className="text-primary" />
            {user?.email || 'User Email'}
          </p>
          <p className="px-3 mt-2 py-[2px] bg-primary text-white w-fit rounded-full text-xs mx-auto md:mx-0">Participant</p>
          <button onClick={() => setIsShow(true)} className="bg-primary hover:bg-secondary rounded px-4 py-2 mt-5 text-white transition">
            Update Profile
          </button>
        </div>
      </div>

      {isShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center border-b pb-3 dark:border-gray-600">
              <h3 className="text-lg font-bold dark:text-darkLight">Edit Your Profile</h3>
              <button onClick={() => setIsShow(false)} className="text-gray-500 text-2xl hover:text-gray-700 dark:hover:text-white">
                <RxCross2 />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
              <div>
                <label className="block mb-2 font-semibold dark:text-darkLight" htmlFor="name">
                  User Name:
                </label>
                <input
                  type="text"
                  {...register('name')}
                  name="name"
                  placeholder="Your Name"
                  required
                  className="p-2 w-full bg-slate-100 dark:bg-[#1d1d1d] border border-gray-300 dark:border-gray-600 rounded outline-none text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold dark:text-darkLight" htmlFor="image">
                  Profile Image:
                </label>
                <input
                  type="file"
                  {...register('image')}
                  name="image"
                  required
                  className="p-2 w-full bg-slate-100 dark:bg-[#1d1d1d] border border-gray-300 dark:border-gray-600 rounded outline-none text-gray-900 dark:text-white"
                />
              </div>
              <button type="submit" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded transition mx-auto">
                Update Now
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserHome;
