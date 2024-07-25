import { ReturnCodes } from "../../enums";

// Define a custom error class
class CustomError extends Error {
    code: number;
  
    constructor(name: string, message: string, code: number) {
      super(message);
      this.name = name;
      this.code = code;
      // Ensure the correct prototype chain
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  // Define specific error types based on the ReturnCodes enum
  class ReturnCodeError extends CustomError {
    constructor(code: number, message: string) {
      super('ReturnCodeError', message, code);
    }
  }
  
  // Define specific error messages based on ReturnCodes enum values
  const errorMessages: { [key: number]: string } = {
    [ReturnCodes.Success]: 'Success',
    [ReturnCodes.Error]: 'Error',
    [ReturnCodes.UnexpectedError]: 'Unexpected Error',

    // Auth
    [ReturnCodes.UserEmailAlreadyExists]: 'Email already registered in the system',

  };
  
  // Function to throw custom errors based on ReturnCodes
  export function throwCustomError(code: number) {
    const message = errorMessages[code] || 'Unknown Error';
    throw new ReturnCodeError(code, message);
  }

  // Function to get the error messages
  export function getErrorMessage(errorCode: ReturnCodes): string {
    return errorMessages[errorCode] || 'Unknown Error';
  }