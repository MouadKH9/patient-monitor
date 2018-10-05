const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
require("./models/patient");

mongoose.connect(
  "mongodb://uwadmin:pa%24%24W0rd@ds163382.mlab.com:63382/patientinfo",
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

require("./api")(app);
app.use(express.static('client/build'))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
