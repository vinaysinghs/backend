
  import { Request, Response } from 'express';
import { Status, StatusCode, StatusMessage } from '../constants/HttpConstants';
  // import { LoggerHelper } from './Logger';
  
  export const ErrorResponseHelper = async (payload: any) => {
    const statusCode = payload?.status_code || payload?.custom_code;
    const customMessage = payload?.custom_message || payload?.message;
    const errorMessage = payload?.error?.message;
  
    switch (statusCode) {
      case StatusCode?.HTTP_INTERNAL_SERVER_ERROR:
        return{
          status_code: StatusCode?.HTTP_INTERNAL_SERVER_ERROR,
          status: Status?.STATUS_FALSE,
          message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
          error: errorMessage,
        };
      case StatusCode?.HTTP_VALIDATION_ERROR:
       return {
          status: Status?.STATUS_FALSE,
          status_code: StatusCode?.HTTP_VALIDATION_ERROR,
          message: customMessage,
        };
      case StatusCode?.HTTP_BAD_REQUEST:
        return {
          status: Status?.STATUS_FALSE,
          status_code: StatusCode?.HTTP_BAD_REQUEST,
          message: customMessage || StatusMessage?.HTTP_BAD_REQUEST,
          error: errorMessage,
        };
      case StatusCode?.HTTP_UNAUTHORIZED:
        return{
          status: Status?.STATUS_FALSE,
          status_code: StatusCode?.HTTP_UNAUTHORIZED,
          message: customMessage || StatusMessage?.HTTP_UNAUTHORIZED,
        };
      case StatusCode?.HTTP_TOKEN_EXPIRED:
        return{
          status: Status?.STATUS_FALSE,
          status_code: StatusCode?.HTTP_TOKEN_EXPIRED,
          message: StatusMessage?.HTTP_TOKEN_EXPIRED,
        };
      // case StatusCode?.HTTP_VALIDATION_EMAIL_VARIFIED:
      //   return{
      //     status: Status?.STATUS_FALSE,
      //     status_code: StatusCode?.HTTP_VALIDATION_EMAIL_VARIFIED,
      //     message: customMessage,
      //     error:'not-verified'
      //   };
    }
  };
  
  export const CatchErrorResponseHelper = async (error: any) => {
    return ErrorResponseHelper({
      status_code: error?.response?.status_code || StatusCode?.HTTP_INTERNAL_SERVER_ERROR,
      custom_message: error?.response?.message || error?.message,
      error: error,
    });
  }
  
  
  
  
  
  // export const ErrorResponseHelper = (payload: any) => {
  //     const statusCode = payload?.custom_code;
  //     const customMessage = payload?.custom_message;
  //     const errorMessage = payload?.error?.message;
  
  // if (statusCode === StatusCode?.HTTP_INTERNAL_SERVER_ERROR) {
  //     throw new InternalServerErrorException({
  //         status_code: StatusCode?.HTTP_INTERNAL_SERVER_ERROR,
  //         status: Status?.STATUS_FALSE,
  //         message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
  //         error: errorMessage,
  //     });
  // } else if (statusCode === StatusCode?.HTTP_VALIDATION_ERROR) {
  //     throw new UnprocessableEntityException({
  //         status: Status?.STATUS_FALSE,
  //         custom_code: StatusCode?.HTTP_VALIDATION_ERROR,
  //         message: customMessage,
  //     });
  // } else if (statusCode === StatusCode?.HTTP_BAD_REQUEST) {
  //     throw new BadRequestException({
  //         status: Status?.STATUS_FALSE,
  //         custom_code: StatusCode?.HTTP_BAD_REQUEST,
  //         message: customMessage,
  //         error: errorMessage,
  //     });
  // } else if (statusCode === StatusCode?.HTTP_UNAUTHORIZED) {
  //     throw new UnauthorizedException({
  //         status: Status?.STATUS_FALSE,
  //         custom_code: StatusCode?.HTTP_UNAUTHORIZED,
  //         message: StatusMessage?.HTTP_UNAUTHORIZED,
  //     });
  // } else if (statusCode === StatusCode?.HTTP_TOKEN_EXPIRED) {
  //     throw new UnauthorizedException({
  //         status: Status?.STATUS_FALSE,
  //         custom_code: StatusCode?.HTTP_TOKEN_EXPIRED,
  //         message: StatusMessage?.HTTP_TOKEN_EXPIRED,
  //     });
  // }
  
  // };
  