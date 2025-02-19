import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";




const Footer = () => {
  const {user} = useAuth()
  return (
    <footer className={`container mx-auto px-2 border-t md:px-5 py-5`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
        <div className="col-span-2">
        <Link className={`logo flex items-center`} to="/">
                     <img referrerPolicy="no-referrer"  className="h-[30px] md:h-[40px] mr-2" src='/VitalCamp.png' alt="logo" />
                     <h3 className="text-xl md:text-2xl font-medium md:font-semibold">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">VitalCamp</span>
              </h3>
                    </Link>
        <p className="py-2 text-[15px] tracking-[.2px] sm:w-4/5">Sharing valuable insights and stories on Health, Wellness, Medical Services, Camp Coordination, and Volunteer Experiences to inspire and connect participants and organizers through high-quality</p>
        <p
        className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} All Rights Reserved. Designed by JK.
      </p>
        <ul className="flex gap-5 mb-5 mt-5 text-2xl">
          <Link className="hover:-translate-y-1 duration-200 hover:text-secondary" to='https://www.facebook.com/'><FaFacebookSquare /></Link>
          <Link className="hover:-translate-y-1 duration-200 hover:text-secondary" to='https://bd.linkedin.com/'><FaLinkedin /></Link>
          <Link className="hover:-translate-y-1 duration-200 hover:text-secondary" to='https://x.com/'><FaTwitterSquare /></Link>
        </ul>
        <hr className="md:hidden" />
        </div>
        <div>
          <h2 
          className="text-xl md:text-2xl font-medium text-secondary mb-3">Features</h2>
          <ul className="space-y-1 text-[14px]">
            <li><Link onClick={()=> window.scrollTo(0,0)} className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/'>Home</Link></li>  
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/availableCamp'>Available Camps</Link></li>
            {!user && 
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/login'>Join Us</Link></li>
            }
          </ul>
        </div>
        <div className="col-span-1">
  <h2 className="text-xl md:text-2xl font-medium text-secondary mb-3">Popular HealthCare</h2>
  <ul className="space-y-1 text-[14px]">
    <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to="https://www.healthline.com" target="_blank" rel="noopener noreferrer">Healthline</Link></li>
    <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to="https://www.webmd.com" target="_blank" rel="noopener noreferrer">WebMD</Link></li>
    <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer">Mayo Clinic</Link></li>
    <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to="https://www.medicalnewstoday.com" target="_blank" rel="noopener noreferrer">Medical News Today</Link></li>
    <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to="https://www.cdc.gov" target="_blank" rel="noopener noreferrer">CDC (Centers for Disease Control and Prevention)</Link></li>
  </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;