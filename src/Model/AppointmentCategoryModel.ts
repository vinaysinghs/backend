import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointment_category_title: {
    require: true,
    type: String
  }
});

const AppointmentCategoryModel = mongoose.model("appointmentCategory", appointmentSchema);
export default AppointmentCategoryModel;