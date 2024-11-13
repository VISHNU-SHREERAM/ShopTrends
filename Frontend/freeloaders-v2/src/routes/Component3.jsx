// import { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import dayjs from "dayjs"; // For date manipulation

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// );

// // const URL_BASE = "https://freeloader.dhruvadeep.cloud";
// const URL_BASE = "http://10.32.14.170:8000";

// const DateSelectorComponent = () => {
//   const [chartData, setChartData] = useState({ labels: [], data: [] });
//   const [filteredData, setFilteredData] = useState({ labels: [], data: [] });
//   const [loading, setLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(
//     dayjs().format("YYYY-MM-DD")
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${URL_BASE}/sales_on_date/${selectedDate}`
//         );
//         const result = await response.json();
//         const transformedLabels = result.labels.map((label) =>
//           dayjs(label).format("HH:mm")
//         );
//         setChartData({ labels: transformedLabels, data: result.data });
//         setFilteredData({ labels: transformedLabels, data: result.data });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [selectedDate]);

//   const data = {
//     labels: filteredData.labels,
//     datasets: [
//       {
//         label: "Sales Data",
//         data: filteredData.data,
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         pointBackgroundColor: "rgba(75, 192, 192, 1)",
//         pointBorderColor: "#fff",
//         fill: true,
//         tension: 0.25,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: { color: "rgba(200, 200, 200, 0.3)" },
//         ticks: { color: "#4B5563" },
//       },
//       x: {
//         grid: { color: "rgba(200, 200, 200, 0.3)" },
//         ticks: { color: "#4B5563" },
//         padding: 0, // removes padding
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//         labels: { color: "#4B5563" },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || "";
//             if (label) label += ": ";
//             if (context.parsed.y !== null) {
//               label += new Intl.NumberFormat("en-US", {
//                 style: "decimal",
//               }).format(context.parsed.y);
//             }
//             return label;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-4 md:w-2/3 lg:w-1/2 mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Sales Data by Date
//       </h1>

//       {/* Date Picker */}
//       <div className="flex justify-center mb-6">
//         <label className="mr-4 text-lg font-medium text-gray-700">
//           Select Date:
//         </label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700"
//         />
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-8">
//           <div className="text-lg">Loading...</div>
//         </div>
//       ) : (
//         <div className="flex justify-center py-8 w-full">
//           <div className="w-full h-96">
//             <Line data={data} options={options} />
//           </div>
//         </div>
//       )}

//       {/* Statistics Block */}
//       <div className="flex justify-around mt-12">
//         <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4 bg-white shadow-md rounded-lg border border-gray-200">
//           <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
//             Statistics
//           </h2>
//           <div className="flex justify-between border-t border-gray-200 pt-4">
//             <div className="flex-1 text-center">
//               <p className="text-sm text-gray-600">Min:</p>
//               <p className="text-lg font-semibold text-gray-800">
//                 {Math.min(...filteredData.data)}
//               </p>
//             </div>
//             <div className="flex-1 text-center">
//               <p className="text-sm text-gray-600">Max:</p>
//               <p className="text-lg font-semibold text-gray-800">
//                 {Math.max(...filteredData.data)}
//               </p>
//             </div>
//             <div className="flex-1 text-center">
//               <p className="text-sm text-gray-600">Average:</p>
//               <p className="text-lg font-semibold text-gray-800">
//                 {(
//                   filteredData.data.reduce((a, b) => a + b, 0) /
//                   filteredData.data.length
//                 ).toFixed(2)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DateSelectorComponent;
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const URL_BASE = "http://10.32.14.170:8000";

const DateSelectorComponent = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [filteredData, setFilteredData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${URL_BASE}/sales_on_date/${selectedDate}`
        );
        const result = await response.json();

        // Generate an array with all 24 hours
        const allHours = Array.from({ length: 24 }, (_, i) =>
          dayjs().hour(i).minute(0).format("HH:mm")
        );

        // Aggregate sales data by each hour
        const salesByHour = Array(24).fill(0); // initialize with zero for each hour

        result.labels.forEach((timestamp, index) => {
          const hour = dayjs(timestamp).hour();
          salesByHour[hour] += result.data[index]; // accumulate sales within each hour
        });

        setChartData({ labels: allHours, data: salesByHour });
        setFilteredData({ labels: allHours, data: salesByHour });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate]);

  const data = {
    labels: filteredData.labels,
    datasets: [
      {
        label: "Sales Data",
        data: filteredData.data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        fill: true,
        tension: 0.25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(200, 200, 200, 0.3)" },
        ticks: { color: "#4B5563" },
      },
      x: {
        grid: { color: "rgba(200, 200, 200, 0.3)" },
        ticks: { color: "#4B5563" },
        padding: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "#4B5563" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "decimal",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="p-4 md:w-2/3 lg:w-1/2 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Sales Data by Date
      </h1>

      {/* Date Picker */}
      <div className="flex justify-center mb-6">
        <label className="mr-4 text-lg font-medium text-gray-700">
          Select Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        <div className="">
          <div className="w-full h-96">
            <Line data={data} options={options} />
          </div>
        </div>
      )}

      {/* Statistics Block */}
      <div className="flex justify-around mt-12">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
            Statistics
          </h2>
          <div className="flex justify-between border-t border-gray-200 pt-4">
            <div className="flex-1 text-center">
              <p className="text-sm text-gray-600">Min:</p>
              <p className="text-lg font-semibold text-gray-800">
                {Math.min(...filteredData.data.filter((val) => val !== null))}
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-sm text-gray-600">Max:</p>
              <p className="text-lg font-semibold text-gray-800">
                {Math.max(...filteredData.data.filter((val) => val !== null))}
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-sm text-gray-600">Average:</p>
              <p className="text-lg font-semibold text-gray-800">
                {(
                  filteredData.data
                    .filter((val) => val !== null)
                    .reduce((a, b) => a + b, 0) /
                  filteredData.data.filter((val) => val !== null).length
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelectorComponent;
