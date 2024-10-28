const express = require("express");
const fs = require("fs/promises");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/appointments.json", "utf8");
    const appointments = JSON.parse(data);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
});

router.post("/", async (req, res) => {
  const { patientName, doctorName, appointmentTime, reason } = req.body;

  if (!patientName || !doctorName || !appointmentTime || !reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const doctorsData = await fs.readFile("./data/doctors.json", "utf8");
    const doctors = JSON.parse(doctorsData);
    const doctor = doctors.find(d => d.name === doctorName && d.availability);

    if (!doctor) {
      return res.status(400).json({ error: "Doctor not available or does not exist" });
    }

    const appointmentsData = await fs.readFile("./data/appointments.json", "utf8");
    const appointments = JSON.parse(appointmentsData);

    const newAppointment = { patientName, doctorName, appointmentTime, reason };
    appointments.push(newAppointment);

    await fs.writeFile("./data/appointments.json", JSON.stringify(appointments, null, 2));
    res.status(201).json({ message: "Appointment booked successfully", newAppointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = router;
