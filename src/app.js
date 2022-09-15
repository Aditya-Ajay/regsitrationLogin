const express = require("express");
const hbs = require("hbs");
require("dotenv").config();
require("./database/connection");
const bcrypt = require("bcryptjs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8028;
const PersonModel = require("./module/moduleDesc");
// MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// express engine

// -------------------------------
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
// ---------------------------------
app.get("/", (req, res) => {
  res.render("body", { success: "" });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, Cpassword, age } = req.body;
    if (password == Cpassword) {
      const information = new PersonModel({
        name,
        email,
        password,
        Cpassword,
        age,
      });
      await information.save();
    }
    res.render("body");
  } catch (err) {
    console.log(err);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const read = await PersonModel.findOne({ email: email });
    console.log(read);
    const decrypt = await bcrypt.compare(password, read.password);
    if (decrypt) {
      res.render("body");
    } else {
      res.send("YOUR PASSWORD OR EMAIL IS NOT MATCHING");
    }
  } catch (err) {
    res.send("Invalid login Details");
  }
});

app.listen(PORT, () => {
  console.log(`THE PORT IS RUNNING ${PORT}`);
});
