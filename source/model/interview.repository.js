import { ObjectId } from "mongodb";
import interviewModel from "./interview.schema.js";

export default class InterviewRepo{

    // adding new interview scheduled to the database
    async addInterview(data){
        const {id,name,company,date} = data
        const result = await new interviewModel({
            studentId:id,
            name: name,
            date:date,
            company:company
        }).save()
        return result
    }

    // fetching the data of all the interviews
    async allInterview(){
        const interviewers = await interviewModel.find().populate({
            path: 'studentId',
            select: ["batch","email","college"], // You can select specific fields if needed
            model: 'Student', // Assuming 'Student' is the model name for student documents
            options: { 
                key: 'abc' // Assigning 'studentData' as the key for the populated field
            }})
        return interviewers
    }

    // fetching the data of all the interviews
    async download(){
        const interviewers = await interviewModel.find().populate({
            path: 'studentId',
            model: 'Student', // Assuming 'Student' is the model name for student documents
           })
        
        return interviewers
    }
    // fetching the data to render the update-interview-page along with the preexisting data
    async interviewUpdate(id){
        const data = await interviewModel.findById(id)
        return data       
    }

    // making changes in db on interview status
    async postInterviewUpdate(newStatus,id){
        console.log(id)
        const update = await interviewModel.findById(id)
        console.log(update)
        update.status = newStatus;
        await update.save()
        return 
    }
}
