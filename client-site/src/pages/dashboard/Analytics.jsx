import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: regiCampData = [] } = useQuery({
    queryKey: ["singleRegiItem", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/regiCamps/${user?.email}`);
      return response.data;
    },
  });

  const totalPayment = regiCampData?.reduce(
    (acc, current) => acc + current.campFees,
    0
  );

  const payItem = regiCampData?.filter((item) => item.paymentStatus === "paid");

  const paidUnpaidData = [
    { name: 'Paid', value: payItem.length },
    { name: 'Unpaid', value: regiCampData.length - payItem.length }
  ];

  const COLORS = ['#218ACC', '#FF8042'];

  return (
    <>
      <section className="md:py-10">
        <div className="flex flex-wrap px-4 sm:flex-nowrap gap-4 md:gap-6 my-6 justify-center items-center">
          {[
            { title: "Total Registered", value: regiCampData.length },
            { title: "Paid Camps", value: payItem.length },
            { title: "Total Payments", value: `$${totalPayment}` },
          ]?.map((item, index) => (
            <div
              key={index}
              className="card bg-gradient-to-r from-[#218ACC] to-[#1A73E8] text-white min-w-[160px] py-5 rounded-xl shadow-md md:shadow-lg w-full text-center flex flex-col justify-center items-center min-h-[100px]"
            >
              <h3 className="text-lg md:text-2xl font-medium">{item.title}</h3>
              <p className="text-lg font-medium bg-white text-[#218ACC] py-2 px-4 rounded-md min-w-[70px] mt-3">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex overflow-x-scroll flex-col-reverse md:flex-row justify-between items-center">
          <div className="flex-1">
            <div className="overflow-x-scroll">
              <ResponsiveContainer minWidth="400px" height={400}>
                <BarChart
                  data={regiCampData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="campName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="campFees" fill="#218ACC" name="Camp Fees" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex-1 mt-6 md:mt-0 md:ml-6 flex justify-center">
            <div>
              <h3 className="text-xl md:text-2xl mb-4 text-center">Payment Status</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={paidUnpaidData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {paidUnpaidData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Analytics;
