import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SlideItem = ({bannerBg,headline,describe}) => {
  return (
    <>
      <section>
        <div
          style={{ backgroundImage: `url(${bannerBg})` }}
          className="col-span-12 min-h-[500px] bg-no-repeat bg-cover flex justify-center items-end md:col-span-7 lg:col-span-8"
        >
          <div className="bg-black relative overflow-hidden bg-blend-overlay backdrop-blur-sm w-full bg-opacity-60 py-5 px-2">
            <p className="absolute blaze -top-[180px] w-[70px] h-[700px] blur-xl -z-[2] bg-[#c2c2c2ee] rotate-45"></p>
            <h2 className="text-2xl text-slate-50 md:text-3xl lg:text-5xl font-medium mb-2">{headline}</h2>
            <h4 className="text-sm md:w-2/3 text-slate-100">{describe}</h4><br />
            <Link to='/availableCamp' className="bg-primary text-white px-5 py-2 rounded-full">View More</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideItem;
