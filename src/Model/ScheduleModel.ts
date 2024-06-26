import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const scheduleschema = new mongoose.Schema({
  therapist_id: {
    require: true,
    type: String
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  startDate: {
    type: [Date],
    required: true,
  },
  times: [timeSchema],
  recurringWeeks: {
    type: Number,
    required: true,
  }
});

const Create_scheduleModel = mongoose.model("schedule", scheduleschema);
export default Create_scheduleModel;