from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Optional
import pandas as pd
import numpy as np
import joblib
import logging
from enum import Enum

# FastAPI app setup
app = FastAPI()

origins = [
    "http://localhost:5173",  # React frontend
    "*"
]

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Enums for validation
class FurnishedOption(str, Enum):
    FULLY_FURNISHED = "Furnished"
    UNFURNISHED = "Unfurnished"

class ProximityOption(str, Enum):
    FAR = "Far"
    NEARBY = "Nearby"
    VERY_CLOSE = "Very Close"

# Request model with validation
class RentRequest(BaseModel):
    City: str
    Location: str
    Bedrooms: int
    Type_of_Residency: str
    Deposit_Amount: float
    Furnished: FurnishedOption
    Area_Rating: int
    Cleanliness_Rating: int
    Amenities: int
    Proximity_to_Public_Transport: ProximityOption
    Property_Condition: int
    Famous_Places_Nearby: int

    class Config:
        use_enum_values = True

# Load model
try:
    model = joblib.load("rent_prediction_model.pkl")
    model_columns = joblib.load("model_columns.pkl")
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise RuntimeError("Failed to load model")

@app.get("/")
async def health_check():
    return {"status": "healthy"}

@app.post("/predict")
async def predict_rent(data: RentRequest):
    try:
        logger.info(f"Received prediction request: {data.dict()}")
        
        # Convert to DataFrame
        input_dict = data.dict()
        df_input = pd.DataFrame([input_dict])
        
        # Feature engineering
        df_input['Amenity_Score'] = df_input['Amenities'] * df_input['Area_Rating']
        df_input['Location_Composite_Score'] = (
            df_input['Proximity_to_Public_Transport'].map({"Far": 0, "Nearby": 1, "Very Close": 2}) + 
            df_input['Area_Rating'] + 
            df_input['Cleanliness_Rating']
        )
        df_input['Deposit_Amount'] = np.log1p(df_input['Deposit_Amount'])
        
        # One-hot encode categorical variables
        df_input = pd.get_dummies(df_input)
        
        # Ensure all expected columns are present
        for col in model_columns:
            if col not in df_input.columns:
                df_input[col] = 0
        
        # Reorder columns to match training
        df_input = df_input[model_columns]
        
        # Make prediction
        prediction = model.predict(df_input)
        predicted_rent = float(prediction[0])
        
        logger.info(f"Prediction successful: {predicted_rent}")
        return {"predictedRent": round(predicted_rent, 2)}
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))