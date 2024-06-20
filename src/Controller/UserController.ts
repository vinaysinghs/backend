import UserModel from '../Model/UserModel';
import bcrypt from 'bcrypt';
import { Status, StatusCode, StatusMessage } from "../constants/HttpConstants";
import { validationResult } from "express-validator";
//import { JWT_KEY } from '../config/config';
import jwt from 'jsonwebtoken';
import SessionModel from '../Model/SessionModel';
import path from 'path';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import validator from 'validator';
import { MessageConstants } from '../constants/MessageConstants';
import { CommonConfig } from '../config/CommonConfig';
import { ErrorResponseHelper } from '../utils/ErrorHandler';


export const SignUp = async (req: any, res: any) => {
    try {
        const { name, email, password } = req?.body;
        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(StatusCode.HTTP_VALIDATION_ERROR).json({
                status: Status.STATUS_FALSE,
                message: `${email} ${MessageConstants.EMAIL_ALREADY_EXITS}`,
            });
        }
        const fname = name?.split(' ')[0];
        const lname = name?.replace(fname, '');
        const hashPassword = await bcrypt.hash(password, 8);
        const createData = {
            fname,
            lname,
            email,
            password: hashPassword,
        };
        await UserModel.create(createData).then(async (data) => {

            return res.status(StatusCode?.HTTP_OK).json({
                status: Status?.STATUS_TRUE,
                status_code: StatusCode?.HTTP_OK,
                message: `An 4 digit ${MessageConstants?.OTP_SEND}`
            });

        })
    }
    catch (error: any) {
        return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
            status: Status?.STATUS_FALSE,
            message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
            errors: error.message
        })
    }

}
