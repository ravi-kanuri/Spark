import express from "express";
import { updateProfile } from "../controllers/userController.js"; 
import { validateTokenUser } from "../middleware/validToken.js";  

const router = express.Router();

router.put("/update", validateTokenUser, updateProfile);

export default router;
