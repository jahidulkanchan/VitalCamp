import toast from 'react-hot-toast';
import subscribePlane from '../../assets/paper-plane.webp'
import { IoMdPaperPlane } from 'react-icons/io';
const Subscribe = () => {
  const toastMessage = (e)=>{
    e.preventDefault();
    e.target.reset()
    toast.success('Successfully subscribed!');
  }
  return (
    <>
      <section className="container py-12 lg:py-16 grid gap-8 md:grid-cols-2 px-4 md:px-6 mx-auto max-w-6xl dark:bg-darkBg">
        {/* Left Content - Image */}
        <div className="relative flex items-center justify-center z-10">
          {/* Animated gradient background */}
          <div className="absolute w-[250px] h-[250px] blur-3xl rounded-full bg-primary/30 dark:bg-primary/20 right-0 md:right-20 top-1/2 -translate-y-1/2 -z-[1] animate-pulse-slow"></div>

          {/* Image with hover effect */}
          <div className="relative group w-full max-w-[400px]">
            <img src={subscribePlane} alt="Paper plane illustration for subscription" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-darkLight mb-3">Stay Updated!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 lg:w-11/12">Subscribe for updates on upcoming medical camps, health tips, and important notifications!</p>
          </div>

          <form className="space-y-4 lg:w-11/12" onSubmit={toastMessage}>
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 md:p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all bg-white dark:bg-darkCard text-gray-800 dark:text-gray-200"
                required
              />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 md:p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all bg-white dark:bg-darkCard text-gray-800 dark:text-gray-200"
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 mt-4">
              Subscribe Now
              <IoMdPaperPlane className="text-lg" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Subscribe;