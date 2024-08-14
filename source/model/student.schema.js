import mongoose from "mongoose";
// batch,studentname, email, college,status, dsa,webD, react , action
// Task
// (including company name and Date)
// PASS, FAIL, On Hold, Didn’t Attempt]
// placed, not_placed
const studentSchema = new mongoose.Schema({
    batch:
    {
        type:Number, required:true
    },
    name:
    {
        type:String, required:true
    },
    email:
    {
        type:String, required:true
    },
    college:
    {
        type:String, required:true
    },
    status:
    {
        type:String, required:true, 
        enums:["placed", "not_placed"],
        default: "not_placed"
    },
    dsa:
    {
        type:Number, required:true
    },
    webd:
    {
        type:Number, required:true
    },
    react:
    {
        type:Number, required:true
    },
})


const studentModel = mongoose.model("Student", studentSchema);
export default studentModel