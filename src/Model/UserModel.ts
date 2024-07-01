import mongoose from "mongoose";

const studentschema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        maxLength: 50
    },
    lname: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        maxLength: 50
    },
    title: {
        type: String,
        maxLength: 50
    },
    phone_number: {
        type: String,
        required: true,
        maxLength: 20
    },
    position_applied: {
        type: String,
    },
    licence_number: {
        type: String,
    },

    languages: {
        type: String,
    },
    State: {
        type: String
    },
    Start_date: {
        type: String
    },
    resume: {
        type: String
    },
    country_code: {
        type: String,
        maxLength: 6
    },
    password: {
        type: String
    },
    status: {
        type: Boolean,
        default: 1
    },
    is_active: {
        default: 0,
        type: Boolean
    },
    is_notification: {
        type: Boolean,
        default: 1
    },
    email_verified_at: {
        type: Date
    },
    logged_in_device_count: {
        type: Number,
        default: 0
    },
    is_deleted: {
        default: 0,
        type: Boolean
    },
    is_deleted_date: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'therapist'],
        required: true,
    },

}, { timestamps: true });

const UserModel = mongoose.model("Users", studentschema);
export default UserModel;
