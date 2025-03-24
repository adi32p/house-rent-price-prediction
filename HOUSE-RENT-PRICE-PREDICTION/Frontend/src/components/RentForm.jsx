import { useState } from "react";
import axios from "axios";

const RentForm = ({ setPredictedRent }) => {
  const [formData, setFormData] = useState({
    City: "",
    Location: "",
    Bedrooms: 1,
    Type_of_Residency: "",
    Deposit_Amount: 0,
    Furnished: "No",
    Area_Rating: 1,
    Cleanliness_Rating: 1,
    Amenities: "",
    Proximity_to_Public_Transport: 1,
    Property_Condition: 1,
    Famous_Places_Nearby: "",
  });

  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Handle multi-value input change (comma-separated values)
  const handleMultiValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    const requestData = {
      ...formData,
      Bedrooms: Number(formData.Bedrooms),
      Deposit_Amount: Number(formData.Deposit_Amount),
      Area_Rating: Number(formData.Area_Rating),
      Cleanliness_Rating: Number(formData.Cleanliness_Rating),
      Proximity_to_Public_Transport: Number(formData.Proximity_to_Public_Transport),
      Property_Condition: Number(formData.Property_Condition),
      Amenities: Array.isArray(formData.Amenities)
        ? formData.Amenities
        : formData.Amenities
        ? formData.Amenities.split(",").map((item) => item.trim())
        : [],
      Famous_Places_Nearby: Array.isArray(formData.Famous_Places_Nearby)
        ? formData.Famous_Places_Nearby
        : formData.Famous_Places_Nearby
        ? formData.Famous_Places_Nearby.split(",").map((item) => item.trim())
        : [],
    };
  
    console.log("Sending Data:", JSON.stringify(requestData, null, 2));
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", requestData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data && response.data.predictedRent !== undefined) {
        setPredictedRent(response.data.predictedRent);
      } else {
        setError("Prediction failed. Please try again.");
      }
    } catch (error) {
      console.error("Prediction error:", error.response?.data || error.message);
      setError("Server error. Please check your input or try again later.");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">House Rent Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Input Fields */}
        {[
          { label: "City", name: "City", type: "text" },
          { label: "Location", name: "Location", type: "text" },
          { label: "Bedrooms", name: "Bedrooms", type: "number", min: 1 },
          { label: "Type of Residency", name: "Type_of_Residency", type: "text" },
          { label: "Deposit Amount", name: "Deposit_Amount", type: "number", min: 0 },
        ].map(({ label, name, type, min }) => (
          <div key={name}>
            <label className="block text-gray-700 font-semibold">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              min={min}
              className="input-field w-full px-3 py-2 border rounded-lg"
            />
          </div>
        ))}

        {/* Multi-value Fields */}
        {[
          { label: "Amenities (comma-separated)", name: "Amenities" },
          { label: "Famous Places Nearby (comma-separated)", name: "Famous_Places_Nearby" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-gray-700 font-semibold">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleMultiValueChange}
              className="input-field w-full px-3 py-2 border rounded-lg"
            />
          </div>
        ))}

        {/* Dropdown Fields */}
        {[
          { label: "Furnished", name: "Furnished", options: ["Yes", "No"] },
          { label: "Area Rating", name: "Area_Rating", options: [1, 2, 3, 4, 5] },
          { label: "Cleanliness Rating", name: "Cleanliness_Rating", options: [1, 2, 3, 4, 5] },
          { label: "Proximity to Public Transport", name: "Proximity_to_Public_Transport", options: [1, 2, 3, 4, 5] },
          { label: "Property Condition", name: "Property_Condition", options: [1, 2, 3, 4, 5] },
        ].map(({ label, name, options }) => (
          <div key={name}>
            <label className="block text-gray-700 font-semibold">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="input-field w-full px-3 py-2 border rounded-lg"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit" className="col-span-2 bg-blue-500 text-white font-semibold py-2 rounded-lg">
          Predict Rent
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default RentForm;
