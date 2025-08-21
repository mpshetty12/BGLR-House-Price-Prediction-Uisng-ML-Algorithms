import sys
import json
import pickle
import numpy as np

# Load model
with open('bangaluru_home_prices_model.pickle', 'rb') as f:
    model = pickle.load(f)

# Load columns
with open('columns.json', 'r') as f:
    columns = json.load(f)['data_columns']

# Input from Node.js
sqft = float(sys.argv[1])
bathrooms = float(sys.argv[2])
bedrooms = float(sys.argv[3])
location = sys.argv[4]

# Prepare input array
x = np.zeros(len(columns))
x[0] = sqft
x[1] = bathrooms
x[2] = bedrooms
if location in columns:
    loc_index = columns.index(location)
    x[loc_index] = 1

# Predict
predicted_price = model.predict([x])[0]

print(json.dumps({"price": predicted_price}))
