import mongoose from "mongoose";
// batch,studentname, email, college,status, dsa,webD, react , action
// Task
// (including company name and Date)
// PASS, FAIL, On Hold, Didn’t Attempt]
// placed, not_placed
const interviewSchema = new mongoose.Schema({
    studentId:
    {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Student",
    },
    name:
    {
        type:String, 
        required:true
    },
    date:
    {
        type:Date, required:true
    },
    company:
    {
        type: String,
        required:true
    },
    status:
    {
        type:String, 
        enum:["Didnot Attempt", "OnHold", "FAIL", "PASS"],
        default:"OnHold"
    }
})

// batch,studentname, email, college,status, dsa,webD, react , action
// Student id, student name, student college, student status, DSA Final Score, WebD Final Score, React Final Score, interview date, interview company, interview student result
const interviewModel = mongoose.model("Interview", interviewSchema);

export default interviewModel
