import { useState } from "react";
import RentForm from "./RentForm";

const HousePrediction = () => {
  const [predictedRent, setPredictedRent] = useState(null);

  return (
    <div>
      <h2>House Rent Prediction</h2>
      <RentForm setPredictedRent={setPredictedRent} />
      
      {predictedRent !== null && (
        <div>
          <h3>Predicted Rent Price: ₹{predictedRent}</h3>
        </div>
      )}
    </div>
  );
};

export default HousePrediction;
