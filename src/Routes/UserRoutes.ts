import { SignUp } from "../Controller/UserController";
import express from "express";
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        cb(null, 'src/uploads');
    },
    filename: (req:any, file:any, cb:any) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });

const router = express.Router();

router.post('/sign-up',upload.single('resume'), SignUp);

export default router; 
