import express from "express";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/sign-in", async (req, res): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = (password === user.password); // Direct comparison
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      'ayman',
      { noTimestamp: true }
    );

    // Storing this on session object
    req.session = { jwt: userJwt };

    // Respond with success and user data (without sending the password)
    return res.status(200).json({ message: "Login successful", user: { email: user.email } });
  } catch (err) {
    console.error("Signin error:", err); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" }); // Respond with an error
  }
});

export { router as signinRouter };
