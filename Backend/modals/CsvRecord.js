const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  Date: String,
  Open: Number,
  High: Number,
  Low: Number,
  Close: Number,
  Volume: Number,
  OpenInt: Number,
  // filename: String,
  //   contentType: String,
  //   data: Buffer, // To store the binary data of the file
  //   uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CsvRecord", csvSchema);
