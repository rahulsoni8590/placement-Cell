import InterviewRepo from "../model/interview.repository.js";
import studentModel from "../model/student.schema.js";
import fs from "fs";
import { json2csv } from 'json-2-csv';


export default class InterviewController{
    constructor(){
        this.interviewRepo = new InterviewRepo()
    }

    //render new interview page
    async addInterview(req,res,next){
        try{
            const id = req.params.id
            const data = await studentModel.findById(id)
            res.render("addinterview", {data:data, access:true})
        }catch(err){
            next(err)
        }
    }

    //schedule new interview 
    async postAddInterview(req,res,next){
        try{
            // console.log(req.body)
            const data = await this.interviewRepo.addInterview(req.body)
            const interview = await this.interviewRepo.allInterview()
            // console.log(interview)
            res.render("interviewlist", {interviewData:interview, access:true})
        }catch(err){
            console.log(err)
            next(err)
        }
        
    }

    //rendering all the interviews 
    async getAllInterview(req,res,next){
        try{
            const interview = await this.interviewRepo.allInterview()
            // console.log(interview)
            res.render("interviewlist", {interviewData:interview, access:true})
        }catch(err){
            console.log(err)
            next(err)
        }
        
    }

    //renderint the update interview status page
    async updateInterview(req,res,next){
        try{
            const id = req.params.id;
            const obj = await this.interviewRepo.interviewUpdate(id)
            console.log(obj)
            res.render("interviewUpdate", {data:obj, access:true})
        }catch(err){
            console.log(err)
            next(err)
        }
        
    }

    //updating the interview status [pass fail not_taken, hold] 
    async postUpdateInterview(req,res,next){
        try{
            const {status,id} = req.body;
            await this.interviewRepo.postInterviewUpdate(status,id)
            res.redirect("/allinterview")
        }catch(err){
            console.log(err)
            next(err)
        }
        
    }

    // downloading the data (student details along with the interview) in cvs format 
    async downloadData(req,res,next){
        const data = await this.interviewRepo.download()
        const arrayData = data.map(students=>{
            return {
                Name:students.studentId.name,
                Email:students.studentId.email,
                Batch:students.studentId.batch,
                College:students.studentId.college,
                placement_Status:students.studentId.status,
                DSA_Score:students.studentId.dsa,
                React_Score:students.studentId.react,
                Webd_Score:students.studentId.webd,
                Company:students.company, 
                Interview_Date: students.date, 
                Interview_status: students.status}
            })
        // const stringData = JSON.stringify(arrayData);
        const cvs = json2csv(arrayData)
        const fileName = new Date().toISOString().replace(/:/g, '_');
        const dir = `./public/downloads/${fileName}.cvs`;

        fs.writeFileSync(dir, cvs, "utf-8",(err)=>{
            console.log(err)
            throw new errorHandlerMiddleware("Error writing file", 400)
        })

        res.download(dir) 
    }
}