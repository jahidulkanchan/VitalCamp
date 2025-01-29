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
        <div className="min-h-screen bg-primary">
        <div className="side-bar  sticky pt-2 top-0 w-fit lg:w-[250px] border-r ">
          <ul className="mt-8 text-sm space-y-5 font-medium">
            <li className="bg-slate-50 rounded-md mx-2 px-2 py-1"><Link className={`logo flex items-center`} to="/">
            <img referrerPolicy="no-referrer"  className="h-[20px] md:h-[30px]" src='/VitalCamp.png' alt="logo" />
            <h3 className="text-xl font-medium md:font-semibold">
              <span className="text-primary hidden lg:inline-block">VitalCamp</span>
            </h3>
          </Link></li>
            {
              isAdmin ? <>
                <li><NavLink className={({isActive})=> `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive && pathname === '/dashboard/adminHome' ? 'bg-primary border text-white' : 'bg-slate-100'}`} to='/dashboard/adminHome'><FaUserAlt /><span className="hidden lg:inline-block">Organizer Profile</span></NavLink></li>
                <li><NavLink className={({ isActive }) => `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive ? 'bg-primary border text-white' : 'bg-slate-100 '}`
                } to='/dashboard/addCamp'><span><GiCampingTent /></span><span className="hidden lg:inline-block">Add A Camp</span></NavLink>
                </li>
                <li><NavLink className={({ isActive }) => `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive ? 'bg-primary border text-white' : ' bg-slate-100'}`
                } to='/dashboard/manageCamp'><span><MdManageAccounts /></span>
                <span className="hidden lg:inline-block">Manage Camps</span></NavLink>
                </li>
                <li><NavLink className={({ isActive }) => `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive ? 'bg-primary border text-white' : 'bg-slate-100'}`
                } to='/dashboard/manageRegiCamp'><span><FaRegListAlt /></span>
                <span className="hidden lg:inline-block">Manage Registered Camps</span></NavLink>
                </li>
              </> : 
              <>
                <li><NavLink className={({ isActive }) => `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive ? 'bg-primary border text-white' : 'bg-slate-100'}`
                } to='/dashboard/analytics'><span><GrAnalytics /></span><span className="hidden lg:inline-block">Analytics</span></NavLink>
                </li>
                <li><NavLink className={({isActive})=> `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive && pathname === '/dashboard/userHome' ? 'bg-primary border text-white' : 'bg-slate-100'}`} to='/dashboard/userHome'><FaUserAlt /><span className="hidden lg:inline-block">Participant Profile</span> </NavLink></li>
                
                <li><NavLink className={({ isActive }) => `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive ? 'bg-primary border text-white' : 'bg-slate-100'}`
                } to='/dashboard/regiteredCamps'><span><FaCampground /></span><span className="hidden lg:inline-block">Registered Camps</span></NavLink>
                </li>
                <li><NavLink className={({ isActive }) => `flex justify-center lg:justify-start rounded-md mx-2 p-2 gap-2 items-center ${isActive ? 'bg-primary border text-white' : 'bg-slate-100'}`
                } to='/dashboard/paymentHistory'><span><MdPayment /></span><span 
                className="hidden lg:inline-block">Payment History</span></NavLink>
                </li>
              </>
            }
          </ul>
        </div>
        </div>
        <div className="dashboard-content bg-slate-50 overflow-y-auto w-full md:px-5">
          <ScrollRestoration/>
          <Outlet/>
        </div>
      </section>
    </>
  );
};

export default Dashboard;