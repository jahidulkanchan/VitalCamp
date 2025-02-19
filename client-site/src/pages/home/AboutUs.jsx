import aboutUs from '../../assets/about-us.png'
const AboutUs = () => {
  return (
    <>
      <section className="mx-auto container px-2 md:px-5 py-5 md:py-8">
        <h2 className="text-center py-5 text-2xl md:text-4xl mb-4">
          About Our Mission
        </h2>
        <div className="gap-5 items-center grid lg:grid-cols-2">
        <div className="left-content order-2 lg:order-1">
        <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
          Improving Healthcare Access 
            </h2>
            <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-primary
             to-secondary w-fit text-transparent bg-clip-text">
               Through Medical Camps
            </h2>
          <div className="mt-3 text-justify">
            <h3 className="text-lg md:text-xl font-medium">Bridging Healthcare & Community</h3>
            <p>VitalCamp is dedicated to making medical camp management simple and efficient, ensuring healthcare services reach those in need. We help organizers plan, manage registrations, and coordinate resources effortlessly.</p>
            <h3 className="text-lg md:text-xl font-medium mt-4">Empowering Participants & Organizers</h3>
            <p>For participants, VitalCamp offers a smooth registration process and real-time updates. Our goal is to create a hassle-free experience, making healthcare more accessible and organized for everyone.</p>
          </div>
        </div>
        <div className="right-content relative order-1 lg:order-2">
        <p className='absolute w-[200px] h-[200px] blur-3xl rounded-full bg-primary  right-0 left-0 mx-auto  top-[30px] -z-[2]'></p>
          <img src={aboutUs} alt="about-Us" />
        </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
