/**
 * CustomError is a custom error class that extends built in Error class.
 * It allows for creating custom error messages and can be used to the throw custom errors.
 * @constructor
 * @param {string} message The error message to be displayed when the erro is thrown
 */

export default class CustomError extends Error {
    /**
     * @constructor
     * @param {string} message 
     */
    
    constructor(message) {
        //call the superclass constructor with the provided error message.
        super(message);
    }
}
//bbb