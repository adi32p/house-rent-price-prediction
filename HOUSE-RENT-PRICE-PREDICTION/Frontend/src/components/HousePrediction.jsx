import { useState } from "react";
import RentForm from "./RentForm";

const HousePrediction = () => {
  const [predictedRent, setPredictedRent] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">House Rent Prediction</h2>
      
      {/* Pass setPredictedRent correctly */}
      <RentForm setPredictedRent={setPredictedRent} />

      {predictedRent !== null && (
        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Predicted Rent Price:</h3>
          <p className="text-2xl font-bold">₹{predictedRent}</p>
          <button
            onClick={() => setPredictedRent(null)}
            className="mt-3 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default HousePrediction;
