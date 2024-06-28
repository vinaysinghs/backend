import { CreateAppointmentCategory, GetAppointmentList } from "../Controller/Admin/appointmentCategoryController";
import { Login, SignUp } from "../Controller/Auth/UserController";
import { CreateSchedule, GetSchedule, CreateTherapistDetails } from '../Controller/Therapist/therapistController'
import express from "express";
const path = require('path');
const multer = require('multer');
const storeData = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'src/uploads');
    },
    filename: (req: any, file: any, cb: any) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storeData });

const router = express.Router();

// Auth Routes 
router.post('/sign-up', upload.single('resume'), SignUp);
router.post('/login', Login);

// Therapist Routes 
router.post('/schedule-create', CreateSchedule);
router.post('/schedule-therapist-get-details', GetSchedule);
router.post('/therapist-update-details', upload.single('image'), CreateTherapistDetails);

// Admin Routes 
router.post('/create-appointment', CreateAppointmentCategory);
router.post('/appointment-list', GetAppointmentList);

export default router; 
