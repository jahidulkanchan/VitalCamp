import { FaCampground } from "react-icons/fa6";
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { GrAnalytics } from "react-icons/gr";
import { FaRegListAlt, FaUserAlt } from "react-icons/fa";
import { MdManageAccounts, MdPayment } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const {pathname} = useLocation()
  const [isAdmin] = useAdmin();
  return (
    <>
      <section className="flex xl:container mx-auto">
        {/* Sidebar */}
        <div className="min-h-screen bg-primary dark:bg-darkBg">
          <div className="side-bar sticky pt-2 top-0 w-fit lg:w-[250px] border-r border-gray-200 dark:border-gray-700">
            <ul className="mt-8 text-sm space-y-3 font-medium">
              {/* Logo */}
              <li className="bg-slate-50 dark:bg-darkCard rounded-md mx-2 px-2 py-1">
                <Link className="logo flex items-center" to="/">
                  <img referrerPolicy="no-referrer" className="h-[20px] md:h-[30px]" src="/VitalCamp.png" alt="VitalCamp logo" />
                  <h3 className="text-xl font-medium md:font-semibold ml-2">
                    <span className="text-primary dark:text-secondary hidden lg:inline-block">VitalCamp</span>
                  </h3>
                </Link>
              </li>

              {/* Admin Links */}
              {isAdmin ? (
                <>
                  <NavLink
                    to="/dashboard/adminHome"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive && pathname === '/dashboard/adminHome'
                          ? 'bg-primary dark:bg-secondary text-white'
                          : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <FaUserAlt className="text-lg" />
                    <span className="hidden lg:inline-block">Organizer Profile</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/addCamp"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive ? 'bg-primary dark:bg-secondary text-white' : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <GiCampingTent className="text-lg" />
                    <span className="hidden lg:inline-block">Add A Camp</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageCamp"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive ? 'bg-primary dark:bg-secondary text-white' : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <MdManageAccounts className="text-lg" />
                    <span className="hidden lg:inline-block">Manage Camps</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageRegiCamp"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive ? 'bg-primary dark:bg-secondary text-white' : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <FaRegListAlt className="text-lg" />
                    <span className="hidden lg:inline-block">Manage Registered Camps</span>
                  </NavLink>
                </>
              ) : (
                <>
                  {/* User Links */}
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive ? 'bg-primary dark:bg-secondary text-white' : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <GrAnalytics className="text-lg" />
                    <span className="hidden lg:inline-block">Analytics</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/userHome"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive && pathname === '/dashboard/userHome'
                          ? 'bg-primary dark:bg-secondary text-white'
                          : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <FaUserAlt className="text-lg" />
                    <span className="hidden lg:inline-block">Participant Profile</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/regiteredCamps"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive ? 'bg-primary dark:bg-secondary text-white' : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <FaCampground className="text-lg" />
                    <span className="hidden lg:inline-block">Registered Camps</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={({ isActive }) =>
                      `flex justify-center lg:justify-start rounded-md mx-2 p-3 gap-3 items-center transition-colors ${
                        isActive ? 'bg-primary dark:bg-secondary text-white' : 'bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`
                    }>
                    <MdPayment className="text-lg" />
                    <span className="hidden lg:inline-block">Payment History</span>
                  </NavLink>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content bg-slate-50 dark:bg-darkBg overflow-y-auto w-full md:px-5">
          <ScrollRestoration />
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Dashboard;