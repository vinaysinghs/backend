import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});

const EmergencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
});

const ExtraQuestionSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const bookingModel = new mongoose.Schema({
    therapist_id: {
        type: String,
        required: true,
    },
    appointment_category: {
        type: String,
        required: true,
    },
    booking_slot: [timeSchema],
    fname: {
        type: String,
        required: true,
        maxLength: 50
    },
    lname: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        maxLength: 50
    },
    phone_number: {
        type: String,
        required: true,
        maxLength: 20
    },
    country_code: {
        type: String,
        required: true,
        maxLength: 6
    },
    age: {
        type: String,
        required: true,
        maxLength: 20
    },
    nric_passport_number: {
        type: String,
        maxLength: 20
    },
    gender: {
        type: String,
        required: true,
        maxLength: 20
    },
    nationality: {
        type: String,
        required: true,
    },
    current_address: {
        type: String,
        required: true,
    },
    session_language: {
        type: String,
        required: true,
    },
    disscussion_issues: {
        type: String,
        required: true,
    },
    other_disscussion_issues: {
        type: String,
    },
    here_about_us: {
        type: String,
        required: true,
    },
    emergency_contact: [EmergencySchema],
    extra_questions: [ExtraQuestionSchema],
    is_privacy: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const BookingModel = mongoose.model("booking", bookingModel);
export default BookingModel;
