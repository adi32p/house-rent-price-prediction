import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
import joblib

# Load dataset
df = pd.read_csv(r"C:\Users\Aditya Umesh Pawar\Desktop\Form_responses_extended.csv")

# Clean string fields
df['Furnished'] = df['Furnished'].str.strip().str.title()
df['Proximity_to_Public_Transport'] = df['Proximity_to_Public_Transport'].str.strip().str.title()

# Handle missing values
df['Famous_Places_Nearby'] = df['Famous_Places_Nearby'].fillna('').apply(lambda x: len([p.strip() for p in x.split(',') if p.strip()]))
df['Amenities'] = df['Amenities'].fillna('').apply(lambda x: len([a.strip() for a in x.split(',') if a.strip()]))

# Filter valid values
valid_furnished = ['Furnished', 'Unfurnished']
valid_proximity = ['Far', 'Nearby', 'Very Close']
df = df[df['Furnished'].isin(valid_furnished)]
df = df[df['Proximity_to_Public_Transport'].isin(valid_proximity)]

# Encode categorical values
furnish_encoder = LabelEncoder()
proximity_encoder = LabelEncoder()
residency_encoder = LabelEncoder()
city_encoder = LabelEncoder()
location_encoder = LabelEncoder()

df['Furnished_Encoded'] = furnish_encoder.fit_transform(df['Furnished'])
df['Proximity_Encoded'] = proximity_encoder.fit_transform(df['Proximity_to_Public_Transport'])
df['Type_of_Residency_Encoded'] = residency_encoder.fit_transform(df['Type_of_Residency'])
df['City_Encoded'] = city_encoder.fit_transform(df['City'])
df['Location_Encoded'] = location_encoder.fit_transform(df['Location'])

# Feature engineering
df['Amenity_Score'] = df['Amenities'] * df['Area_Rating']
df['Location_Composite_Score'] = df['Proximity_Encoded'] + df['Area_Rating'] + df['Cleanliness_Rating']
df['Deposit_Amount'] = np.log1p(df['Deposit_Amount'])

# Scale numerical features
scaler = StandardScaler()
numeric_features = ['Deposit_Amount', 'Area_Rating', 'Cleanliness_Rating', 'Amenities',
                    'Amenity_Score', 'Location_Composite_Score', 'Famous_Places_Nearby', 'Property_Condition']
df[numeric_features] = scaler.fit_transform(df[numeric_features])

# Final features and target
features = [
    'City_Encoded', 'Location_Encoded', 'Bedrooms', 'Type_of_Residency_Encoded',
    'Furnished_Encoded', 'Proximity_Encoded'
] + numeric_features
target = 'Rent'

X = df[features]
y = df[target]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Models dictionary
models = {
    "DecisionTree": DecisionTreeRegressor(random_state=42),
    "RandomForest": RandomForestRegressor(n_estimators=200, random_state=42),
    "XGBoost": XGBRegressor(n_estimators=200, learning_rate=0.05, max_depth=6, random_state=42)
}

best_model = None
best_score = float('-inf')
best_model_name = ""
best_preds = None

print("\n📊 Model Evaluation:\n")
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"🔹 {name} → MAE: {mae:.2f} | R² Score: {r2:.2f} | Unique Predictions: {len(np.unique(np.round(y_pred, 2)))}")

    if r2 > best_score:
        best_model = model
        best_model_name = name
        best_score = r2
        best_preds = y_pred

# Save the best model and all necessary objects
joblib.dump(best_model, "rent_prediction_model.pkl")
joblib.dump(X_train.columns.tolist(), "model_columns.pkl")
joblib.dump(furnish_encoder, "furnish_encoder.pkl")
joblib.dump(proximity_encoder, "proximity_encoder.pkl")
joblib.dump(residency_encoder, "residency_encoder.pkl")
joblib.dump(city_encoder, "city_encoder.pkl")
joblib.dump(location_encoder, "location_encoder.pkl")
joblib.dump(scaler, "scaler.pkl")

print(f"\n✅ Best Model: {best_model_name} saved successfully with R² = {best_score:.2f}")
