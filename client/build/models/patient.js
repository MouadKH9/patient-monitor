//Require Mongoose
const mongoose = require("mongoose");
const helpers = require("../helpers");
const { Schema } = mongoose;

let patientSchema = new Schema({
  UTC: { type: String, default: helpers.getHour() },
  bleMac: { type: String, default: "-" },
  bleID: { type: Number, default: 0 },
  firstName: { type: String, default: "-" },
  lastName: { type: String, default: "-" },
  Age: { type: Number, default: 0 },
  dateAccepted: { type: String, default: "-" },
  Supervisor: { type: String, default: "-" },
  gyroReadX: { type: String, default: "-" },
  gyroReadY: { type: String, default: "-" },
  gyroReadZ: { type: String, default: "-" },
  tempRead: { type: String, default: "-" },
  accReadX: { type: String, default: "-" },
  accReadY: { type: String, default: "-" },
  accReadZ: { type: String, default: "-" },
  magReadX: { type: String, default: "-" },
  magReadY: { type: String, default: "-" },
  magReadZ: { type: String, default: "-" },
  heartRate: { type: String, default: "-" },
  SpO2: { type: String, default: "-" },
  battRead: { type: Number, default: 0 },
  isOn: { type: Boolean, default: false },
  Notes: [
    {
      date: {
        type: String,
        default: "-"
      },
      note: {
        type: String,
        default: "-"
      }
    }
  ]
});

// Compile model from schema
mongoose.model("Patient", patientSchema, "patientinfo");
