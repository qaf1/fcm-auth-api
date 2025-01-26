require('dotenv').config();
const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');

const app = express();
const PORT = 3000;

// Path to your service account JSON file
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const serviceAccountPath = path.resolve(__dirname, process.env.SERVICE_ACCOUNT_PATH);
// console.log('Resolved path:', serviceAccountPath);

// Endpoint to get the FCM access token
app.get('/get-access-token', async (req, res) => {
  try {
    // Create a GoogleAuth instance
    const auth = new GoogleAuth({
      keyFile: serviceAccountPath,
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
