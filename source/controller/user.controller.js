import Repository from "../model/user.repository.js"
import jwt from "jsonwebtoken"

export default class Controller{
    constructor(){
        this.Repository = new Repository()
    }

    // render signup page
    getSignUp(req,res){
        try{        
            res.render("signup", {access:false});
        }catch(err){
            next(err);
        }
        
    }
    // render signin page
    getSignIn(req,res){
        try{
            res.render("signin", {access:false});
        }catch(err){
            next()
        }
        
    }

    // adding registered data to db and render login page
    async postSignUp(req,res,next){
        try{
            console.log(req.body)
            const data = await this.Repository.postUser(req.body)
            res.render("signin", {access:false})
        }catch(err){
            next(err)
        }
    }
    // checking the data of the user and then rendering the home page
    async postSignIn(req,res){
        console.log(req.body)
        const user = await this.Repository.findUser(req.body)
        console.log(user)
        if(user){
            const token = jwt.sign({userID: user._id},"SecretKEY12&&^" , { expiresIn: '1h' })
            res.cookie("token", token, { maxAge: 900000, httpOnly: false }).render("home", {access:true,log:false});
        }
        else{res.render("home", {access:false, log:true})};
    }

}