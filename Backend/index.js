const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("./routes/fileUpload");

require("dotenv").config();
const cors = require("cors");

const app = express();

//connect to db
connectDB();
//middleware
app.use(cors());
app.use(express.json());

// require('./services/dataPoller');

app.use("/api/file-upload", fileUpload);


const PORT = process.env.PORT || 5000;
console.log("server running on" , PORT);
app.listen(PORT);