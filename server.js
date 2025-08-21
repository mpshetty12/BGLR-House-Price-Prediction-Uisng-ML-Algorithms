const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Load model + columns
const model = require(path.join(__dirname, "model.json"));
const columns = JSON.parse(
  fs.readFileSync(path.join(__dirname, "columns.json"))
).data_columns;
const locations = columns.slice(3); // skip first 3 columns

// Prediction function
function predictPrice(sqft, bathrooms, bedrooms, location) {
  let x = new Array(columns.length).fill(0);

  // numerical features
  x[0] = parseFloat(sqft);
  x[1] = parseFloat(bathrooms);
  x[2] = parseFloat(bedrooms);

  // location one-hot
  if (location && columns.includes(location)) {
    let idx = columns.indexOf(location);
    x[idx] = 1;
  }

  // dot product
  let price =
    x.reduce((sum, val, i) => sum + val * model.coef[i], 0) +
    model.intercept;

  return price;
}

// GET locations for dropdown
app.get("/locations", (req, res) => {
  res.json({ locations });
});

// POST predict price
app.post("/predict-price", (req, res) => {
  const sqft = req.body.sqft;
  const bath = req.body.bath ?? req.body.bathrooms;
  const bhk = req.body.bhk ?? req.body.bedrooms;
  const location = req.body.location;

  if (!sqft || !bath || !bhk || !location) {
    console.error("❌ Missing required fields:", req.body);
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const price = predictPrice(sqft, bath, bhk, location);
    res.json({ price });
  } catch (err) {
    console.error("❌ Prediction failed:", err);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
