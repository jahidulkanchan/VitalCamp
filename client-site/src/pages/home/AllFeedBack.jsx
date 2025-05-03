import { useQuery } from '@tanstack/react-query';
import Marquee from 'react-fast-marquee';
import ReactStars from 'react-rating-stars-component';
import { useAuth } from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
const AllFeedBack = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: allFeedbacks = [] } = useQuery({
    queryKey: ['feedback', user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/feedbacks');
      return data;
    },
  });
  return (
    <>
      <section className="container px-4 md:px-6 py-12 mx-auto max-w-7xl dark:bg-darkBg">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-darkLight mb-3">Share Your Experience</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Hear what our community members say about their experiences</p>
        </div>

        <Marquee className="mb-6 md:mb-10" pauseOnHover={true} autoFill={true} speed={30} gradient={true} gradientColor='none' gradientWidth={100}>
          {allFeedbacks?.map((feedback) => (
            <div
              className="border border-gray-200 dark:border-gray-700 rounded-xl mx-4 bg-white dark:bg-darkCard p-5 min-h-[260px] w-[360px] shadow-sm hover:shadow-md transition-all duration-300"
              key={feedback._id}>
              <div className="flex gap-4 items-center mb-4">
                <img
                  className="w-12 h-12 bg-white dark:bg-gray-800 border-2 border-primary rounded-full object-cover"
                  src={feedback.authorProfile}
                  alt={`${feedback.authorName}'s profile`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/48';
                    e.target.onerror = null;
                  }}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{feedback.authorName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(feedback.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{feedback.feedbackText}</p>

                <div className="flex items-center gap-2">
                  <ReactStars count={5} value={feedback.ratingPoint} size={20} edit={false} activeColor="#FFD700" color="#E5E7EB" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{feedback.ratingPoint.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </section>
    </>
  );
};

export default AllFeedBack;
