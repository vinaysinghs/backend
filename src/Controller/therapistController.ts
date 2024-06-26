import { Status, StatusCode, StatusMessage } from "../constants/HttpConstants";
import ScheduleModel from '../Model/ScheduleModel';
import { validateRequiredFields, validateTimes } from '../utils/ErrorHandler';

export const CreateSchedule = async (req: any, res: any) => {
    try {
        const { therapist_id, day, startDate, times, recurringWeeks } = req.body;
        const requiredFieldsError = validateRequiredFields({ therapist_id, day, startDate, times, recurringWeeks });
        if (requiredFieldsError) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                status_code: StatusCode.HTTP_BAD_REQUEST,
                message: requiredFieldsError,
            });
        }

        const timesError = validateTimes(times);
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
            times,
            recurringWeeks
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