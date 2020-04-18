const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

const app = express();

const db = require("./models")

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
mongoose.connect("mongodb://localhost/workouts",{ useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true });

const Routes = require("./routes/routes");
app.use(Routes);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT} !`);
});