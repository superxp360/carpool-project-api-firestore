// Importing the necessary modules from firebase-functions/v2/https, express, and other local files.
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { addPoolForm, getPoolForms  } from "./src/poolForms.js";

// Creating an instance of Express
const app = express();

// Using CORS middleware to allow cross-origin requests
app.use(cors());

// Using middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Handling HTTP GET requests to "/poolForms" endpoint with the 'getPoolForms' function
app.get("/poolForms", getPoolForms);
app.post("/poolForms", addPoolForm);

// Exporting an HTTP function that triggers when an HTTP request is received
// The 'api' function is responsible for handling the incoming requests and routing them to the appropriate Express endpoints
// It sets a maximum of 10 instances to handle incoming requests in parallel
export const api = onRequest({ maxInstances: 10 }, app);
