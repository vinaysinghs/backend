import mongoose from "mongoose";
import validator from "validator";



const scheduleschema = new mongoose.Schema({

      day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      startDate: {
        type: Date,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      recurringWeeks: {
        type: [Number],
        required: true
      },
    
    role: { 
        type: String, 
        enum: ['therapist'], 
        required:true ,
    },
        id:{
            type:Number,
            unique:true,
            required:true
        }


}, { timestamps: true });

const Create_scheduleModel = mongoose.model("schedule", scheduleschema);
export default Create_scheduleModel;
