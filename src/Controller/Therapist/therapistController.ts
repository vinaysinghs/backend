import { Status, StatusCode, StatusMessage } from "../../constants/HttpConstants";
import { MessageConstants } from "../../constants/MessageConstants";
import ScheduleModel from '../../Model/ScheduleModel';
import therapistDetailsModel from "../../Model/TherapistDetailsModel";
import { validateRequiredFields, validateTimes } from '../../utils/ErrorHandler';

export const CreateSchedule = async (req: any, res: any) => {
    try {
        const { therapist_id, day, startDate, slots, selectedWeek } = req.body;
        const requiredFieldsError = validateRequiredFields({ therapist_id, day, startDate, slots, selectedWeek });
        if (requiredFieldsError) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                status_code: StatusCode.HTTP_BAD_REQUEST,
                message: requiredFieldsError,
            });
        }

        const timesError = validateTimes(slots);
        if (timesError) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                status_code: StatusCode.HTTP_BAD_REQUEST,
                message: timesError,
            });
        }

        const newSchedule = {
            therapist_id,
            day,
            startDate,
            slots,
            selectedWeek
        };

        const data = await ScheduleModel.create(newSchedule);
        return res.status(StatusCode.HTTP_OK).json({
            status: Status.STATUS_TRUE,
            status_code: StatusCode.HTTP_OK,
            message: 'Schedule created successfully',
            data,
        });
    } catch (error: any) {
        return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR).json({
            status: Status.STATUS_FALSE,
            message: StatusMessage.HTTP_INTERNAL_SERVER_ERROR,
            errors: error.message,
        });
    }
};

export const GetSchedule = async (req: any, res: any) => {
    try {
        const { therapist_id, page = 1, size = 10 } = req.body;

        if (!therapist_id) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                status_code: StatusCode.HTTP_BAD_REQUEST,
                message: "Therapist ID is required",
            });
        }

        const limit = parseInt(size as string);
        const skip = (parseInt(page as string) - 1) * limit;

        const schedules = await ScheduleModel.find({ therapist_id })
            .limit(limit)
            .skip(skip)
            .exec();

        const totalItems = await ScheduleModel.countDocuments({ therapist_id }).exec();
        const totalPages = Math.ceil(totalItems / limit);

        if (!schedules.length) {
            return res.status(StatusCode.HTTP_NOT_FOUND).json({
                status: Status.STATUS_FALSE,
                status_code: StatusCode.HTTP_NOT_FOUND,
                message: "No schedules found for the given therapist ID",
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
            message: 'Schedules fetched successfully',
            data: schedules,
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

export const CreateTherapistDetails = async (req: any, res: any) => {
    try {
        const {
            therapist_id,
            appointment_type,
            description,
            interest_key,
            work_with,
            therapeutic_approach,
            position_applied,
        } = req.body;
        const image = req.file?.path;

        const requiredFieldsError = await validateRequiredFields({ appointment_type, description, interest_key, work_with, position_applied });

        if (requiredFieldsError) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                message: requiredFieldsError,
            });
        }

        const createData = {
            therapist_id,
            appointment_type,
            description,
            interest_key,
            therapeutic_approach,
            image,
        };

        const therapist_details = await therapistDetailsModel.create(createData);
        return res.status(StatusCode.HTTP_OK).json({
            status: Status.STATUS_TRUE,
            status_code: StatusCode.HTTP_OK,
            message: `An 4 digit ${MessageConstants.OTP_SEND} has been sent to your email.`,
            data: therapist_details
        });

    } catch (error: any) {
        return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR).json({
            status: Status.STATUS_FALSE,
            message: StatusMessage.HTTP_INTERNAL_SERVER_ERROR,
            errors: error.message
        });
    }
};  