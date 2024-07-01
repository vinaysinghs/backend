import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String
  },
  image: {
    require: true,
    type: String
  },
  description: {
    require: true,
    type: String
  },
  price: {
    require: true,
    type: String
  },
  price_type: {
    require: true,
    type: String
  },

});

const AppointmentCategoryModel = mongoose.model("appointmentCategory", appointmentSchema);
export default AppointmentCategoryModel;