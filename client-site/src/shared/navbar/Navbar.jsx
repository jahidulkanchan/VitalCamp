import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoIcon from "/VitalCamp.png"
import { useAuth } from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { IoNotificationsOutline } from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Notification from "../../components/Notification";
import { MdOutlineArrowDropDown } from "react-icons/md";
import ThemeToggle from "../../components/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate()
  const [isAdmin] =useAdmin()
  const axiosSecure = useAxiosSecure()
  const {user,signOutUser} =useAuth()
  const [isShowNotifation,setIsShowNotifation] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
 const handleToggleUser = () => {
    setIsHidden(!isHidden);
    setIsShow(false);
    setIsShowNotifation(false);
  };

  const handleToggleBar = () => {
    setIsShow(!isShow);
    setIsHidden(true);
    setIsShowNotifation(false); 
  };

  const handleToggleNotification = () => {
    setIsShowNotifation(!isShowNotifation);
    setIsHidden(true);
    setIsShow(false);
  };
  const handleSignOutUser = ()=>{
    signOutUser()
    navigate('/')
    window.scrollTo(0, 0)
  }
  // Show notification data =========
  const {data: notifications=[]} = useQuery({
    queryKey: ['notifications', user?.email],
    queryFn: async()=>{
      const res = await axiosSecure.get(`notification/${user?.email}`)
      return res.data
    }
  })
  return (
    <>
      <section className="shadow fixed left-0 w-full z-20 top-0 bg-slate-50 dark:bg-slate-900 py-5">
        <div className="container relative px-2 md:px-5 mx-auto">
          <nav className="flex justify-between items-center">
            <div>
              <Link className="logo flex items-center" to="/">
                <img referrerPolicy="no-referrer" className="h-[30px] object-cover md:h-[40px] mr-2" src={logoIcon} alt="logo" />
                <h3 className="text-xl md:text-2xl font-medium md:font-semibold text-black dark:text-white">
                  <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">VitalCamp</span>
                </h3>
              </Link>
            </div>

            {/* Menu section */}
            <div className="menu lg:bg-white dark:lg:bg-slate-800 lg:shadow-sm lg:px-5 md:py-2 lg:rounded-md">
              <ul
                className={`lg:flex w-fit text-sm text-left z-10 py-5 lg:py-0 lg:bg-transparent space-y-5 lg:space-y-0 px-5 -right-3 mx-auto absolute lg:static flex-col justify-start lg:flex-row gap-5 items-start top-[55px] md:top-[63px] ${
                  isShow ? 'block bg-white dark:bg-slate-800' : 'hidden'
                }`}>
                <li
                  onClick={() => {
                    setIsShow(!isShow);
                    window.scrollTo(0, 0);
                  }}>
                  <NavLink className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-100 flex items-center gap-1`} to="/">
                    Home
                  </NavLink>
                </li>
                <li
                  onClick={() => {
                    setIsShow(!isShow);
                    window.scrollTo(0, 0);
                  }}>
                  <NavLink className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-100 flex items-center gap-1`} to="/availableCamp">
                    Available Camps
                  </NavLink>
                </li>
                {!user && (
                  <li
                    onClick={() => {
                      setIsShow(!isShow);
                      window.scrollTo(0, 0);
                    }}>
                    <NavLink className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-100 flex items-center gap-1`} to="/login">
                      Join Us
                    </NavLink>
                  </li>
                )}
              </ul>

              {/* Dropdown user menu */}
              {user && (
                <div className={`flex-col bg-white dark:bg-slate-800 border dark:border-slate-600 px-5 absolute w-fit right-0 top-[60px] py-3 gap-5 items-center ${!isHidden ? 'flex' : 'hidden'}`}>
                  <div className="flex justify-center flex-col items-center">
                    <ul className="space-y-1 text-black dark:text-white">
                      <li>{user?.displayName}</li>
                      <li>{isAdmin ? <Link to="/dashboard/adminHome">Dashboard</Link> : <Link to="/dashboard/analytics">Dashboard</Link>}</li>
                      <li>
                        <button
                          onClick={() => {
                            handleSignOutUser();
                            setIsHidden(!isHidden);
                          }}
                          className="text-sm font-medium">
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Right icons */}
            <div className="bar-icon flex justify-center items-center gap-2 sm:gap-4 ml-1 z-20 text-xl">
              <div className="theme-btn">
                <ThemeToggle />
              </div>
              {user && (
                <>
                  <div
                    title="Profile Details"
                    onClick={() => handleToggleUser()}
                    className="w-fit flex items-center gap-0 justify-between border border-primary overflow-hidden cursor-pointer rounded-full bg-slate-50 dark:bg-slate-700 px-2">
                    <img className="min-h-[30px] w-8" src={user?.photoURL} alt="profilePhoto" />
                    <span>
                      <MdOutlineArrowDropDown />
                    </span>
                  </div>

                  {!isAdmin && (
                    <button onClick={() => handleToggleNotification()} className="relative md:text-xl mr-4">
                      <IoNotificationsOutline className={`${isShowNotifation ? 'text-primary' : 'text-black dark:text-white'}`} />
                      <span className="text-[10px] min-w-[20px] flex justify-center items-center h-[20px] w-fit font-medium md:font-bold bg-primary text-white rounded-full border absolute -top-2 -right-3">
                        {notifications.length}
                      </span>

                      {isShowNotifation && (
                        <div className="notification-content cursor-default w-[300px] flex flex-col items-center justify-center shadow-md py-8 bg-white dark:bg-slate-800 absolute top-[50px] -right-9">
                          <button
                            onClick={() => {
                              handleToggleUser();
                              setIsShowNotifation(!isShowNotifation);
                            }}
                            className="text-right px-1 absolute hover:text-primary top-2 right-2">
                            <RxCross2 />
                          </button>
                          {notifications.map((notification, index) => (
                            <Notification notification={notification} key={index} />
                          ))}
                          {notifications.length === 0 && <p className="text-sm text-black dark:text-white">Notifications is empty</p>}
                        </div>
                      )}
                    </button>
                  )}
                </>
              )}
              <div className={`${!isShow ? '' : 'text-secondary'} lg:hidden`} onClick={handleToggleBar}>
                {isShow ? <RxCross1 /> : <FaBarsStaggered />}
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default Navbar;