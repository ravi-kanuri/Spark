import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';

export const validateTokenUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error("Invalid token");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
        res.status(400);
        throw new Error("Token verification failed");
    }

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        res.status(404);
        throw new Error("User not found");
    }

    req.user = currentUser;
    next();
});
