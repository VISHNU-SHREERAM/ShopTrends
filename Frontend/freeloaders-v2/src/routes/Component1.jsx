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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const URL_BASE = "http://10.32.14.170:8000";

const Component1 = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_BASE}/transaction_per_day_line`);
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
        label: "Transactions Per Day",
        data: chartData.data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          color: "#4B5563", // Tailwind's gray-600
        },
      },
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          color: "#4B5563", // Tailwind's gray-600
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4B5563", // Tailwind's gray-600
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <div className="w-full md:w-3/4 lg:w-1/2 h-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Component 1</h1>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Component1;
