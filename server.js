const express = require("express");
const mongoConfig = require("./config/mongoConfig");
const { AppDataSource } = require("./config/sqlConfig");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointments");
const setupSwagger = require("./utils/swagger");
require("dotenv").config();
const cors = require("cors");

const app = express();
setupSwagger(app);
app.use(cors());
app.use(express.json());

mongoConfig();

AppDataSource.initialize()
  .then(() => {
    console.log("MySQL connected with TypeORM");
  })
  .catch((error) => console.error("TypeORM connection error:", error));

app.get("/", (req, res) => {
  res.send("Welcome to our healthcare system");
});
app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
