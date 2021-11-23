const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const path = require("path");
const userRoute = require("./routes/api/users");
const dashRoute = require("./routes/api/dashboards");
const port = process.env.PORT || 5000;

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
app.use("/api/dashboard", dashRoute);

//sever static assets if in production
if (process.env.NODE_ENV === "production") {
  //set the static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/*=================Start Server======================*/
app.listen(port, () => console.log(`listning on port ${port}`));
