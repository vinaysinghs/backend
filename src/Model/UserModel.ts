import mongoose from "mongoose";
import validator from "validator";

const studentschema = new mongoose.Schema({

    fname:{
        type:String,
        Require:true,
        maxLength:50
    },
    lname:{
        type:String,
        Require:true,
        maxLength:50
    },
    email:{
        type:String,
        Require:true,
        maxLength:50
    },
    phone_number:{
        type:String,
        maxLength:20
       
    },
    phone_country_code:{
        type:String,
        maxLength:6
        
    },
    password:{
        type:String
    },
    status:{
        type:Boolean,
        default:1
    },
    is_notification:{
        type: Boolean,
         default: 1 
    },
    email_verified_at:{
        type: Date 
    },
    logged_in_device_count:{
        type:Number,
        default: 0
    },
    is_deleted:{
        default: 0,
        type:Boolean
    },
    is_deleted_date:{
        type: Date
    },
    confirm_password:{
        type:String,
        minLength:7,
        
    },
    image:{
        type:String,
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' }


}, { timestamps: true });

const UserModel = mongoose.model("User", studentschema);
export default UserModel;
