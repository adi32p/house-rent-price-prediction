import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# ✅ Load dataset
df = pd.read_csv(r"C:\Users\Aditya Umesh Pawar\Desktop\rental_property_dataset_3000.csv")

# ✅ Feature selection
features = ['City', 'Location', 'Bedrooms', 'Type_of_Residency', 'Deposit_Amount', 
            'Furnished', 'Area_Rating', 'Cleanliness_Rating', 'Amenities', 
            'Proximity_to_Public_Transport', 'Property_Condition', 'Famous_Places_Nearby']
target = 'Rent'

# ✅ Apply One-Hot Encoding
X = pd.get_dummies(df[features])  # Convert categorical variables into numeric
y = df[target]

# ✅ Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# ✅ Save trained model
joblib.dump(model, "rent_prediction_model.pkl")

# ✅ Save model feature names
joblib.dump(X_train.columns.tolist(), "model_columns.pkl")

print("Model training completed successfully!")
print(f"Saved {len(X_train.columns)} feature columns in model_columns.pkl")
