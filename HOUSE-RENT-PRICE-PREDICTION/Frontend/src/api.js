import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const predictRent = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/predict`, formData);
        return response.data.predicted_rent;
    } catch (error) {
        console.error("Error predicting rent:", error);
        return null;
    }
};