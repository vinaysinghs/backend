import { SignUp } from "../Controller/UserController";
import { CreateSchedule, GetSchedule, CreateTherapistDetails } from '../Controller/therapistController'
import express from "express";
import { multerFunction } from "../utils/Multer";
const multer = require('multer');
const upload = multer({ storage: multerFunction() });

const router = express.Router();
router.post('/sign-up', upload.single('resume'), SignUp);
router.post('/schedule-create', CreateSchedule);
router.post('/schedule-therapist-get-details', GetSchedule);
router.post('/therapist-create-details', upload.single('image'), CreateTherapistDetails);


export default router; 
