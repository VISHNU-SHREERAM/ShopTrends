import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

// const URL_BASE = "http://10.128.10.57:8000";
// const URL_BASE = "http://10.32.14.170:8000";
const URL_BASE = "http://localhost:8000";
// const URL_BASE = "http://10.128.11.129:8000";

const Component2 = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("pie");
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${URL_BASE}/piebar_brand_revenue`);
          const result = await response.json();

          setChartData({
            labels: result.labels,
            data: result.data,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, 100);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_BASE}/piebar_brand_revenue`);
        const result = await response.json();

        setChartData({
          labels: result.labels,
          data: result.data,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Brand Revenue",
        data: chartData.data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "decimal",
              }).format(context.raw);
            }
            return label;
          },
        },
      },
    },
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Chart Title with Dropdown */}
      <div className="flex justify-center py-8 items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Brand Revenue Distribution
        </h1>

        {/* Dropdown for selecting chart type */}
        <div className="relative ml-4">
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className="block w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>

      {/* Render Pie or Bar chart based on the selected option */}
      <div className="flex justify-center">
        <div className="w-full h-96">
          {chartType === "pie" ? (
            <Pie data={data} options={options} />
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Component2;
