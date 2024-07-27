export enum ReturnCodes {
    Success = 1,
    Error = -1,
    UnexpectedError = -2,

    // Auth
    UserEmailAlreadyExists = -10001,
    InvalidUserEmail = -10002,
    InvalidUserPassword = -10003,
}