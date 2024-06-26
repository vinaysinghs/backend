import { SignUp } from "../Controller/UserController";
import { CreateSchedule } from '../Controller/therapistController'
import express from "express";
import { multerFunction } from "../utils/Multer";
const multer = require('multer');
const upload = multer({ storage: multerFunction() });

const router = express.Router();
router.post('/sign-up', upload.single('resume'), SignUp);
router.post('/schedule-create', CreateSchedule);

export default router; 
