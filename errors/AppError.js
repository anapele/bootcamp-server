export default class AppError extends Error {
    constructor(message, status) {
        super(message); //new Error('Wrong user credentials!');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
    }
}