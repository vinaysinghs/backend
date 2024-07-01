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
            phone_number,
            country_code,
            title,
            position_applied,
            licence_number,
            languages,
            State,
            Start_date,
            role
        } = req.body;
        const resume = req.file?.path;
        const requiredFieldsError = await validateRequiredFields({ fname, lname, email, password, phone_number, country_code });

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
            licence_number,
            languages,
            State,
            Start_date,
            country_code,
            resume,
            password: hashPassword,
            role,
            is_active: role == "user" ? 1 : 0
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

export const SignIn = async (req: any, res: any) => {
    const { email, password, role } = req.body;
    try {
        await UserModel.findOne({ email, role }).then(async (create_res: any) => {
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
                    message: MessageContants?.SIGN_IN_SUCCESS,
                    data: create_res,
                    token: token
                })
            } else {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: StatusMessage?.HTTP_VALIDATION_LOGIN_PASSWORD,
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

export const GetAllUsers = async (req: any, res: any) => {
    try {
        const { role, page = 1, size = 10 } = req.body;

        const limit = parseInt(size as string);
        const skip = (parseInt(page as string) - 1) * limit;

        const Users = await UserModel.find({ role })
            .limit(limit)
            .skip(skip)
            .exec();

        const totalItems = await UserModel.countDocuments({ role }).exec();
        const totalPages = Math.ceil(totalItems / limit);

        if (!Users.length) {
            return res.status(StatusCode.HTTP_NOT_FOUND).json({
                status: Status.STATUS_FALSE,
                status_code: StatusCode.HTTP_NOT_FOUND,
                message: "No Users Found",
                data: [],
                page: parseInt(page as string),
                size: limit,
                totalItems,
                totalPages
            });
        }

        return res.status(StatusCode.HTTP_OK).json({
            status: Status.STATUS_TRUE,
            status_code: StatusCode.HTTP_OK,
            message: 'Fetched successfully',
            data: Users,
            page: parseInt(page as string),
            size: limit,
            totalItems,
            totalPages
        });
    } catch (error: any) {
        console.error("Error fetching schedules:", error);
        return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR).json({
            status: Status.STATUS_FALSE,
            status_code: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
            message: StatusMessage.HTTP_INTERNAL_SERVER_ERROR,
            errors: error.message,
        });
    }
};