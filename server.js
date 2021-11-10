const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const userRoute = require("./routes/api/users");
const port = 5000;

/*================middlewares====================*/
// for form data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//for passport authentication
app.use(passport.initialize());
require("./config/passport")(passport);

/*===============DB  config=====================*/
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
const { connect } = mongoose;
const connectToDb = async () => {
  try {
    await connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
connectToDb();

/*==================Apis Routes=======================*/
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>tested successfully</h1>");
});

/*=================Start Server======================*/
app.listen(port, () => console.log(`listning on port ${port}`));
