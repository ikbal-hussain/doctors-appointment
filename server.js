const express = require('express');
const mongoConfig = require('./config/mongoConfig');
const { sequelize, testConnection } = require('./config/sqlConfig');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointments');
const setupSwagger = require('./utils/swagger');

const app = express();
setupSwagger(app);
app.use(express.json());

mongoConfig();
testConnection(); 

app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5007;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app
