const express = require("express");
const moment = require("moment");
const logger = require("./middleware/logger");
const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");
const appointmentRoutes = require("./routes/appointments");

const app = express();
const PORT = 4007;

app.use(express.json());
app.use(logger);

// Routes
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

