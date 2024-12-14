import React, { useState } from "react";
import { X, Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { swipeLeft, swipeRight } from "../features/matchesSlice";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const { userProfiles } = useSelector((state) => state.matches);

  const [currentIndex, setCurrentIndex] = useState(0);

  
  const currentUser = userProfiles?.[currentIndex];

  const handleAction = (action) => {
   
    if (action === "accept") {
      dispatch(swipeRight(currentUser));
      toast.success(`You liked ${currentUser.name}`);
    } else if (action === "reject") {
      dispatch(swipeLeft(currentUser));
      toast.error(`You passed on ${currentUser.name}`);
    }

    if (currentIndex < userProfiles.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } 
  };

 

  return (
    <div className="flex items-center justify-center bg-blue-50">
      <div className="relative bg-white w-96 h-[36rem] rounded-2xl shadow-lg">
        {/* Profile Picture */}
        <div
          className="h-2/3 w-full bg-cover bg-center rounded-t-2xl"
          style={{
            backgroundImage: `url('${currentUser.image || "/avatar.png"}')`,
          }}
        ></div>

        {/* Profile Details */}
        <div className="p-6">
          <h1 className="text-xl font-bold">
            {currentUser.name}, {currentUser.age}
          </h1>
          <p className="text-base text-gray-600">{currentUser.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-evenly items-center">
          {/* Cross Button */}
          <button
            onClick={() => handleAction("reject")}
            className="w-16 h-16 flex items-center justify-center bg-red-500 rounded-full shadow-md hover:scale-110 transition-transform"
            aria-label="Reject"
          >
            <X className="text-white w-8 h-8" />
          </button>

          {/* Heart Button */}
          <button
            onClick={() => handleAction("accept")}
            className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full shadow-md hover:scale-110 transition-transform"
            aria-label="Accept"
          >
            <Heart className="text-white w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
