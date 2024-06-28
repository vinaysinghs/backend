import AppointmentCategoryModel from "../../Model/AppointmentCategoryModel";
import { Status, StatusCode, StatusMessage } from "../../constants/HttpConstants";
import { validateRequiredFields } from "../../utils/ErrorHandler";

export const CreateAppointmentCategory = async (req: any, res: any) => {
    try {
        const {
            appointment_category_title,
        } = req.body;
        
        const requiredFieldsError = await validateRequiredFields({ appointment_category_title });
        if (requiredFieldsError) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                message: requiredFieldsError,
            });
        }
        const user = await AppointmentCategoryModel.create({
            appointment_category_title,
        });
        return res.status(StatusCode.HTTP_OK).json({
            status: Status.STATUS_TRUE,
            status_code: StatusCode.HTTP_OK,
            message: "Appointment Category Created Successfully",
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

export const GetAppointmentList = async (req: any, res: any) => {
    try {
        const { page = 1, size = 10 } = req.body;
        const limit = parseInt(size as string);
        const skip = (parseInt(page as string) - 1) * limit;

        const appointmentList = await AppointmentCategoryModel.find()
            .limit(limit)
            .skip(skip)
            .exec();

        const totalItems = await AppointmentCategoryModel.countDocuments().exec();
        const totalPages = Math.ceil(totalItems / limit);

        if (!appointmentList.length) {
            return res.status(StatusCode.HTTP_OK).json({
                status: Status.STATUS_TRUE,
                status_code: StatusCode.HTTP_OK,
                message: "No Appointment found",
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
            message: 'Appointment List fetched successfully',
            data: appointmentList,
            page: parseInt(page as string),
            size: limit,
            totalItems,
            totalPages
        });
    } catch (error: any) {
        console.error("Error fetching appointment list:", error);
        return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR).json({
            status: Status.STATUS_FALSE,
            status_code: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
            message: StatusMessage.HTTP_INTERNAL_SERVER_ERROR,
            errors: error.message,
        });
    }
};