const express = require('express');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK using the service account from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Sample route to test Firebase Admin SDK
app.get('/', (req, res) => {
  res.send('Hello, Firebase is initialized!');
});

// Example route to fetch Firebase access token
app.get('/get-access-token', async (req, res) => {
  try {
    const accessToken = await admin.credential.applicationDefault().getAccessToken();
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).send('Error fetching access token');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
