
import LoginImg from "../../assets/login.svg";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import GoogleSign from "../../shared/GooleSign";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUp = () => {
  const {signUpUser,setUser,updateUserProfile} = useAuth()
  const [isShow,setIsShow] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {name,photo,email, password } = data;
    const regex = /^.{6}$/;
    if (!regex.test(password)) {
      return setErrorMessage(
        "Password must be exactly 6 characters."
      );
    }
    signUpUser(email, password)
    .then((result)=> {
      setErrorMessage('')
      const user = result.user;
      updateUserProfile(name,photo)
      .then(async()=> {
        const userInfo = {
          ...user,
          name, 
          email,
          role: 'user'
        }
        setUser(userInfo)
        toast.success('Registration completed successfully!')
        await axiosPublic.post(`/users/${email}`, userInfo )
        navigate('/')
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
    })
    .catch(err =>{
      setErrorMessage(err.message)
    })
  };
  return (
    <>
      <section
        className={`container px-2 mx-auto pb-10 pt-[30px] min-h-[600px]`}
      >
        <h2 className="text-3xl text-center font-semibold md:mb-5">
          <span>Register </span>
          <span
            style={{
              textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
            }}
            className="text-secondary"
          >
            Now
          </span>
        </h2>
        <div className="grid items-center grid-cols-12">
          <div className="col-span-12 md:col-span-5">
            <img src={LoginImg} alt="" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-span-12 md:col-span-7 w-full md:w-10/12 py-10 flex flex-col justify-center items-center border shadow-md mx-auto min-h-[350px]"
          >
            <div className="grid gap-2 mx-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 font-semibold" htmlFor="name">
                  Name:
                </label>
                <input
                  className="p-2 w-full bg-slate-100 border outline-none"
                  type="text"
                  placeholder="User Name"
                  {...register("name", { required: true })}
                />
                 {errors.name && <span className="text-red-400">This field is required</span>}
              </div>
              <div>
                <label className="mb-2 font-semibold" htmlFor="photo">
                  Photo URL:
                </label>
                <input
                  className="p-2 w-full bg-slate-100 border outline-none"
                  type="text"
                  placeholder="Photo URL"
                  {...register("photo", { required: true })}
                />
                 {errors.photo && <span className="text-red-400">This field is required</span>}
              </div>
              <div>
                <label className="mb-2 font-semibold" htmlFor="email">
                  Email Address:
                </label>
                <input
                  className="p-2 w-full bg-slate-100 border outline-none"
                  type="email"
                  placeholder="Your Email"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-400">This field is required</span>}
              </div>
              <div className="relative">
                <label className="mb-2 font-semibold" htmlFor="password">
                  Password:
                </label>
                <input
                  className="p-2 w-full bg-slate-100 border outline-none"
                  type={isShow? 'text' : 'password'}
                  placeholder="Password"
                  {...register("password", { 
                    required: "This field is required",
                   })}
                />
                <span onClick={()=>setIsShow(!isShow)} className="absolute p-1 cursor-pointer right-3 top-[32px]">
                  {isShow ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && <span className="text-red-400">
                  {errors.password?.message}
                </span>}
              </div>
            </div>
            <button className="bg-primary  text-white duration-150 w-fit block mx-auto font-semibold px-8 py-2 rounded mt-8">
              Sign Up
            </button>
            {errorMessage && <p className="text-red-500 text-center text-sm mt-4" >{errorMessage}</p>}
            <p className="mt-5 text-center text-slate-500">
              If you have already an account please{" "}
              <Link to="/login" className="text-primary">
                Log In
              </Link>
            </p>
            <GoogleSign/>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;