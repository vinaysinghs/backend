import express from "express";
import { CreateAppointmentCategory, GetAppointmentList } from "../Controller/Admin/appointmentCategoryController";
import { SignIn, SignUp, GetAllUsers } from "../Controller/Auth/UserController";
import { CreateSchedule, GetSchedule, CreateTherapistDetails } from '../Controller/Therapist/therapistController';
import multerHelper from "../utils/Multer";
import { CreateBooking, GetBooking } from "../Controller/Booking/BookingController";

const router = express.Router();

const upload = multerHelper({ destination: 'src/uploads' });
const appointmentUpload = multerHelper({ destination: 'src/uploads/appointment-images' });

// Auth Routes
router.post('/sign-up', upload.single('resume'), SignUp);
router.post('/sign-in', SignIn);
router.post('/all-users', GetAllUsers);

// Therapist Routes
router.post('/schedule-create', CreateSchedule);
router.post('/schedule-therapist-get-details', GetSchedule);
router.post('/therapist-update-details', upload.single('image'), CreateTherapistDetails);

// Admin Routes
router.post('/create-appointment', appointmentUpload.single('image'), CreateAppointmentCategory);
router.post('/appointment-list', GetAppointmentList);

// Booking Route
router.post('/create-booking', CreateBooking);
router.post('/booking-list', GetBooking);

export default router;
