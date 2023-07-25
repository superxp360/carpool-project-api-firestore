// Import the database connection from the 'dbConnect.js' file
import db from "./dbConnect.js";

// Access the 'poolForms' collection in the Firestore database
const coll = db.collection("poolForms");

// Function to get a pool form from the database and get all the pool forms from the database. 
export async function getPoolForms(req, res) {
    // Use 'await' to asynchronously fetch all documents from the 'poolForms' collection
    const poolForms = await coll.get();

    // Map the resulting documents to an array of objects containing the document ID and data
    const poolFormsArray = poolForms.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Send the array of objects as a response to the client
    res.send(poolFormsArray);
}


// Function to add a new pool form to the database
export async function addPoolForm(req, res) {
    // Extract the relevant fields from the request body
    const { firstName, lastName, email, carYear, carMake, carModel, numSeats, toAddress, fromAddress } = req.body; 
    
    // Check if the required field 'firstName' is missing
    if(!firstName) { 
      // Send an error response to the client
      res.status(401).send({ success: false, message: 'Not a valid request' }); 
      // Exit the function
      return; 
    }
    
    // Create a new pool form object with the extracted fields
    const newPoolForm = { 
      firstName,
      lastName,
      email,
      carYear,
      carMake,
      carModel,
      numSeats,
      toAddress,
      fromAddress
    }
    
    // Add the new pool form object to the "poolForms" collection
    await coll.add(newPoolForm); 
    // Call the getPoolForms function to retrieve and send all the pool forms as a response to the client
    getPoolForms(req, res); 
  }