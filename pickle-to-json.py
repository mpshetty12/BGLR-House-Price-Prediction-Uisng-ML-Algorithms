import pickle
import json

# Load your trained model
with open('bangaluru_home_prices_model.pickle', 'rb') as f:
    model = pickle.load(f)

# Convert to JSON-friendly format
model_data = {
    "coef": model.coef_.tolist(),
    "intercept": model.intercept_.item()  # convert numpy to float
}

# Save to model.json
with open("model.json", "w") as f:
    json.dump(model_data, f)

print("✅ Model exported to model.json")
