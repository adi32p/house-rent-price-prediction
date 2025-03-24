from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd

# Initialize FastAPI app
app = FastAPI()

# Load trained model
model = joblib.load("rent_prediction_model.pkl")

# Request body schema
class RentInput(BaseModel):
    City: str
    Location: str
    Bedrooms: int
    Type_of_Residency: str
    Deposit_Amount: int
    Furnished: str
    Area_Rating: int
    Cleanliness_Rating: int
    Amenities: str
    Proximity_to_Public_Transport: int
    Property_Condition: int
    Famous_Places_Nearby: str

# Preprocess input data
def preprocess_data(data: RentInput):
    df = pd.DataFrame([data.dict()])
    df = pd.get_dummies(df)  # Convert categorical features to numeric
    return df

@app.post("/predict")
def predict_rent(input_data: RentInput):
    try:
        processed_data = preprocess_data(input_data)
        prediction = model.predict(processed_data)[0]
        return {"predictedRent": round(prediction, 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
