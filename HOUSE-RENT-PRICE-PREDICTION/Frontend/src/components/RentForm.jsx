import { useState } from "react";
import axios from "axios";

const RentForm = ({ setPredictedRent }) => {
  const [formData, setFormData] = useState({
    City: "",
    Location: "",
    Bedrooms: "",
    Type_of_Residency: "",
    Deposit_Amount: "",
    Furnished: "",
    Area_Rating: "",
    Cleanliness_Rating: "",
    Amenities: "",
    Proximity_to_Public_Transport: "",
    Property_Condition: "",
    Famous_Places_Nearby: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setPredictedRent(response.data.predictedRent);
    } catch (error) {
      console.error("Error predicting rent:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        House Rent Prediction
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="City"
          placeholder="City"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="Location"
          placeholder="Location"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="Bedrooms"
          placeholder="Bedrooms"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="Type_of_Residency"
          placeholder="Type of Residency"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="Deposit_Amount"
          placeholder="Deposit Amount"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="Furnished"
          placeholder="Furnished (Yes/No)"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="Area_Rating"
          placeholder="Area Rating (1-5)"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="Cleanliness_Rating"
          placeholder="Cleanliness Rating (1-5)"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="Amenities"
          placeholder="Amenities"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="Proximity_to_Public_Transport"
          placeholder="Proximity (1-5)"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="Property_Condition"
          placeholder="Property Condition (1-5)"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="Famous_Places_Nearby"
          placeholder="Famous Places Nearby"
          onChange={handleChange}
          required
          className="input-field"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Predict Rent
        </button>
      </form>
    </div>
  );
};

export default RentForm;
