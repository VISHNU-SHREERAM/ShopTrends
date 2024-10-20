import "./App.css";
import "./index.css";

// use colors
// #789DBC
// #FFE3E3
// #FEF9F2
// #C9E9D2

// tailwind is enabled by default
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App h-screen overflow-hidden flex flex-col">
      <Navbar />
      {/* two divs side by side height to 100% no scroll */}
      <div className="flex flex-grow">
        <div className="w-1/4 bg-[#C9E9D2] h-full">
          {/* Buttons with proper animation 3 buttons nutton1 button2 button3 */}
          <div className="flex flex-col">
            <h1 className="text-2xl text-center mt-4 py-5 font-bold">
              Services
            </h1>
            <button className="bg-[#789DBC] text-white p-2 m-2 rounded-md">
              Button 1
            </button>
            <button className="bg-[#789DBC] text-white p-2 m-2 rounded-md">
              Button 2
            </button>
            <button className="bg-[#789DBC] text-white p-2 m-2 rounded-md">
              Button 3
            </button>
          </div>
        </div>
        <div className="w-3/4 bg-[#FEF9F2] h-full">2</div>
      </div>
    </div>
  );
}

export default App;
