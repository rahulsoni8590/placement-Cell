import mongoose from "mongoose";

const getClient = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB || "mongodb://localhost:27017/placementCell");
        console.log("MongoDb is Connected")
    }catch(err){
        console.log(err)
        throw new Error("MongoDb Connection failed")
    }
}

export default getClient;