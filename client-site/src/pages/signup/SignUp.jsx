import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LoginImg from '../../assets/login.svg';
import { useAuth } from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import GoogleSign from '../../shared/GooleSign';

const SignUp = () => {
  const { signUpUser, setUser, updateUserProfile } = useAuth();
  const [isShow, setIsShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, photo, email, password } = data;
    const regex = /^.{6}$/;
    if (!regex.test(password)) {
      return setErrorMessage('Password must be exactly 6 characters.');
    }
    signUpUser(email, password)
      .then((result) => {
        setErrorMessage('');
        const user = result.user;
        updateUserProfile(name, photo)
          .then(async () => {
            const userInfo = {
              ...user,
              name,
              email,
              role: 'user',
            };
            setUser(userInfo);
            toast.success('Registration completed successfully!');
            await axiosPublic.post(`/users/${email}`, userInfo);
            navigate('/');
          })
          .catch((err) => {
            setErrorMessage(err.message);
          });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  return (
    <>
      <section className="container px-4 mx-auto pb-10 pt-8 min-h-[600px]">
        <h2 className="text-3xl font-semibold text-center mb-8 dark:text-darkLight">
          <span>Register </span>
          <span style={{ textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }} className="text-secondary">
            Now
          </span>
        </h2>

        <div className="grid items-center grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <img src={LoginImg} alt="Register Illustration" className="w-full max-w-md mx-auto" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="col-span-12 md:col-span-7 w-full md:w-10/12 bg-white dark:bg-darkCard shadow-lg rounded-lg py-10 px-6 md:px-10 mx-auto">
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700 dark:text-darkLight" htmlFor="name">
                  Name:
                </label>
                <input
                  className="p-3 w-full bg-slate-100 dark:bg-[#1d1d1d] dark:text-white border dark:border-gray-600 rounded outline-none"
                  type="text"
                  placeholder="User Name"
                  {...register('name', { required: true })}
                />
                {errors.name && <span className="text-red-400 text-sm">This field is required</span>}
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700 dark:text-darkLight" htmlFor="photo">
                  Photo URL:
                </label>
                <input
                  className="p-3 w-full bg-slate-100 dark:bg-[#1d1d1d] dark:text-white border dark:border-gray-600 rounded outline-none"
                  type="text"
                  placeholder="Photo URL"
                  {...register('photo', { required: true })}
                />
                {errors.photo && <span className="text-red-400 text-sm">This field is required</span>}
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700 dark:text-darkLight" htmlFor="email">
                  Email Address:
                </label>
                <input
                  className="p-3 w-full bg-slate-100 dark:bg-[#1d1d1d] dark:text-white border dark:border-gray-600 rounded outline-none"
                  type="email"
                  placeholder="Your Email"
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="text-red-400 text-sm">This field is required</span>}
              </div>

              <div className="relative">
                <label className="mb-2 block font-semibold text-gray-700 dark:text-darkLight" htmlFor="password">
                  Password:
                </label>
                <input
                  className="p-3 w-full bg-slate-100 dark:bg-[#1d1d1d] dark:text-white border dark:border-gray-600 rounded outline-none"
                  type={isShow ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password', {
                    required: 'This field is required',
                  })}
                />
                <span onClick={() => setIsShow(!isShow)} className="absolute p-1 cursor-pointer right-3 top-[42px] text-gray-500 dark:text-gray-300">
                  {isShow ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
              </div>
            </div>

            <div className="text-center mt-8">
              <button type="submit" className="bg-primary hover:bg-secondary text-white font-semibold px-8 py-3 rounded duration-150">
                Sign Up
              </button>

              {errorMessage && <p className="text-red-500 text-center text-sm mt-4">{errorMessage}</p>}

              <p className="mt-5 text-sm text-slate-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Log In
                </Link>
              </p>

              <div className="mt-5">
                <GoogleSign />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
