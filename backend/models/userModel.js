import mongoose from "mongoose";


const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    gender:{
        type: String,
        required:true,
        enum:['male','female']
    },
    bio:{
        type: String,
        default:""
    },
    image:{
        type: String,
        default:""
    },
    likes:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:"User"
        }
    ],
    dislikes:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:"User"
        }
    ],
    matches:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:"User"
        }
    ]
},{
    timestamps:true
});

const User =mongoose.model("User",userSchema);
export default User;