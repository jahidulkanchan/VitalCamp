import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const PopularHealthCare = () => {
  const [popularHealth, setPopularHealth] = useState([]);
  useEffect(() => {
    fetch("/popularhealth.json")
      .then((res) => res.json())
      .then((data) => setPopularHealth(data));
  }, []);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768); // `768px` is the `md` breakpoint in Tailwind
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <section
        id="PopularHealth"
        className="px-2 py-8 lg:px-5 lg:py-10 md:w-10/12 mx-auto"
      >
      <h2 className="text-center dark:text-darkLight py-5 text-2xl md:text-4xl mb-4">Leading Medical Services</h2>
        <Marquee
          className="mb-2 md:mb-6"
          gradient={isMd}
          gradientColor="none"
          autoFill={true}
          speed={30}
        >
          {popularHealth.map((item, index) => (
            <div
              className="text-center group md:min-w-[150px] flex items-center px-5 py-1 md:py-5 gap-3 mx-2 bg-gradient-to-t from-primary to-blue-500 border border-secondary rounded"
              key={index}
            >
              <p className="text-white md:text-xl font-light md:font-medium">{item.name}</p>
            </div>
          ))}
        </Marquee>
      </section>
    </>
  );
};

export default PopularHealthCare;
