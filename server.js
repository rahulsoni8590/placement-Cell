import "./env.js"

//module
import express from "express"
import ejsLayouts from "express-ejs-layouts"
import path from "path";
import cookieParser from "cookie-parser";

//local module
import getClient from "./source/config/db.js";
import errorHandlerMiddleware from "./errorHandler/errorHandler.js";
import Controller from "./source/controller/user.controller.js";
import StudentController from "./source/controller/student.controller.js";
import InterviewController from "./source/controller/interview.controller.js";
import { auth } from "./source/middleware/jwt.middleware.js";

//Setting up express application
const app = express()

//setting view engine as EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "source", "views"))

// Setting the EJS Layouts
app.use(ejsLayouts)

// for static files
app.use(express.static("public"));

// Encoding the data received from the client
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//cookie parser to parse the data received from the cookies
app.use(cookieParser())

// controller class initialize
const controller = new Controller();
const studentController = new StudentController()
const interviewController = new InterviewController()

//User Routes
app.get("/",(req,res,next)=>{
    auth(req,res,next)},(req,res)=>{
    res.render("home", {log:false, access:true});
})

app.get("/signup", (req,res,next)=>{
    controller.getSignUp(req,res,next)
})

app.post("/signup", (req,res,next)=>{
    controller.postSignUp(req,res,next)
})

app.get("/signin", (req,res,next)=>{
    controller.getSignIn(req,res,next)
})

app.post("/signin", (req,res,next)=>{
    controller.postSignIn(req,res,next)
})

//Student Routes
app.get("/allstudent",(req,res,next)=>{
auth(req,res,next)}, (req,res,next)=>{
    studentController.viewAllStudent(req,res,next)
})

app.get("/addstudent",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    studentController.getAddStudent(req,res,next)
})

app.post("/addstudent",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    studentController.postAddStudent(req,res,next)
})

app.get("/student/status/:id",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    studentController.updateStatus(req,res,next)
})


//Inteview Routes

app.get("/addinterview/:id",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    interviewController.addInterview(req,res,next)
})

app.post("/addinterview",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    interviewController.postAddInterview(req,res,next)
})

app.get("/allinterview",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    interviewController.getAllInterview(req,res,next)
})

app.get("/update-interview/:id",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    interviewController.updateInterview(req,res,next)
})

app.post("/update-interview",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    interviewController.postUpdateInterview(req,res,next)
})

// download route
app.get("/download",(req,res,next)=>{
    auth(req,res,next)}, (req,res,next)=>{
    interviewController.downloadData(req,res,next)
})

// error handling route
app.use((err,req,res,next)=>{
    if(err instanceof errorHandlerMiddleware){
        return res.status(err.statusCode).send(err.message)
    }
    console.log(err)
    res.status(500).send("Something went wrong")
})


app.listen(process.env.PORT_NO ||3000, ()=>{
    console.log("Application running on server 3000")
    getClient()
})