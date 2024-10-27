const mongoose = require("mongoose");
const roleBaseSchema = new mongoose.Schema({
  createdate: { type: Date, default: Date.now },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("RoleBaseSchema", roleBaseSchema);
