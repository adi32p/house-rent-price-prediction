import numpy as np
import pandas as pd

file_path = r"C:\Users\Aditya Umesh Pawar\Desktop\ML_PROJECT\duplicated_form_responses.csv"
df = pd.read_csv(file_path)

# Display the first few rows to understand the structure
df.head()
# Step 1: Remove duplicates and drop irrelevant columns
df_clean = df.drop_duplicates()
df_clean = df_clean.drop(columns=["Timestamp"])

# Step 2: Clean 'Rent' column
df_clean["Rent"] = df_clean["Rent"].astype(str).str.replace(r"[^\d.]", "", regex=True)
df_clean["Rent"] = pd.to_numeric(df_clean["Rent"], errors="coerce")

# Step 3: Extract numeric value from 'Bedrooms'
df_clean["Bedrooms"] = df_clean["Bedrooms"].str.extract(r"(\d+)").astype(float)

# Step 4: Handle missing values in 'Amenities'
df_clean["Amenities"] = df_clean["Amenities"].fillna("None")

# Step 5: One-hot encode 'Furnished', 'Type_of_Residency', 'Proximity_to_Public_Transport', 'City', and 'Location'
categorical_cols = ['Furnished', 'Type_of_Residency', 'Proximity_to_Public_Transport', 'City', 'Location']
df_encoded = pd.get_dummies(df_clean, columns=categorical_cols)

# Step 6: Expand multi-label 'Amenities' column into binary features
from sklearn.preprocessing import MultiLabelBinarizer

# Split amenities into list
df_encoded['Amenities'] = df_encoded['Amenities'].str.split(',\s*')
mlb = MultiLabelBinarizer()
amenities_df = pd.DataFrame(mlb.fit_transform(df_encoded['Amenities']), columns=mlb.classes_, index=df_encoded.index)
df_encoded = pd.concat([df_encoded.drop(columns=['Amenities']), amenities_df], axis=1)

# Drop rows with missing or zero Rent
df_encoded = df_encoded[df_encoded['Rent'].notna() & (df_encoded['Rent'] > 0)]

df_encoded.head()
