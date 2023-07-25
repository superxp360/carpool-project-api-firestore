// Importing necessary modules from firebase-admin and our local creds file
import { initializeApp, cert } from "firebase-admin/app";
import creds from "../creds.js";
import { getFirestore } from "firebase-admin/firestore";

// Connecting to our Firebase project with the provided credentials from the creds.js file
initializeApp({
    credential: cert(creds)
});

// Exporting the connection to the Firestore database, enabling us to interact with the database.
// This allows other parts of the application to use Firestore functionalities.
export default getFirestore();
