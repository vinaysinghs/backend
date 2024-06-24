import mongoose from "mongoose";
import validator from "validator";



const studentschema = new mongoose.Schema({

    fname:{
        type:String,
       // required:true,
        maxLength:50
    },
    lname:{
        type:String,
      //  required:true,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        maxLength:50
    },
    title:{
        type:String,
        maxLength:50
    },
    phone_number:{
        type:String,
        required:true,
        maxLength:20
       
    },
    position_applied:{
        type:String,
        required:true,
        enum: ['trainee-Undergoing Masters in Counselling', 'trainee-Undergoing Masters in Clinical Psychology',
             'intern-Completed or going through their Bachelors degree', 
            'Clinical Psychologist','Counsellor','Other'],
    },
    MSCP_LKM:{
        type:String,
        required: function(this: any) { 
            return !((this as any).position_applied.startsWith('trainee'));
        }
    },
    languages:{
        type:String,
        required:true,
        enum:['English','Malay','Mandarin','Cantonese','Hokkien','Tamil','Other']
    },
    State:{
        required:true,
        type:String
    },
    
    Start_date:{
        required:true,
        type:String
    },
    hear_us:{
        required:true,
        type:String,
        enum:['Friends','Instagram','Google','Facebook','Twitter','Other']
    },
    other_comments:{
        type:String
    },
    resume: {
        type: String
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
        enum: ['user','therapist', 'admin'], 
        required:true,
        default: 'user' 
    },
        userid:{
            type:Number,
            unique:true,
            required:true
        }


}, { timestamps: true });

const UserModel = mongoose.model("User", studentschema);
export default UserModel;
