import errorHandlerMiddleware from "../../errorHandler/errorHandler.js";
import jwt from  "jsonwebtoken";

export const auth = async(req,res,next)=>{
    const token = req.cookies.token;
    if (!token){
        return res.render("home", {access:false, log:true})
    }
    const payload = jwt.verify(token, "SecretKEY12&&^");
    if(payload){
        return next()
    }else{
        throw new Error("something went wrong")
    }
}