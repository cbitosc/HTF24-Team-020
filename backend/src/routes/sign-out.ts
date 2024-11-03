import express from "express";

const router = express.Router();




router.post("/api/users/sign-out", (req, res) : any => {
  
  req.session = null
  return res.status(204).json({ message: "successfull logout"})
});

export { router as signoutRouter };
