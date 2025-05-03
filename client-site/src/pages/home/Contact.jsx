import toast from "react-hot-toast";
import { BsEnvelope } from "react-icons/bs";
import { IoMdPaperPlane, IoMdPhonePortrait } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const Contact = () => {
  const toastMessage = (e)=>{
    e.preventDefault();
    e.target.reset()
    setTimeout(()=>{
      toast.success('Message sent successfully');
    }, 300)
  }
  return (
    <>
      <section className="container py-12 md:py-16 min-h-[500px] mx-auto px-4 md:px-6 max-w-6xl dark:bg-darkBg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-darkLight mb-3">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content - Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-white mb-2">Ask whatever you have</h2>
              <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-primary to-secondary w-fit text-transparent bg-clip-text">in your mind now</h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">Have questions or ready to discuss your healthcare needs? We&apos;re here to assist you. Get in touch with us today!</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-darkCard rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BsEnvelope className="text-primary text-xl" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">contact@adtask.ai</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white dark:bg-darkCard rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-primary/10 rounded-full">
                  <IoMdPhonePortrait className="text-primary text-xl" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">(969) 819-8061</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white dark:bg-darkCard rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-primary/10 rounded-full">
                  <IoLocationOutline className="text-primary text-xl" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">San Francisco Bay Area</span>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-white dark:bg-darkCard p-6 md:p-8 rounded-xl shadow-lg">
            <form onSubmit={toastMessage} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white dark:bg-gray-800"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white dark:bg-gray-800"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white dark:bg-gray-800"
                  required></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full justify-center">
                Send Message
                <IoMdPaperPlane className="text-lg" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
