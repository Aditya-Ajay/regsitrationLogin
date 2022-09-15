const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/InfoCollection");
    console.log("THE CONNECTION IS ESTABLISHED");
  } catch (err) {
    console.log(err);
  }
};
connection();
