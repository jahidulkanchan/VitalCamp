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
      <section className="container py-5 md:py-10 min-h-[400px] mx-auto px-2 md:px-5">
        <h2 className="text-center py-5 text-2xl md:text-4xl mb-4">
          Get In Touch
        </h2>
        <div className="grid justify-center md:grid-cols-2">
          <div className="left-content relative">
            <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
              Ask whatever you have
            </h2>
            <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-primary
             to-secondary w-fit text-transparent bg-clip-text">
              in your mind now
            </h2>
            <p className="my-5 lg:w-4/5 text-gray-800">
            Have questions or ready to discuss your healthcare needs? We&apos;re here to assist you. Get in touch with us today!
            </p>
            <p className="flex gap-2 items-center">
            <BsEnvelope className="text-primary" />
              <span className="text-sm text-gray-800">contact@adtask.ai</span>
            </p>
            <p className="flex gap-2 items-center mt-3">
            <IoMdPhonePortrait className="text-primary" />
              <span className="text-sm text-gray-800">(969) 819-8061</span>
            </p>
            <p className="flex gap-2 items-center mt-3">
            <IoLocationOutline className="text-primary" />
              <span className="text-sm text-gray-800">
                San Francisco Bay Area
              </span>
            </p>
          </div>
          <div className="right-content mt-10 md:mt-0">
            <form onSubmit={toastMessage}>
              <div className="input-item">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="outline-none p-2 w-full border border-primary rounded-md my-2"
                />
              </div>
              <div className="input-item">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="outline-none p-2 w-full border border-primary rounded-md my-2"
                />
              </div>
              <div className="input-item">
                <label htmlFor="name">Message</label>
                <br />
                <textarea
                  className="outline-none p-2 border w-full border-primary rounded-md my-2"
                  name="textarea"
                  id="textarea"
                  rows="5"
                ></textarea>
              </div>
              <button
                type="submit"
                className="py-1.5 px-3 flex items-center gap-2 bg-primary text-white mt-4 ml-auto w-fit rounded-md">
                Submit<span><IoMdPaperPlane /></span>{" "}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
