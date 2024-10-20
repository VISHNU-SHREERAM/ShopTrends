import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://10.32.14.170:8000";

const LineChart = ({ DATA, TITLE, DATASET_LABEL, STYLE = { height: 500 } }) => {
  if (DATA === null) {
    return <p>Loading...</p>;
  }
  const data = {
    labels: DATA.labels,
    datasets: [
      {
        label: DATASET_LABEL,
        data: DATA.data,
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: TITLE,
      },
    },
  };

  return (
    <div style={STYLE}>
      <Line data={data} options={options} />
    </div>
  );
};

async function transaction_per_day_line() {
  try {
    const response = await fetch(API_URL + "/transaction_per_day_line", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function get_promise(fn) {
  const [promise, setdata] = useState(null); // State to hold the fetched data

  useEffect(() => {
    fn().then((promise) => {
      if (promise) {
        setdata(promise); // Update the state with fetched data
      }
    });
  }, []);

  return promise;
}

export default function Charts() {
  const tdata = get_promise(transaction_per_day_line);
  console.log(tdata);
  return (
    <div className="ChartPage">
      <center>
        <h1>Charts</h1>
      </center>
      <LineChart
        DATA={tdata}
        DATASET_LABEL={"transactions"}
        TITLE={"transactions per day"}
        STYLE={{ height: 500 }}
      ></LineChart>
    </div>
  );
}
