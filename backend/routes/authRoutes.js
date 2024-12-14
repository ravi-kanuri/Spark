import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { validateTokenUser } from "../middleware/validToken.js";  

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", validateTokenUser, (req, res) => {
    res.send({
        success: true,
        user: req.user,
    });
});

export default router;
