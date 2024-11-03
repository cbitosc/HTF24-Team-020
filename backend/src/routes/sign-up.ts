import express, { Request, Response } from "express";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

// Route for user signup
router.post("/api/users/sign-up", async (req: Request, res: Response): Promise<any> => {
  console.log("Creating a user...");
  const { email, password, username } = req.body
  // Check for required fields
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required: email, password, and username." });
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password // Consider hashing the password before saving
    });

    await newUser.save();
    
    const userJwt = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email
      },
      'ayman', // secret
      { noTimestamp: true }
    );

    // Storing this on session object
    req.session = { jwt: userJwt };
    return res.status(201).json({ newUser, message: "User created successfully" });
    
  } catch (err) {
    console.error("Error in DB", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { router as signupRouter };
