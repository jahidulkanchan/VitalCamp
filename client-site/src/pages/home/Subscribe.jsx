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
      <section className='container py-5 lg:py-10 grid gap-5 md:grid-cols-2 px-2 md:px-5 mx-auto'>
        <div className="left-content z-10 relative p-5">
          <p className='absolute w-[200px] h-[200px] blur-3xl rounded-full bg-primary right-[0px] md:right-[100px]  mx-auto -top-[30px] md:top-0 -z-[2]'></p>
          <img src={subscribePlane} alt="subscribePng" />
        </div>
        <div className="right-content">
          <h2 className='text-3xl md:text-4xl font-medium mb-2 md:mb-0'>Subscribe!</h2>
          <p className='lg:w-10/12 text-gray-800'>Subscribe for updates on upcoming medical camps, health tips, and important notifications!</p>
          <form className='mt-2 lg:w-10/12 md:mt-5' onSubmit={toastMessage}>
            <input type="text" placeholder='Name' className='p-2 mt-2 w-full rounded-md border border-primary outline-none' required />
            <input type="email" placeholder='Enter Your Email' className='p-2 mt-4 w-full rounded-md border border-primary outline-none' required /><br />
            <button
              type='submit'
             className='py-1.5 px-3 flex items-center gap-2 bg-primary text-white mt-4 mr-auto w-fit rounded-md
            '>Send <span><IoMdPaperPlane /></span> </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Subscribe;