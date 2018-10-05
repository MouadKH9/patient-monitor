const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./models/patient");

mongoose.connect(
  "mongodb://uwadmin:pa%24%24W0rd@ds163382.mlab.com:63382/patientinfo",
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

require("./api")(app);

app.get("/", (req, res) => {
  res.send("Welcome to Patient Monitor");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
