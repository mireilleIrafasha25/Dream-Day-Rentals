import CustomError from "./customError.js";
export class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}