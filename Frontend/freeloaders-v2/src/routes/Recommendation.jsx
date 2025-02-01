import { useEffect, useState } from "react";
// image import from assets

import milk from "../assets/Images/milk.jpg";
import bread from "../assets/Images/bread.jpg";
import rice from "../assets/Images/rice.jpg";
import eggs from "../assets/Images/eggs.jpg";
import headphones from "../assets/Images/headphones.jpg";
import powerbank from "../assets/Images/powerbank.jpg";
import usb from "../assets/Images/USB cable.jpg";
import tshirt from "../assets/Images/T_shirt.jpg";
import jeans from "../assets/Images/jeans.jpg";
import socks from "../assets/Images/socks.jpg";
import bedsheet from "../assets/Images/bed_sheet.jpg";
import towel from "../assets/Images/towel.jpg";
import pillows from "../assets/Images/pillow.jpg";
import shampoo from "../assets/Images/shampoo.jpg";
import facewash from "../assets/Images/face_wash.jpg";
import moisturizer from "../assets/Images/moisturizer.jpg";

// const URL_BASE = "http://10.32.14.170:8000";
// const URL_BASE = "http://10.128.11.129:8000";
// const URL_BASE = "http://10.128.10.57:8000";
// const URL_BASE = "https://freeloader.dhruvadeep.cloud";
const URL_BASE = "https://upgraded-broccoli-4xw4g7vw5jrcj7vj-8000.app.github.dev";

// const image_URL = "../assets/Images/";
const imgSrc = {
  "Milk 1L": milk,
  Bread: bread,
  "Rice 1kg": rice,
  "Eggs 12pc": eggs,
  Headphones: headphones,
  "Power Bank": powerbank,
  "USB Cable": usb,
  "T-Shirt": tshirt,
  Jeans: jeans,
  Socks: socks,
  Bedsheet: bedsheet,
  Towel: towel,
  Pillows: pillows,
  Shampoo: shampoo,
  "Face Wash": facewash,
  Moisturizer: moisturizer,
};

function Recommendation() {
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [recommendationItems, setRecommendationItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lift, setLift] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  // Fetch labels for dropdown
  useEffect(() => {
    async function fetchLabels() {
      try {
        setLoading(true);
        const response = await fetch(`${URL_BASE}/get_all_products`);
        const result = await response.json();
        setLabels(result.labels || []);
      } catch (error) {
        console.error("Error fetching labels:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLabels();
  }, []);

  // Handle item selection
  const handleSelectChange = (event) => {
    const label = event.target.value;
    if (label && !selectedLabels.includes(label)) {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  // Remove selected item
  const removeSelectedItem = (labelToRemove) => {
    setSelectedLabels(
      selectedLabels.filter((label) => label !== labelToRemove)
    );
  };

  // Generate a suggestion message
  const generateSuggestion = (concequent, antecedent) => {
    if (concequent.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * concequent.length);
    const suggestion = `We recommend bundle offers on ${
      concequent[randomIndex]
    } along with ${antecedent.join(", ")}.`;
    return suggestion;
  };

  // Fetch recommendations
  const fetchRecommendations = async () => {
    if (selectedLabels.length === 0) return;
    setLoading(true);
    setRecommendationItems([]); // Clear previous recommendations

    const requestData = {
      antecedents: selectedLabels,
      min_support: 0.001,
      min_lift: 1,
      order: "dsc",
      top_k: 1,
    };

    try {
      const response = await fetch(`${URL_BASE}/rulemining/best_consequents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log("Best consequents result:", result);

      // Update recommendation items based on response
      const items = result.data[0][1] || [];
      setRecommendationItems(items);
      setLift(result.data[0][4] || 0);

      // Generate a suggestion based on the recommended items
      setSuggestion(generateSuggestion(result.data[0][1], result.data[0][0]));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center pb-10">Recommendation</h1>

      {/* Dropdown */}
      <div className="flex justify-center mt-4">
        <select
          className="border p-2 rounded"
          value=""
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select products to add to recommendations
          </option>
          {labels.map((label, index) => (
            <option key={index} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Items */}
      <div className="flex flex-wrap justify-center mt-4 space-x-2">
        {selectedLabels.map((label, index) => (
          <div
            key={index}
            className="bg-blue-200 text-blue-800 px-2 py-1 rounded flex items-center space-x-2"
          >
            <span>{label}</span>
            <button
              onClick={() => removeSelectedItem(label)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Suggest Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={fetchRecommendations}
          className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600"
        >
          Suggest 🔥
        </button>
      </div>

      {/* Loading Spinner or Recommendation Items */}
      {loading ? (
        <>
          <div>
            <h2 className="text-center mt-4">Fetching Recommendations...</h2>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </>
      ) : (
        recommendationItems.length > 0 && (
          <>
            <h2 className="mt-4 pt-10 font-bold">
              People who bought the above items also bought :
            </h2>
            <div className="flex overflow-x-auto mt-4 space-x-4 p-4 border rounded-lg">
              {recommendationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-none w-40 h-40 border rounded-lg flex flex-col items-center justify-center bg-gray-100"
                >
                  <img src={imgSrc[item]} alt={item} className="mb-2" />
                  <span className="text-center">{item}</span>
                </div>
              ))}
            </div>

            {/* Suggestion Message */}
            {suggestion && (
              <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 border rounded-lg text-center">
                {suggestion}
              </div>
            )}

            {/* Lift and Clear Button */}
            <div>
              <h2 className="text-center mt-4">
                The likelihood of above items being bought increases by a factor
                of <strong>{lift.toFixed(2)} 💹</strong>.
              </h2>
              <button
                onClick={() => setRecommendationItems([])}
                className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 mt-10"
              >
                Clear Recommendations
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default Recommendation;
