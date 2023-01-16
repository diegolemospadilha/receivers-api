export class ApplicationError extends Error {
    
    constructor(
        readonly message: string,
        readonly detailedMessage: any,
        readonly statusCode: number,
    ){
        super();
    }

    static badRequest(errors: any){
        return new ApplicationError(
            'Bad Request',
            errors,
            400,
        )
    }
}