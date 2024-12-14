import mongoose from "mongoose";

export const dbConnection =async()=>{
    try{
        const connect= await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Established",connect.connection.host,connect.connection.name);
      }catch(error){
         console.log(error);
         process.exit(1);
      }
};

