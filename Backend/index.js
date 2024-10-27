const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("./routes/fileUpload");
const authRoute = require("./routes/authRoute");

require("dotenv").config();
const cors = require("cors");

const app = express();

//connect to db
connectDB();
//middleware
app.use(cors());
app.use(express.json());

// authentication route
app.use("/api", authRoute);

// csv file upload route
app.use("/api/file-upload", fileUpload);

const PORT = process.env.PORT || 5500;
console.log("server running on", PORT);
app.listen(PORT);
