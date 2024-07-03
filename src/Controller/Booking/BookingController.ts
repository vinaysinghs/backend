import { Status, StatusCode, StatusMessage } from "../../constants/HttpConstants";
import BookingModel from "../../Model/BookingModel";
import { validateRequiredFields } from '../../utils/ErrorHandler';

export const CreateBooking = async (req: any, res: any) => {
    try {
        const {
            therapist_id,
            appointment_category,
            booking_slot,
            fname,
            lname,
            email,
            phone_number,
            country_code,
            age,
            nric_passport_number,
            gender,
            nationality,
            current_address,
            session_language,
            disscussion_issues,
            other_disscussion_issues,
            here_about_us,
            emergency_contact,
            extra_questions,
            is_privacy,
            redeem_coupon_code
        } = req.body;
        const requiredFieldsError = await validateRequiredFields({ therapist_id, appointment_category, booking_slot, fname, email, phone_number, country_code, age, gender, nationality, current_address, session_language, disscussion_issues, here_about_us, emergency_contact, extra_questions, is_privacy });

        if (requiredFieldsError) {
            return res.status(StatusCode.HTTP_BAD_REQUEST).json({
                status: Status.STATUS_FALSE,
                message: requiredFieldsError,
            });
        }

        const createData = {
            therapist_id,
            appointment_category,
            booking_slot,
            fname,
            lname,
            email,
            phone_number,
            country_code,
            age,
            nric_passport_number,
            gender,
            nationality,
            current_address,
            session_language,
            disscussion_issues,
            other_disscussion_issues,
            here_about_us,
            emergency_contact,
            extra_questions,
            is_privacy,
            redeem_coupon_code
        };

        const therapist_details = await BookingModel.create(createData);
        return res.status(StatusCode.HTTP_OK).json({
            status: Status.STATUS_TRUE,
            status_code: StatusCode.HTTP_OK,
            message: `Booking Succesfull`,
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

export const GetBooking = async (req: any, res: any) => {
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

        const schedules = await BookingModel.find({ therapist_id })
            .limit(limit)
            .skip(skip)
            .exec();

        const totalItems = await BookingModel.countDocuments({ therapist_id }).exec();
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
            message: 'Booking fetched successfully',
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