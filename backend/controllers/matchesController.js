import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const swipeRight=asyncHandler(async(req,res)=>{
    const {likedId}=req.params;
    const currentUser=await User.findById(req.user.id);
    const likedUser=await User.findById(likedId);

    
    if(!currentUser.likes.includes(likedId)){
        currentUser.likes.push(likedId);
      await currentUser.save();

      if(likedUser.likes.includes(currentUser.id)){
        currentUser.matches.push(likedId);
        likedUser.matches.push(currentUser.id);
        await Promise.all([ await currentUser.save(),
        await likedUser.save()]); 

        const connectedUsers = getConnectedUsers();
        const io = getIO();

        const likedUserSocketId = connectedUsers.get(likedId);

        if (likedUserSocketId) {
            io.to(likedUserSocketId).emit("newMatch", {
              _id: currentUser._id,
              name: currentUser.name,
              image: currentUser.image,
            });
          }

          const currentSocketId = connectedUsers.get(currentUser._id.toString());

          if (currentSocketId) {
            io.to(currentSocketId).emit("newMatch", {
              _id: likedUser._id,
              name: likedUser.name,
              image: likedUser.image,
            });
          }
      }
    };

    res.status(200).json({
        success:true,
        user: currentUser,
      })


});

export const swipeLeft=asyncHandler(async(req,res)=>{
    const {unlikedId}=req.params;
    const currentUser=await User.findById(req.user.id);

    if(!currentUser.dislikes.includes(unlikedId)){
        currentUser.dislikes.push(unlikedId);
      await currentUser.save();

    };

    res.status(200).json({
        success:true,
        user: currentUser,
    });

});

export const fetchMatches = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("matches", "name image");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            matches: user.matches,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


export const fetchUserProfile=asyncHandler(async(req,res)=>{
    const currentUser=await User.findById(req.user.id);
    const oppositeGender = currentUser.gender === "female" ? "male" : "female";

    const users = await User.find({
        $and: [
            { _id: { $ne: currentUser.id } },                
            { _id: { $nin: currentUser.likes } },            
            { _id: { $nin: currentUser.dislikes } },         
            { _id: { $nin: currentUser.matches } },          
            { gender: oppositeGender }                       
        ]
    });

    res.status(200).json({
        success:true,
        users,
    });

});