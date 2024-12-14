import express from "express";
import { validateTokenUser } from "../middleware/validToken.js";
import { sendMessage,messages } from "../controllers/messageController.js";

const router=express.Router();

router.use(validateTokenUser);

router.post("/send",sendMessage);
router.get("/message/:userId",messages)

export default router;