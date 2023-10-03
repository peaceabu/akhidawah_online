// api.js
import axios from "axios";

const backendBaseUrl = "http://localhost:3001"; // Replace with your backend URL

const api = axios.create({
  baseURL: backendBaseUrl,
});

export const getCustomToken = async () => {
  try {
    const response = await api.get("/getCustomToken");
    return response.data.customToken;
  } catch (error) {
    console.error("Error fetching custom token:", error);
    throw error;
  }
};
