import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const URL_BASE = "http://10.32.14.170:8000";

function CategoryDistribution() {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar"); // Default to bar chart
  const [labels, setLabels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [brandChartData, setBrandChartData] = useState(null); // State for brand-specific chart data
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Fetch the main category data
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
    if (selectedCategory) {
      // Fetch data for the selected category
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
      setBrandChartData(null); // Reset brand chart if no category selected
    }
  }, [selectedCategory]);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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

      {/* Render main category chart with conditional width */}
      <div
        className={`flex justify-center items-center ${
          chartType === "pie" ? "w-1/2" : "w-full"
        } mx-auto`}
      >
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

      {/* Render brand-specific chart below the category dropdown */}
      {selectedCategory && brandChartData && (
        <div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-8">
          <h2 className="text-xl text-center font-semibold mb-4">
            {selectedCategory} Brand Revenue (Overall)
          </h2>
          {/* <Pie data={brandChartData} /> */}
          {/* bar chart */}
          <Bar
            data={brandChartData}
            options={{ scales: { y: { beginAtZero: true } } }}
          />
        </div>
      )}

      {/* have start date and end date date option */}
      {/* have two datepicker */}
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
            <button
              className="bg-[#789DBC] text-white p-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
              onClick={
                // fetch data for the selected category and date range
                () => {
                  fetch(
                    `${URL_BASE}/piebar_brand_revenue_of_particular_category_date/${selectedCategory}/${startDate}/${endDate}`
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((error) =>
                      console.error("Error fetching category data:", error)
                    );
                }
              }
            >
              Get Data
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryDistribution;
