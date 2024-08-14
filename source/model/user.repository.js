import ObjectId from "mongodb";
import { userModel } from "./user.schema.js";

export default class Repository{
    // adding new user to db
    async postUser(data){
        console.log(data)
        const user = await new userModel(data).save();
        return
    }

    // find the already existing user in the db for signin
    async findUser(data){
        const user = await userModel.findOne(data)
        return user
    }
    
}