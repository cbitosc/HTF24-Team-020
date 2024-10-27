import express, { Request, Response} from "express"
import { dbConnect } from "./lib/dbConnect"
import mongoose from "mongoose"
import { Review } from "./models/Business"
import { Business } from "./models/Business"
import BusinessModel from "./models/Business"
import cookieSession from "cookie-session"
import cors from "cors"
import { signinRouter } from "./routes/sign-in"
import { signoutRouter } from "./routes/sign-out"
import { signupRouter } from "./routes/sign-up"

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieSession({
    signed: false,
    maxAge: 24 * 60 * 60 * 60
  }))

app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)










app.get('/api/getbusinessinfo/:id', async(req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const business = await BusinessModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
        if(!business) {
            return res.status(404).json({ message: 'No businesses found at this location' });
        }
        res.status(200).json(business);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while fetching businesses' }); // Send an error response
    }
})


app.get('/api/getbusinesses/:location', async (req: Request, res: Response): Promise<any> => {
    const { location } = req.params; // Extracting location from params
    try {
        const businesses = await BusinessModel.find({ location }).select('-reviews'); // Querying the database for businesses at the specified location

        if (businesses.length === 0) {
            return res.status(404).json({ message: 'No businesses found at this location' }); // Handle no businesses found
        }

        res.status(200).json(businesses); // Sending the found businesses as a response
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while fetching businesses' }); // Send an error response
    }
});

app.post('/api/postbusiness', async (req: Request, res: Response): Promise<any> => {
    const { type, name, location, cellNo } = req.body;

    try {
        // Validate the input
        if (!type || !name || !location || !cellNo) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Optionally validate the cellNo format (you can adjust the regex based on your requirements)
        const cellNoRegex = /^\d{10}$/; // Example: Validates a 10-digit cell number
        if (!cellNoRegex.test(cellNo)) {
            return res.status(400).json({ message: 'Cell number must be a valid 10-digit number' });
        }

        // Create the new business entry
        const newBusiness = await BusinessModel.create({ location, name, type, cellNo });

        // Respond with the created business
        res.status(201).json(newBusiness);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while posting the business' });
    }
});

app.post('/api/comment/:businessID', async (req: Request, res: Response): Promise<any> => {
    const { businessID } = req.params; // Extract business ID from the URL parameters
    const { username, comment, rating } = req.body;

    try {
        const newReview = { username, comment, rating }
        // Validate the input
        if (!username || !comment || rating === undefined) {
            return res.status(400).json({ message: 'Username, comment, and rating are required' });
        }

        // Find the business by ID
        const business = await BusinessModel.findById({ _id: new mongoose.Types.ObjectId(businessID) });
        if (!business) {
            return res.status(404).json({ message: 'Business not found' }); // Handle business not found
        }

        // Add the new review to the reviews array
        business.reviews.push(newReview as Review);
        
        // Save the updated business document
        await business.save();

        // Respond with the updated business document or just the review
        res.status(200).json(business);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while adding the comment' }); // Send an error response
    }
});




async function startServer() {
    await dbConnect()
    console.log("connected to db")
    app.listen(4000)
}

startServer()
