import { useEffect, useState, useRef } from "react";
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

// const URL_BASE = "http://10.32.14.170:8000";
const URL_BASE = "https://upgraded-broccoli-4xw4g7vw5jrcj7vj-8000.app.github.dev";

const DateSelectorComponent = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [filteredData, setFilteredData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  // Reference to the chart instance
  const chartRef = useRef(null);

  useEffect(() => {
    let isFirstLoad = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL_BASE}/sales_on_date/${selectedDate}`
        );
        const result = await response.json();

        const allHours = Array.from({ length: 24 }, (_, i) =>
          dayjs().hour(i).minute(0).format("HH:mm")
        );

        const salesByHour = Array(24).fill(0);

        result.labels.forEach((timestamp, index) => {
          const hour = dayjs(timestamp).hour();
          salesByHour[hour] += result.data[index];
        });

        if (isFirstLoad) {
          setLoading(true);
          setChartData({ labels: allHours, data: salesByHour });
          setFilteredData({ labels: allHours, data: salesByHour });
          setLoading(false);
          isFirstLoad = false;
        } else {
          // Update the chart data smoothly
          const chart = chartRef.current;
          if (chart) {
            chart.data.datasets[0].data = salesByHour;
            chart.update("active");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
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
        ticks: {
          color: "#4B5563",
          maxRotation: 45,
          minRotation: 45,
        },
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
    animation: {
      duration: 750,
      easing: "easeInOutQuart",
    },
    transitions: {
      active: {
        animation: {
          duration: 750,
          easing: "easeInOutQuart",
        },
      },
    },
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Sales Data by Date
      </h1>

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
        <div className="w-full bg-white p-4 rounded-lg shadow">
          <div className="w-full h-96">
            <Line data={data} options={options} ref={chartRef} />
          </div>
        </div>
      )}

      <div className="flex justify-center mt-12">
        <div className="w-full max-w-lg px-4 py-4 bg-white shadow-md rounded-lg border border-gray-200">
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
