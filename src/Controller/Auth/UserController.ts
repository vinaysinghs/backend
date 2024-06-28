import UserModel from '../../Model/UserModel';
import SessionModel from '../../Model/SessionModel';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Status, StatusCode, StatusMessage } from "../../constants/HttpConstants";
import { MessageConstants } from '../../constants/MessageConstants';
import { isValidEmail, isValidPassword, validateRequiredFields } from '../../utils/ErrorHandler';
import { MessageContants } from '../../constants/constants';
import { CommonConfig } from '../../config/CommonConfig';

export const SignUp = async (req: any, res: any) => {
    try {
        const {
            fname,
            lname,
            email,
            password,
            title,
            phone_number,
            position_applied,
            MSCP_LKM,
            languages,
            State,
            Start_date,
            hear_us,
            other_comments,
            role,
            userid
        } = req.body;
        const resume = req.file?.path;

        const requiredFieldsError = await validateRequiredFields({ fname, lname, email, password, phone_number, position_applied, State, Start_date, MSCP_LKM });

        if (requiredFieldsError) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                message: requiredFieldsError,
            });
        }

        if (!isValidEmail(email)) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                message: MessageContants?.EMAIL_INVALID,
            });
        }

        if (!isValidPassword(password)) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                message: MessageContants?.PASSWORD_VALIDATION,
            });
        }

        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(StatusCode.HTTP_CONFLICT).json({
                status: Status.STATUS_FALSE,
                message: `${email} ${MessageConstants.EMAIL_ALREADY_EXITS}`,
            });
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const createData = {
            fname,
            lname,
            email,
            title,
            phone_number,
            position_applied,
            MSCP_LKM,
            languages,
            State,
            Start_date,
            hear_us,
            other_comments,
            resume,
            password: hashPassword,
            role,
            userid
        };

        const user = await UserModel.create(createData);
        return res.status(StatusCode.HTTP_OK).json({
            status: Status.STATUS_TRUE,
            status_code: StatusCode.HTTP_OK,
            message: `An 4 digit ${MessageConstants.OTP_SEND} has been sent to your email.`,
            data: user
        });

    } catch (error: any) {
        return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR).json({
            status: Status.STATUS_FALSE,
            message: StatusMessage.HTTP_INTERNAL_SERVER_ERROR,
            errors: error.message
        });
    }
};

export const Login = async (req: any, res: any) => {
    const { email, password, role } = req.body;
    try {
        await UserModel.findOne({ email }).then(async (create_res: any) => {
            if (!create_res) {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: MessageContants?.USER_NOT_FOUND,
                });
            }
            const checkPassword = await bcrypt.compare(password, create_res?.password)
            if (checkPassword) {
                const response = {
                    id: create_res?.id,
                    email: create_res?.email,
                }
                const token = jwt.sign(response, CommonConfig?.JWT_KEY, {})
                await SessionModel.create({
                    Userid: create_res?.id,
                    token: token

                })
                return res.status(StatusCode?.HTTP_OK).json({
                    status: Status?.STATUS_TRUE,
                    message: StatusMessage?.HTTP_OK,
                    data: create_res,
                    token: token
                })
            } else {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: StatusMessage?.HTTP_VALIDATION,
                })
            }
        }).catch((error: any) => {
            return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                status: Status?.STATUS_FALSE,
                message: StatusMessage?.HTTP_BAD_REQUEST,
                errors: error.message
            })
        })
    } catch (error: any) {
        return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
            status: Status?.STATUS_FALSE,
            message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
            errors: error.message
        })
    }
}