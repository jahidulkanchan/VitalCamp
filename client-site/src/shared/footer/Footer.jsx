import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";




const Footer = () => {
  const {user} = useAuth()
  return (
    <footer className={`container mx-auto px-4 md:px-6 py-10 border-t border-gray-200 dark:border-gray-700 dark:bg-darkBg`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <Link className="flex items-center group" to="/">
            <img referrerPolicy="no-referrer" className="h-8 md:h-10 mr-3 group-hover:scale-105 transition-transform" src="/VitalCamp.png" alt="VitalCamp logo" />
            <h3 className="text-2xl md:text-3xl font-medium">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text group-hover:bg-gradient-to-l transition-all duration-500">VitalCamp</span>
            </h3>
          </Link>

          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            Sharing valuable insights and stories on Health, Wellness, Medical Services, Camp Coordination, and Volunteer Experiences to inspire and connect participants and organizers through
            high-quality content.
          </p>

          <div className="flex space-x-5 text-xl text-gray-500 dark:text-gray-400">
            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary hover:-translate-y-1 transition-all duration-300">
              <FaFacebookSquare />
            </Link>
            <Link to="https://bd.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary hover:-translate-y-1 transition-all duration-300">
              <FaLinkedin />
            </Link>
            <Link to="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary hover:-translate-y-1 transition-all duration-300">
              <FaTwitterSquare />
            </Link>
          </div>
        </div>

        {/* Features Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-darkLight mb-3">Features</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="text-gray-600 dark:text-gray-300 hover:text-secondary hover:translate-x-2 inline-block transition-all duration-300 text-sm md:text-base">
                Home
              </Link>
            </li>
            <li>
              <Link to="/availableCamp" className="text-gray-600 dark:text-gray-300 hover:text-secondary hover:translate-x-2 inline-block transition-all duration-300 text-sm md:text-base">
                Available Camps
              </Link>
            </li>
            {!user && (
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-secondary hover:translate-x-2 inline-block transition-all duration-300 text-sm md:text-base">
                  Join Us
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Popular HealthCare */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-darkLight mb-3">Popular HealthCare</h2>
          <ul className="space-y-3">
            {[
              { name: 'Healthline', url: 'https://www.healthline.com' },
              { name: 'WebMD', url: 'https://www.webmd.com' },
              { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org' },
              { name: 'Medical News Today', url: 'https://www.medicalnewstoday.com' },
              { name: 'CDC', url: 'https://www.cdc.gov' },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-secondary hover:translate-x-2 inline-block transition-all duration-300 text-sm md:text-base">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">&copy; {new Date().getFullYear()} VitalCamp. All Rights Reserved. Designed by JK.</p>
      </div>
    </footer>
  );
};

export default Footer;