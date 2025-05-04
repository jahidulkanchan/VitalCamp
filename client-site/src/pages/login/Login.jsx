import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginImg from '../../assets/login.svg';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { useEffect, useRef, useState } from "react";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import GoogleSign from '../../shared/GooleSign';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser, setUser } = useAuth();
  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success('Login successful');
          setUser(user);
          reset();
          navigate(location.state || '/');
          window.scrollTo(0, 0);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <>
      <section className="container px-4 mx-auto pb-10 pt-5 min-h-[600px]">
        <h2 className="text-3xl font-semibold text-center md:mb-8 dark:text-darkLight">
          <span>Log In to </span>
          <span style={{ textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }} className="text-secondary">
            Your Account
          </span>
        </h2>

        <div className="grid items-center grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <img src={LoginImg} alt="Login Illustration" className="w-full max-w-md mx-auto" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="col-span-12 md:col-span-7 w-full md:w-10/12 py-10 px-6 md:px-10 bg-white dark:bg-darkCard shadow-lg rounded-lg mx-auto">
            <div className="grid gap-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-darkLight" htmlFor="email">
                  Email Address:
                </label>
                <input
                  type="email"
                  {...register('email')}
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded border bg-slate-100 dark:bg-[#1d1d1d] dark:text-white dark:border-gray-600 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-darkLight" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  {...register('password')}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full p-3 rounded border bg-slate-100 dark:bg-[#1d1d1d] dark:text-white dark:border-gray-600 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <button type="submit" className="bg-secondary hover:bg-primary text-white font-semibold px-10 py-3 rounded transition">
                Log In
              </button>

              {errorMessage && (
                <p className="text-red-500 mt-3 text-sm">
                  Something went wrong. <br /> Please check your email or password.
                </p>
              )}

              <p className="mt-6 text-sm text-slate-600 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-secondary hover:underline">
                  Register
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

export default Login;
