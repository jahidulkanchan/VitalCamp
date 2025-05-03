import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <section className="mt-[75px] dark:bg-darkBg md:mt-[80px]">
        <ScrollRestoration />
        <Outlet></Outlet>
      </section>
      <Footer />
    </>
  );
};

export default MainLayout;
