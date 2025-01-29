import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_host_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

const UpdateCamp = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const {data: singleCamp={}} = useQuery({
    queryKey:['updateItem', id],
    queryFn: async()=>{
      const {data} = await axiosSecure.get(`/updateCamp/${id}`)
      return data
    }
  })
  const {campName,campFees,location,healthCareName,description} = singleCamp;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(()=>{
    if(singleCamp){
      setValue("campName", campName)
      setValue("campFees", campFees)
      setValue("healthCareName", healthCareName)
      setValue("location", location)
      setValue("description", description)
    }
  },[singleCamp])
  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data?.image[0] };
    const res = await axiosPublic.post(image_host_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data?.success) {
      const updateInfo = {
        campName: data.campName,
        image: res.data?.data?.display_url,
        campFees: parseInt(data.campFees),
        dateTime: data.dateTime,
        location: data?.location,
        healthCareName: data.healthCareName,
        description: data.description
      };
      const campResponse = await axiosSecure.put(`/updateCamp/${id}`, updateInfo);
      if (campResponse.data.modifiedCount > 0) {
        setLoading(false);
        navigate('/dashboard/manageCamp')
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Camp updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <>
       <section className="md:py-10">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`md:w-10/12 py-5 flex flex-col justify-center items-center border bg-cover bg-blue-700 bg-blend-overlay bg-opacity-40 bg-[url(https://img.freepik.com/premium-vector/vector-blue-simple-background-design_374216-67.jpg)] shadow-md mx-auto min-h-[350px]`}
          >
            <div className="grid gap-4 mx-5 sm:grid-cols-2">
              {/* Camp Name */}
              <div className="col-span-2 sm:col-span-1">
                <label className=" mb-2 font-semibold" htmlFor="campName">
                  Camp Name:<span className="text-red-500">**</span>
                </label>
                <br />
                <input
                  {...register("campName")}
                  className="p-2 w-full bg-white border outline-none"
                  type="text"
                  placeholder="Name of Camp"
                  name="campName"
                  defaultValue={campName}
                />
              </div>
              {/* Image input */}
              <div className="col-span-2 sm:col-span-1">
                <label className=" mb-2 font-semibold" htmlFor="image">
                  Choose a Image<span className="text-red-500">**</span>
                </label>
                <input
                  className="p-2 w-full bg-white border outline-none"
                  {...register("image")}
                  type="file"
                  name="image"
                  id="image"
                  required
                />
              </div>
              {/* Camp Fees */}
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-2 font-semibold" htmlFor="campFees">
                  Camp Fees:<span className="text-red-500">**</span>
                </label>
                <br />
                <input
                  {...register("campFees")}
                  className="p-2 w-full bg-white border outline-none"
                  type="number"
                  placeholder="Camp Fees"
                  name="campFees"
                  defaultValue={campFees}
                />
              </div>
              {/* Camp location */}
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-2 font-semibold" htmlFor="location">
                  Location Name:<span className="text-red-500">**</span>
                </label>
                <br />
                <input
                  {...register("location")}
                  className="p-2 w-full bg-white border outline-none"
                  type="text"
                  placeholder="location"
                  name="location"
                  defaultValue={location}
                />
              </div>
              {/* Date & Time */}
              <div>
                <label
                  htmlFor="dateTime"
                  className="block text-sm font-medium mb-1"
                >
                  Date & Time<span className="text-red-500">**</span>
                </label>
                <input
                  id="dateTime"
                  type="datetime-local"
                  placeholder="Date & Time"
                  {...register("dateTime", {
                    required: "Date & Time are required",
                  })}
                  className="w-full min-w-[250px] border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
                />
                {errors.dateTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateTime.message}
                  </p>
                )}
              </div>
              {/* Professional Name */}
              <div className="col-span-2 sm:col-span-1">
                <label className=" mb-2 font-semibold" htmlFor="healthCareName">
                  Healthcare Professional Name
                  <span className="text-red-500">**</span>
                </label>
                <br />
                <input
                  {...register("healthCareName")}
                  className="p-2 w-full bg-white border outline-none"
                  type="text"
                  placeholder="Healthcare Name"
                  name="healthCareName"
                  defaultValue={healthCareName}
                />
              </div>
              <div className="col-span-2">
                <label className=" mb-2 font-semibold" htmlFor="description">
                  Description:<span className="text-red-500">**</span>
                </label>
                <br />
                <textarea
                  {...register("description")}
                  className="p-2 w-full h-[120px] md:h-[150px] bg-white border outline-none"
                  name="description"
                  id="description"
                  defaultValue={description}
                ></textarea>
              </div>
            </div>
            <br />
            <div>
              <button
                disabled={loading}
                className="hover:shadow-lg duration-150 bg-primary w-full px-5 py-2 text-white"
              >
                {loading ? (
                  <img className="w-[50px]" src="/spinner.gif" />
                ) : (
                  "Update Camp"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateCamp;