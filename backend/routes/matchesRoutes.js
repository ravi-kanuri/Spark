import express from "express";
import { validateTokenUser } from "../middleware/validToken.js";
import{ swipeRight,swipeLeft,fetchMatches,fetchUserProfile} from "../controllers/matchesController.js"

const router=express.Router();
 
router.use(validateTokenUser);

router.post("/right/:likedId",swipeRight);
router.post("/left/:unlikedId",swipeLeft);

router.get("/",fetchMatches);
router.get("/userProfiles",fetchUserProfile);


export default router;