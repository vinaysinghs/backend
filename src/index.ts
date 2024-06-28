import { CommonConfig } from "./config/CommonConfig";
import Auth from "./Routes/Routes";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(express.static('public'));

mongoose.connect(CommonConfig?.MONGODB_URL)
  .then(() => {
    app.listen(CommonConfig?.PORT, () =>
      console.log(`Database Connected and Listening at Port ${CommonConfig?.PORT}`)
    );
  })
  .catch((error) => {
    console.log("Database error:", error?.message);
  });

app.use('/api', Auth);
app.use('/', (req, res) => {
  res.json({ message: "Server working" });
});

