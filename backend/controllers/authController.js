import asyncHandler from 'express-async-handler';
import bcrypt from "bcrypt";
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const signToken=(id)=>{
     
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:"7d"});
};

export const signup= asyncHandler(async(req,res)=>{
    const{name,email,password,age,gender,bio}=req.body;
    if(!name || !email || !password || !age || !gender){
        res.status(400);
        throw new Error("All fields are compulsary")
    };
    if(age<18){
        res.status(403);
        throw new Error("This Dating sites is only for 18 & above");
    }
    const userExist=await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User with this Email Exist");
    };

    const hashedPassword= await bcrypt.hash(password,10);
    
    const newUser=await User.create({
        name,
        email,
        password:hashedPassword,
        age,
        gender,
        bio,
    });

    const token =signToken(newUser._id);

    res.cookie("jwt",token,{
         maxAge: 7*24*60*60*1000,
         httpOnly:true,
         sameSite:"strict",
         secure: process.env.NODE_ENV==="production",
    });
    res.status(201).json({
        sucess:true,
        user:newUser
    });
});

export const login= asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password ){
        res.status(400);
        throw new Error("All fields are compulsary")
    };
    const oldUser= await User.findOne({email});
    if(oldUser && await bcrypt.compare(password,oldUser.password)){
        const token =signToken(oldUser._id);

        res.cookie("jwt",token,{
             maxAge: 7*24*60*60*1000,
             httpOnly:true,
             sameSite:"strict",
             secure: process.env.NODE_ENV==="production",
        });
        res.status(200).json({
            sucess:true,
            user:oldUser
        });

    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    
});

export const logout= asyncHandler(async(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({sucess:true,message:"logout is sucessful"});
});