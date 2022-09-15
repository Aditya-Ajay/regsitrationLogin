const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    requied: true,
  },
  Cpassword: {
    type: String,
    requied: true,
  },
});
// middleware ==> after inserting the inputs and before saving it to the database
PersonSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.Cpassword = undefined;
  next();
});
// ------------------------------------------------------------------------------

const PersonModel = new mongoose.model("PersonInfoCollection", PersonSchema);

module.exports = PersonModel;
