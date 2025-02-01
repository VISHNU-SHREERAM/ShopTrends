import "./App.css";
import "./index.css";

// use colors
// #789DBC
// #FFE3E3
// #FEF9F2
// #C9E9D2

import { useState } from "react";

import Navbar from "./Components/NavBar";
// import Navbar from "./Components/Navbar";

import Component1 from "./routes/Component1";
import Component2 from "./routes/Component2";
import Component3 from "./routes/Component3";
import CategoryDistribution from "./routes/CategoryDistribution";
import Recommendation from "./routes/Recommendation";

function App() {
  const [activeComponent, setActiveComponent] = useState("component1");

  const renderComponent = () => {
    switch (activeComponent) {
      case "component1":
        return <Component1 />;
      case "component2":
        return <Component2 />;
      case "component3":
        return <Component3 />;
      case "categoryDistribution":
        return <CategoryDistribution />;
      case "recommendation":
        return <Recommendation />;
      default:
        return <div>Select a service</div>;
    }
  };

  return (
    <div className="App overflow-hidden flex flex-col">
      <Navbar />
      {/* two divs side by side height to 100% no scroll */}
      <div className="flex flex-grow">
        <div className="w-1/4 bg-[#C9E9D2]">
          {/* Buttons with proper animation 3 buttons */}
          <div className="flex flex-col">
            <h1 className="text-2xl text-center mt-4 py-5 font-bold">
              Services
            </h1>
            <button
              onClick={() => setActiveComponent("component1")}
              className="bg-[#789DBC] text-white p-2 m-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
            >
              Sales 💹
            </button>
            <button
              onClick={() => setActiveComponent("component2")}
              className="bg-[#789DBC] text-white p-2 m-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
            >
              Revenue 💸
            </button>
            <button
              onClick={() => setActiveComponent("component3")}
              className="bg-[#789DBC] text-white p-2 m-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
            >
              Over a Day 🔥
            </button>
            <button
              onClick={() => setActiveComponent("categoryDistribution")}
              className="bg-[#789DBC] text-white p-2 m-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
            >
              Category Wise Distribution 📊
            </button>
            <button
              onClick={() => setActiveComponent("recommendation")}
              className="bg-[#789DBC] text-white p-2 m-2 rounded-md transition duration-200 hover:bg-[#5a7b98]"
            >
              Recommendations 🎯
            </button>
          </div>
        </div>
        <div className="w-3/4 bg-[#FEF9F2] p-4">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default App;
