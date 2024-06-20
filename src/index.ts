import { CommonConfig} from "./config/CommonConfig"; 
import itemroutes from "./Routes/UserRoutes";
const cors = require('cors');
import express from "express";
import mongoose from "mongoose";
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ "origin": "*" }));
app.use(express.static('public'));



mongoose.connect(CommonConfig?.MONGODB_URL).then(() => {
  app.listen(CommonConfig?.PORT, () =>
    console.log(`Database Connected and Listening at Port ${CommonConfig?.PORT}`)
  )
}).catch((error: any) => {
  console.log("Database error :", error?.message);
})

app.use('/api', itemroutes);
