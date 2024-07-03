import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userid: {
        require: true,
        type: String
    },
    token: {
        require: true,
        type: String
    }

})

const SessionModel = mongoose.model("Session", sessionSchema);
export default SessionModel;
