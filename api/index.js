const mongoose = require("mongoose");
const helpers = require("../helpers");

module.exports = app => {
  //Getting all the records

  app.get("/api/all", (req, res) => {
    let Patient = mongoose.model("Patient");
    Patient.find({}, function(err, users) {
      if (err) throw err;
      res.send(users);
    });
  });

  //Getting a record by its BLE MAC

  app.get("/api/get/:ble", (req, res) => {
    let Patient = mongoose.model("Patient");
    Patient.findOne({ bleMac: req.params.ble }, function(err, user) {
      if (err) throw err;
      res.send(user);
    });
  });

  // Adding a record (you can specify all of the fields or just some (the other will be null) )

  app.post("/api/add", (req, res) => {
    let data = req.body;
    if (!data.bleMac) {
      res.send({ msg: "No BLE MAC" });
      return 0;
    }
    if (req.body.bleID == helpers.boardDict[data.bleMac]) {
      let Patient = mongoose.model("Patient");
      Patient.count({ bleMac: req.body.bleMac }, (err, c) => {
        if (err) throw err;
        if (c > 0) {
          res.send({ error: true, msg: "bleMac already exists" });
        }else{
          data.bleID = helpers.boardDict[data.bleMac];
          if (!data.dateAccepted) data.dateAccepted = helpers.getCurrentDay();
          if (!data.UTC) data.UTC = helpers.getHour();
          let newPatient = new Patient(data);
          newPatient.save((err, patient) => {
            if (err) throw err;
            res.send(patient);
          });
        }
      });


    } else {
      res.send({ error: true, msg: "bleMac didn't match the bleID" });
    }
  });

  // Deleting a record

  app.get("/api/delete/:ble/:key", (req, res) => {
    if (req.params.key === "Ciars2018") {
      let Patient = mongoose.model("Patient");
      Patient.deleteOne({ bleMac: req.params.ble }, function(err, patient) {
        if (err) throw err;
        res.send(patient);
      });
    } else {
      res.send({ error: true, msg: "Invalid Key" });
    }
  });

  // Modifying records (same as the adding)

  app.post("/api/edit/:ble", (req, res) => {
    let Patient = mongoose.model("Patient");
    Patient.findOne({ bleMac: req.params.ble }, function(err, patient) {
      if (err) throw err;
      if (patient) {
        patient.set(req.body);
        patient.save(function(err, newPatient) {
          if (err) throw err;
          res.send(newPatient);
        });
      } else {
        res.send({ Null: true });
      }
    });
  });

  // Add notes to a specific patient (by its bleMac)

  app.post("/api/addNote/:ble", (req, res) => {
    let Patient = mongoose.model("Patient");
    Patient.findOne({ bleMac: req.params.ble }, (err, oldPatient) => {
      if (err) {
        res.send({ error: true, msg: "Couldn't find any patient" });
      }
      oldPatient.Notes.push({
        date: helpers.getCurrentDay(),
        note: req.body.note
      });
      oldPatient.save((error, newPatient) => {
        if (error) {
          res.send({ error: true, msg: "Error on save" });
          throw error;
        }
        res.send({ msg: "Note added", error: false });
      });
    });
  });

  // get data from the board and put it into the // DEBUG:

  app.post("/api/boardData/:ble", (req, res) => {
    let Patient = mongoose.model("Patient");
    Patient.findOne({ bleMac: req.params.ble }, function(err, patient) {
      if (err) throw err;
      console.log(req.body);
      if (patient) {
        patient.set(req.body.data);
        console.log(req.body.data);
        patient.save(function(err, newPatient) {
          if (err) throw err;
          res.send(newPatient);
        });
      } else {
        res.send({ error: true, msg:"Couldn't find any patient" });
      }
    });
  });

};
