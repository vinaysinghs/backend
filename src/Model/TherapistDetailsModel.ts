import mongoose from "mongoose";

const TherapistDetailsModel = new mongoose.Schema({
  therapist_id: {
    require: true,
    type: String
  },
  appointment_type: [String],
  description: {
    require: false,
    type: String
  },
  interest_key: [String],
  work_with: [String],
  therapeutic_approach: [String],
  image: {
    type: String,
  },
});

const therapistDetailsModel = mongoose.model("therapistDetails", TherapistDetailsModel);
export default therapistDetailsModel;