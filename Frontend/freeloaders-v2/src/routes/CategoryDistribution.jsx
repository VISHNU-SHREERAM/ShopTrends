// import React, { useState, useEffect } from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// const URL_BASE = "http://10.32.14.170:8000";

// function CategoryDistribution() {
//   const [chartData, setChartData] = useState(null);
//   const [chartType, setChartType] = useState("bar");
//   const [labels, setLabels] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [brandChartData, setBrandChartData] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [dateRangeChartData, setDateRangeChartData] = useState(null);
//   const [showGraph, setShowGraph] = useState(false);

//   useEffect(() => {
//     fetch(`${URL_BASE}/piebar_category_revenue`)
//       .then((response) => response.json())
//       .then((data) => {
//         setLabels(data.labels);
//         setChartData({
//           labels: data.labels,
//           datasets: [
//             {
//               label: "Category Revenue",
//               data: data.data,
//               backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "#4BC0C0",
//                 "#9966FF",
//               ],
//             },
//           ],
//         });
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   useEffect(() => {
//     let intervalId;

//     const fetchData = () => {
//       if (selectedCategory) {
//         fetch(
//           `${URL_BASE}/piebar_brand_revenue_of_particular_category/${selectedCategory}`
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             setBrandChartData({
//               labels: data.labels,
//               datasets: [
//                 {
//                   label: `${selectedCategory} Brand Revenue`,
//                   data: data.data,
//                   backgroundColor: [
//                     "#FF6384",
//                     "#36A2EB",
//                     "#FFCE56",
//                     "#4BC0C0",
//                     "#9966FF",
//                   ],
//                 },
//               ],
//             });
//           })
//           .catch((error) =>
//             console.error("Error fetching category data:", error)
//           );
//       } else {
//         setBrandChartData(null);
//       }
//     };

//     if (selectedCategory) {
//       fetchData();
//       intervalId = setInterval(fetchData, 10000);
//     }

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [selectedCategory]);

//   const handleChartTypeChange = (event) => {
//     setChartType(event.target.value);
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleGetData = () => {
//     fetch(
//       `${URL_BASE}/piebar_brand_revenue_of_particular_category_date/${selectedCategory}/${startDate}/${endDate}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setDateRangeChartData({
//           labels: data.labels,
//           datasets: [
//             {
//               label: `${selectedCategory} Revenue by Date Range`,
//               data: data.data,
//               backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "#4BC0C0",
//                 "#9966FF",
//               ],
//             },
//           ],
//         });
//         setShowGraph(true); // Show the graph
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   };

//   return (
//     <div className="h-full">
//       <h1 className="text-2xl text-center mt-4 py-5 font-bold">
//         Category Distribution
//       </h1>

//       {/* Dropdown to select chart type */}
//       <div className="text-center my-4">
//         <label htmlFor="chartType" className="mr-2 font-semibold">
//           Select Chart Type:
//         </label>
//         <select
//           id="chartType"
//           value={chartType}
//           onChange={handleChartTypeChange}
//           className="border rounded-md p-2"
//         >
//           <option value="bar">Bar Chart</option>
//           <option value="pie">Pie Chart</option>
//         </select>
//       </div>

//       {/* Render main category chart */}
//       <div className="flex justify-center items-center w-full mx-auto">
//         {chartData &&
//           (chartType === "pie" ? (
//             <Pie data={chartData} />
//           ) : (
//             <Bar
//               data={chartData}
//               options={{ scales: { y: { beginAtZero: true } } }}
//             />
//           ))}
//       </div>

//       {/* Dropdown for category selection */}
//       <div className="flex justify-center my-4 pt-10">
//         <label htmlFor="category" className="mr-2 font-semibold">
//           Select Category:
//         </label>
//         <select
//           id="category"
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="border rounded-md p-2"
//         >
//           <option value="">-- Select a Category --</option>
//           {labels.map((label) => (
//             <option key={label} value={label}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Render brand-specific chart */}
//       {selectedCategory && brandChartData && (
//         <div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-8">
//           <h2 className="text-xl text-center font-semibold mb-4">
//             {selectedCategory} Brand Revenue (Overall)
//           </h2>
//           <Bar
//             data={brandChartData}
//             options={{ scales: { y: { beginAtZero: true } } }}
//           />
//         </div>
//       )}

//       {/* Date picker inputs */}
//       {selectedCategory && (
//         <>
//           <div className="flex flex-col items-start my-4 pt-10">
//             <div className="mb-4">
//               <label htmlFor="startDate" className="mr-2 font-semibold">
//                 Start Date:
//               </label>
//               <input
//                 type="date"
//                 id="startDate"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border rounded-md p-2"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="endDate" className="mr-2 font-semibold">
//                 End Date:
//               </label>
//               <input
//                 type="date"
//                 id="endDate"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border rounded-md p-2"
//               />
//             </div>
//             <button
//               className="bg-[#789DBC] text-white p-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
//               onClick={handleGetData}
//             >
//               Get Data
//             </button>
//           </div>
//         </>
//       )}

//       {/* Render date range chart */}
//       {showGraph && dateRangeChartData && (
//         <div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-8">
//           <h2 className="text-xl text-center font-semibold mb-4">
//             {selectedCategory} Revenue from {startDate} to {endDate}
//           </h2>
//           <Bar
//             data={dateRangeChartData}
//             options={{ scales: { y: { beginAtZero: true } } }}
//           />
//           <button
//             className="bg-red-500 text-white p-2 rounded-md mt-4 transition duration-200 hover:bg-red-600"
//             onClick={() => setShowGraph(false)}
//           >
//             Close Graph
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryDistribution;
import React, { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

// const URL_BASE = "http://10.32.14.170:8000";
const URL_BASE = "https://upgraded-broccoli-4xw4g7vw5jrcj7vj-8000.app.github.dev";

function CategoryDistribution() {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [labels, setLabels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brandChartData, setBrandChartData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRangeChartData, setDateRangeChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [dateRangeChartType, setDateRangeChartType] = useState("bar");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${URL_BASE}/piebar_category_revenue`)
      .then((response) => response.json())
      .then((data) => {
        setLabels(data.labels);
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Category Revenue",
              data: data.data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    let intervalId;

    const fetchData = () => {
      if (selectedCategory) {
        fetch(
          `${URL_BASE}/piebar_brand_revenue_of_particular_category/${selectedCategory}`
        )
          .then((response) => response.json())
          .then((data) => {
            setBrandChartData({
              labels: data.labels,
              datasets: [
                {
                  label: `${selectedCategory} Brand Revenue`,
                  data: data.data,
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                  ],
                },
              ],
            });
          })
          .catch((error) =>
            console.error("Error fetching category data:", error)
          );
      } else {
        setBrandChartData(null);
      }
    };

    if (selectedCategory) {
      fetchData();
      intervalId = setInterval(fetchData, 10000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedCategory]);

  const calculateStats = (data) => {
    const brands = Object.keys(data.data);
    const stats = {};

    brands.forEach((brand) => {
      const brandData = data.data[brand];
      const values = brandData.map((item) => item[1]);

      stats[brand] = {
        maxRevenue: Math.max(...values),
        maxRevenueDate: brandData.find(
          (item) => item[1] === Math.max(...values)
        )[0],
        minRevenue: Math.min(...values),
        minRevenueDate: brandData.find(
          (item) => item[1] === Math.min(...values)
        )[0],
        averageRevenue: Math.round(
          values.reduce((a, b) => a + b, 0) / values.length
        ),
        totalRevenue: values.reduce((a, b) => a + b, 0),
      };
    });

    return stats;
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleDateRangeChartTypeChange = (event) => {
    setDateRangeChartType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGetData = () => {
    // Fetch bar chart data
    fetch(
      `${URL_BASE}/piebar_brand_revenue_of_particular_category_date/${selectedCategory}/${startDate}/${endDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDateRangeChartData({
          labels: data.labels,
          datasets: [
            {
              label: `${selectedCategory} Revenue by Date Range`,
              data: data.data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        });
        setShowGraph(true);
      })
      .catch((error) => console.error("Error fetching bar data:", error));

    // Fetch line chart data
    fetch(
      `${URL_BASE}/line_graph_brand_revenue_of_particular_category_date/${selectedCategory}/${startDate}/${endDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        // const brandColors = {
        //   Jockey: "#FF6384",
        //   Levis: "#36A2EB",
        //   Wrangler: "#4BC0C0",
        // };
        // how to get brandColors from data
        const brandColors = {};
        Object.keys(data.data).forEach((brand, index) => {
          // brandColors[brand] = `hsl(${
          //   (index * 360) / Object.keys(data.data).length
          // }, 100%, 50%)`;
          // use a mild colouring
          brandColors[brand] = `hsl(${
            (index * 360) / Object.keys(data.data).length
          }, 100%, 65%)`;
        });

        const datasets = Object.keys(data.data).map((brand) => ({
          label: brand,
          data: data.data[brand].map((item) => item[1]),
          borderColor: brandColors[brand],
          backgroundColor: brandColors[brand],
          tension: 0.4,
        }));

        setLineChartData({
          labels: data.labels,
          datasets,
        });

        setStats(calculateStats(data));
      })
      .catch((error) => console.error("Error fetching line data:", error));
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl text-center mt-4 py-5 font-bold">
        Category Distribution
      </h1>

      {/* Dropdown to select chart type */}
      <div className="text-center my-4">
        <label htmlFor="chartType" className="mr-2 font-semibold">
          Select Chart Type:
        </label>
        <select
          id="chartType"
          value={chartType}
          onChange={handleChartTypeChange}
          className="border rounded-md p-2"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      {/* Render main category chart */}
      <div className="flex justify-center items-center w-full mx-auto">
        {chartData &&
          (chartType === "pie" ? (
            <Pie data={chartData} />
          ) : (
            <Bar
              data={chartData}
              options={{ scales: { y: { beginAtZero: true } } }}
            />
          ))}
      </div>

      {/* Dropdown for category selection */}
      <div className="flex justify-center my-4 pt-10">
        <label htmlFor="category" className="mr-2 font-semibold">
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded-md p-2"
        >
          <option value="">-- Select a Category --</option>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Render brand-specific chart */}
      {selectedCategory && brandChartData && (
        <div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-8">
          <h2 className="text-xl text-center font-semibold mb-4">
            {selectedCategory} Brand Revenue (Overall)
          </h2>
          <Bar
            data={brandChartData}
            options={{ scales: { y: { beginAtZero: true } } }}
          />
        </div>
      )}

      {/* Date picker inputs */}
      {selectedCategory && (
        <>
          <div className="flex flex-col items-start my-4 pt-10">
            <div className="mb-4">
              <label htmlFor="startDate" className="mr-2 font-semibold">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="mr-2 font-semibold">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dateRangeChartType"
                className="mr-2 font-semibold"
              >
                Chart Type:
              </label>
              <select
                id="dateRangeChartType"
                value={dateRangeChartType}
                onChange={handleDateRangeChartTypeChange}
                className="border rounded-md p-2"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
              </select>
            </div>
            <button
              className="bg-[#789DBC] text-white p-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
              onClick={handleGetData}
            >
              Get Data
            </button>
          </div>
        </>
      )}

      {/* Render date range chart */}
      {showGraph && (dateRangeChartData || lineChartData) && (
        <div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-8">
          <h2 className="text-xl text-center font-semibold mb-4">
            {selectedCategory} Revenue from {startDate} to {endDate}
          </h2>

          {dateRangeChartType === "bar" ? (
            <Bar
              data={dateRangeChartData}
              options={{ scales: { y: { beginAtZero: true } } }}
            />
          ) : (
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                interaction: {
                  mode: "index",
                  intersect: false,
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Revenue",
                    },
                  },
                },
              }}
            />
          )}

          <button
            className="bg-red-500 text-white p-2 rounded-md mt-4 transition duration-200 hover:bg-red-600"
            onClick={() => setShowGraph(false)}
          >
            Close Graph
          </button>
        </div>
      )}

      {/* Statistics Section */}
      {stats && dateRangeChartType === "line" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 p-4">
          {Object.entries(stats).map(([brand, brandStats]) => (
            <div key={brand} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-bold mb-2">{brand} Statistics</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Peak Revenue: </span>$
                  {brandStats.maxRevenue.toLocaleString()}
                  <div className="text-sm text-gray-600">
                    on {brandStats.maxRevenueDate}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Lowest Revenue: </span>$
                  {brandStats.minRevenue.toLocaleString()}
                  <div className="text-sm text-gray-600">
                    on {brandStats.minRevenueDate}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Average Daily Revenue: </span>
                  ${brandStats.averageRevenue.toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Total Period Revenue: </span>$
                  {brandStats.totalRevenue.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryDistribution;
