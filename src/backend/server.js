// Import necessary packages
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require("./path/to/your/serviceAccountKey.json"); // Replace with your service account key path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "YOUR_STORAGE_BUCKET_URL", // Replace with your Firebase Storage bucket URL
});

// Create an Express app
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for your frontend URL (replace with your frontend URL)
app.use(cors({ origin: "https://your-frontend-domain.com" }));

// Define an endpoint to generate custom tokens
app.get("/getCustomToken", (req, res) => {
  // Replace 'userUid' with a unique identifier for the user
  const userUid = "YOUR_UNIQUE_USER_ID";

  admin
    .auth()
    .createCustomToken(userUid)
    .then((customToken) => {
      res.json({ customToken });
    })
    .catch((error) => {
      console.error("Error creating custom token:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
