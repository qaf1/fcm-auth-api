require('dotenv').config();
const fs = require('fs');
const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to your service account JSON file
const keyPath = path.join(__dirname, 'serviceAccountKey.json');
fs.writeFileSync(keyPath, process.env.SERVICE_ACCOUNT_JSON);
// const serviceAccountPath = path.resolve(__dirname, process.env.SERVICE_ACCOUNT_PATH);
// console.log('Resolved path:', serviceAccountPath);

// Endpoint to get the FCM access token
app.get('/get-access-token', async (req, res) => {
  try {
    // Create a GoogleAuth instance
    const auth = new GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    });

    // Get the access token
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    res.json({ accessToken: token });
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
