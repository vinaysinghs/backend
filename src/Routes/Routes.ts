import { Login, SignUp } from "../Controller/UserController";
import { CreateSchedule, GetSchedule, CreateTherapistDetails } from '../Controller/therapistController'
import express from "express";
import { multerFunction } from "../utils/Multer";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
const path = require('path');
const multer = require('multer');
const stror = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'src/uploads');
    },
    filename: (req: any, file: any, cb: any) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: stror });

const router = express.Router();
router.post('/sign-up', upload.single('resume'), SignUp);
router.post('/login', Login);
router.post('/schedule-create', CreateSchedule);
router.post('/schedule-therapist-get-details', GetSchedule);
router.post('/therapist-create-details', upload.single('image'), CreateTherapistDetails);


export default router; 
