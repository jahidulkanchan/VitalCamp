import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { BiSolidEnvelope } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";

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
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data?.success) {
      const photoURL = res.data.data.url;
      updateUserProfile(name, photoURL).then(() => {
        toast.success("Profile updated successfully");
        setIsShow(false);
        setLoading(false);
      });
    }
  };
  return (
    <>
      <section className="mt-10 max-w-2xl mx-auto rounded-2xl bg-white shadow-md py-5 md:py-10">
        <div className="flex-col flex md:flex-row gap-5 px-2 md:px-10 justify-center items-center">
          <img
            className="w-[100px] h-[100px] md:h-[180px] rounded-full object-cover md:w-[180px] border"
            src={user?.photoURL}
            alt="user Image"
          />
          <div>
            <h2 className="text-xl gap-3 flex items-center font-medium md:text-2xl">
              <span className="text-primary text-xl"><FaCircleUser /></span> {user?.displayName || "User Name"}
            </h2>
            <p className="md:text-md flex text-slate-600 items-center gap-2"><span className="text-primary"><BiSolidEnvelope /></span> {user?.email || "User Email"}</p>
            <p className="px-3 mt-2 py-[2px] bg-primary text-white w-fit rounded-full text-xs text-center ">Organizer</p>
            <button
              onClick={() => setIsShow(true)}
              className="bg-primary hover:bg-secondary rounded px-3 py-1 mt-5 text-white inline-block mx-auto w-fit text-center"
            >
              {" "}
              Update Profile
            </button>
          </div>
        </div>

        {isShow && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-lg font-bold">Edit Your Profile</h3>
                <button
                  onClick={() => setIsShow(false)}
                  className="text-gray-500 text-2xl hover:text-gray-700"
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="mt-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={`col-span-12 md:col-span-7 w-full md:w-10/12 py-10 flex flex-col justify-center items-center mx-auto min-h-[200px]`}
                >
                  <div className="grid gap-5 mx-5 grid-cols-1">
                    <div>
                      <label className=" mb-2 font-semibold" htmlFor="name">
                        User Name:
                      </label>
                      <input
                        className="p-2 w-full bg-slate-100 border outline-none"
                        type="text"
                        {...register("name")}
                        placeholder="Your Name"
                        name="name"
                        required
                      />
                    </div>
                    <div>
                      <label className=" mb-2 font-semibold" htmlFor="image">
                        Profile Image:
                      </label>
                      <div className="relative">
                        <input
                          className="p-2 w-full bg-slate-100 border outline-none"
                          type="file"
                          {...register("image")}
                          name="image"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className={`bg-primary hover:bg-secondary text-white duration-150 w-fit block mx-auto px-4 py-2 rounded mt-8`}
                    >
                      Update Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AdminHome;
