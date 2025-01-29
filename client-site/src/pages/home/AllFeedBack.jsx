import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ReactStars from "react-rating-stars-component";
import Marquee from "react-fast-marquee";
import { useAuth } from "../../hooks/useAuth";
const AllFeedBack = () => {
  const {user} = useAuth()
  const axiosPublic = useAxiosPublic()
  const {data: allFeedbacks=[]} = useQuery({
    queryKey: ['feedback',user?.email],
    queryFn: async()=>{
     const {data} = await axiosPublic.get('/feedbacks')
     return data
    }
  })
  return (
    <>
      <section className="container px-2 md:px-5 mx-auto">
        <h2 className="text-2xl md:text-4xl text-center">Share Your Experience</h2><br />
      <Marquee  className="mb-2 md:mb-5" pauseOnHover={true} autoFill={true} speed={30}>
        {allFeedbacks?.map(feedback => (
          <div className="border rounded-md mx-3 bg-blue-100 p-3 min-h-[240px] w-[350px]" key={feedback._id}>
            <div className="flex gap-3 items-center">
              <img className="w-[45px] h-[45px] bg-white border border-primary rounded-full" src={feedback.authorProfile} alt="Author_Profile" />
              <h2 className="text-lg">{feedback.authorName}</h2>
            </div>
            <div>
              <p className="text-sm text-gray-600">{feedback.feedbackText}</p>
              <p className="flex items-center gap-1"> 
                <ReactStars
                  count={5}
                  value={feedback.ratingPoint}
                  size={24}
                  activeColor="#ffd700"
                />
                <span>{feedback.ratingPoint}</span>
              </p>
            </div>
          </div>
        ))}
    </Marquee>
       
      </section>
    </>
  );
};

export default AllFeedBack;