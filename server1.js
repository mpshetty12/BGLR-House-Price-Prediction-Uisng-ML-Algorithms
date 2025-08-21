// server.js -> spawn -> predict.py

// const express = require('express');
// const { spawn } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // Serve static frontend
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());

// // Load locations from JSON
// const columns = JSON.parse(fs.readFileSync('columns.json')).data_columns;
// const locations = columns.slice(3); // skip first 3 columns

// // GET locations for dropdown
// app.get('/locations', (req, res) => {
//   res.json({ locations });
// });

// // POST predict price
// app.post('/predict-price', (req, res) => {
//   // Accept both old and new key names from frontend or curl
//   const sqft = req.body.sqft;
//   const bath = req.body.bath ?? req.body.bathrooms;
//   const bhk = req.body.bhk ?? req.body.bedrooms;
//   const location = req.body.location;

//   if (!sqft || !bath || !bhk || !location) {
//     console.error('❌ Missing required fields:', req.body);
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   const py = spawn('python3', [
//     'predict.py',
//     sqft,
//     bath,
//     bhk,
//     location
//   ]);

//   let result = '';
//   let errorOutput = '';

//   py.stdout.on('data', data => {
//     result += data.toString();
//   });

//   py.stderr.on('data', data => {
//     errorOutput += data.toString();
//   });

//   py.on('close', code => {
//     if (errorOutput) {
//       console.error(`🐍 Python stderr: ${errorOutput}`);
//     }
//     if (code !== 0) {
//       console.error(`❌ Python exited with code ${code}`);
//       return res.status(500).json({ error: 'Prediction failed' });
//     }
//     try {
//       res.json(JSON.parse(result));
//     } catch (e) {
//       console.error(`❌ Failed to parse Python output: "${result}"`);
//       res.status(500).json({ error: 'Prediction failed' });
//     }
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
