import { useState } from "react";
import axios from "axios";

const RentForm = ({ setPredictedRent }) => {
  const [formData, setFormData] = useState({
    City: "Pune",
    Location: "",
    Bedrooms: 1,
    Type_of_Residency: "Flat",
    Deposit_Amount: 0,
    Furnished: "Furnished", // Must match backend options
    Area_Rating: 1,
    Cleanliness_Rating: 1,
    Amenities: "",
    Proximity_to_Public_Transport: "Far", // Must match backend options
    Property_Condition: 1,
    Famous_Places_Nearby: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Process amenities and famous places counts
      const amenitiesCount = formData.Amenities 
        ? formData.Amenities.split(",").filter(item => item.trim()).length
        : 0;
      
      const famousPlacesCount = formData.Famous_Places_Nearby
        ? formData.Famous_Places_Nearby.split(",").filter(item => item.trim()).length
        : 0;

      const requestData = {
        ...formData,
        Amenities: amenitiesCount,
        Famous_Places_Nearby: famousPlacesCount
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data && response.data.predictedRent !== undefined) {
        setPredictedRent(response.data.predictedRent);
      } else {
        setError("Prediction failed. Please try again.");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      setError(error.response?.data?.detail || "Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        House Rent Prediction
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Input Fields */}
        {[
          { label: "City", name: "City", type: "text", required: true },
          { label: "Location", name: "Location", type: "text", required: true },
          { label: "Bedrooms", name: "Bedrooms", type: "number", min: 1, required: true },
          { label: "Type of Residency", name: "Type_of_Residency", type: "text", required: true },
          { label: "Deposit Amount", name: "Deposit_Amount", type: "number", min: 0, required: true },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-semibold">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              min={field.min}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        ))}

        {/* Multi-value Fields */}
        {[
          { label: "Amenities (comma-separated)", name: "Amenities" },
          { label: "Famous Places Nearby (comma-separated)", name: "Famous_Places_Nearby" },
        ].map((field) => (
          <div key={field.name} className="col-span-2">
            <label className="block text-gray-700 font-semibold">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        ))}

        {/* Dropdown Fields */}
        {[
          {
            label: "Furnished",
            name: "Furnished",
            options: ["Furnished", "Unfurnished"], // Must match backend
          },
          {
            label: "Area Rating",
            name: "Area_Rating",
            options: [1, 2, 3, 4, 5],
          },
          {
            label: "Cleanliness Rating",
            name: "Cleanliness_Rating",
            options: [1, 2, 3, 4, 5],
          },
          {
            label: "Proximity to Public Transport",
            name: "Proximity_to_Public_Transport",
            options: ["Far", "Nearby", "Very Close"], // Must match backend
          },
          {
            label: "Property Condition",
            name: "Property_Condition",
            options: [1, 2, 3, 4, 5],
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-semibold">{field.label}</label>
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`col-span-2 py-2 rounded-lg font-semibold ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isLoading ? "Predicting..." : "Predict Rent"}
        </button>

        {error && <p className="col-span-2 text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default RentForm;