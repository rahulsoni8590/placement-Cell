export default class errorHandlerMiddleware extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}