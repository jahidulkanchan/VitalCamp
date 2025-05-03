import aboutUs from '../../assets/about-us.png'
const AboutUs = () => {
  return (
    <>
      <section className="mx-auto container px-4 sm:px-6 py-12 md:py-16 lg:py-20 dark:bg-darkBg">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-darkLight mb-4">About Our Mission</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        {/* Content Grid */}
        <div className="gap-8 md:gap-12 items-center grid lg:grid-cols-2">
          {/* Left Content - Text */}
          <div className="order-2 lg:order-1 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-2">Improving Healthcare Access</h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary w-fit text-transparent bg-clip-text mb-6">Through Medical Camps</h2>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-darkCard rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Bridging Healthcare & Community</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  VitalCamp is dedicated to making medical camp management simple and efficient, ensuring healthcare services reach those in need. We help organizers plan, manage registrations, and
                  coordinate resources effortlessly.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-darkCard rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Empowering Participants & Organizers</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  For participants, VitalCamp offers a smooth registration process and real-time updates. Our goal is to create a hassle-free experience, making healthcare more accessible and
                  organized for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 relative">
            {/* Animated gradient background */}
            <div className="absolute w-[250px] h-[250px] md:w-[300px] md:h-[300px] blur-3xl rounded-full bg-primary/30 dark:bg-primary/20 right-0 left-0 mx-auto top-1/2 -translate-y-1/2 -z-[1] animate-pulse-slow"></div>

            {/* Image with hover effect */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <img src={aboutUs} alt="Medical camp team helping community" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
