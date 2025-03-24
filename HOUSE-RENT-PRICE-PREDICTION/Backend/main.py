from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import pandas as pd
import joblib

app = FastAPI()

# ✅ CORS Configuration
origins = [
    "http://localhost:5173",  # React frontend
    "http://127.0.0.1:8000",
    "*"  # Allow all origins (use only for testing)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load Model and Feature Columns
model = joblib.load("rent_prediction_model.pkl")
model_columns = joblib.load("model_columns.pkl")  # Ensure feature consistency

# ✅ Define Request Model
class RentRequest(BaseModel):
    City: str
    Location: str
    Bedrooms: int
    Type_of_Residency: str
    Deposit_Amount: int
    Furnished: str
    Area_Rating: int
    Cleanliness_Rating: int
    Amenities: List[str]  # List of amenities
    Proximity_to_Public_Transport: int
    Property_Condition: int
    Famous_Places_Nearby: List[str]  # List of places


@app.get("/")
async def home():
    return {"message": "Backend is running successfully!"}


# ✅ Preprocess Input to Match Model Training Format
def preprocess_input(data: RentRequest) -> pd.DataFrame:
    input_dict = data.dict()

    # Convert list fields into comma-separated strings
    input_dict["Amenities"] = ", ".join(input_dict["Amenities"])
    input_dict["Famous_Places_Nearby"] = ", ".join(input_dict["Famous_Places_Nearby"])

    # Convert to DataFrame
    df_input = pd.DataFrame([input_dict])

    # Apply one-hot encoding
    df_input = pd.get_dummies(df_input)

    # Ensure the input columns match the model training columns
    for col in model_columns:
        if col not in df_input:
            df_input[col] = 0  # Add missing columns with 0 value

    return df_input[model_columns]  # Keep only model-relevant columns


# ✅ Prediction Endpoint
@app.post("/predict")
async def predict_rent(data: RentRequest) -> Dict[str, float]:
    try:
        processed_input = preprocess_input(data)
        prediction = model.predict(processed_input)
        return {"predictedRent": round(float(prediction[0]), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
