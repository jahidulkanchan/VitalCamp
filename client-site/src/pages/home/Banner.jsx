import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide1 from "../../assets/slide1.webp";
import Slide2 from "../../assets/slide2.jpg";
import Slide3 from "../../assets/slide3.jpg";
import SlideItem from "../../components/SlideItem";
const Banner = () => {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };
  return (
    <>
      <section className="pt-[0px] container mx-auto pb-8">
        <Slider className="mx-auto" {...settings}>
          <div>
              <SlideItem bannerBg={Slide1} headline='Transforming Lives Through Health' describe='Our medical camp made a significant impact by helping over 500 patients restore their health and vitality. We take great pride in contributing to the well-being of our community and improving the lives of so many individuals.' />
          </div>
          <div>
              <SlideItem bannerBg={Slide2} headline='Empowering Communities with Healthcare' describe='We are committed to providing essential healthcare services to remote and underserved communities, ensuring everyone has access to quality medical care. Our goal is to improve health outcomes and enhance the quality of life through vital treatments and health education.' />
          </div>
          <div>
              <SlideItem bannerBg={Slide3} headline='Healing Smiles, One Camp at a Time' describe='Witness the joy and transformation as patients receive life-changing medical care, restoring their health and hope. It’s a profound reminder of the difference compassionate healthcare can make.' />
          </div>
        </Slider>
      </section>
    </>
  );
};

export default Banner;