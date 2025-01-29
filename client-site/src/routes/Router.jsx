import { createBrowserRouter, Link} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../pages/dashboard/AdminHome";
import UserHome from "../pages/dashboard/UserHome";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddCamp from "../pages/dashboard/AddCamp";
import ManageCamp from "../pages/dashboard/ManageCamp";
import ManageRegiCamp from "../pages/dashboard/ManageRegiCamp";
import AvailableCamp from "../pages/availableCamp/AvailableCamp";
import ProtectLogin from "./ProtectLogin";
import UpdateCamp from "../pages/dashboard/UpdateCamp";
import DetailsPage from "../shared/detailsPage/DetailsPage";
import RegistareCamp from "../pages/dashboard/RegistareCamp";
import Analytics from "../pages/dashboard/Analytics";
import PaymentHistory from "../pages/dashboard/PaymentHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: 'availableCamp',
        element: <AvailableCamp />,
      },
      {
        path: 'login',
        element: <ProtectLogin><Login /></ProtectLogin>,
      },
      {
        path: 'signup',
        element: <ProtectLogin><SignUp/></ProtectLogin>,
      },
      {
        path: 'details/:id',
        element: <DetailsPage/>
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // Admin or Organizer Route
      {
        path: 'adminHome',
        element: <PrivateRoute><AdminRoute><AdminHome /></AdminRoute></PrivateRoute>,
      },
      {
        path: 'addCamp',
        element: <PrivateRoute><AdminRoute><AddCamp/></AdminRoute></PrivateRoute>,
      },
      {
        path: 'manageCamp',
        element: <PrivateRoute><AdminRoute><ManageCamp/></AdminRoute></PrivateRoute>,
      },
      {
        path: 'updateCamp/:id',
        element: <PrivateRoute><AdminRoute><UpdateCamp/></AdminRoute></PrivateRoute>,
      },
      {
        path: 'manageRegiCamp',
        element: <AdminRoute><ManageRegiCamp/></AdminRoute>
      },
      // User or Participant Route ==========
      {
        path: 'userHome',
        element: <UserHome />,
      },
      {
        path: 'regiteredCamps',
        element: <RegistareCamp />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory
         />,
      }
    ],
  },
  {
    path: '*',
    element: <div className="min-h-screen flex flex-col justify-center items-center">
      <img src="/Error-404.webp" alt="Error" />
      <Link className="bg-slate-300 px-5 py-1 mt-3" to='/'>Go Back</Link>
    </div>,
  },
]);
