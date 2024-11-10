const { Appointment } = require('../models/appointment');
const Doctor = require('../models/doctor');

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
};

const createAppointment = async (req, res) => {
  const { patientName, doctorName, appointmentTime, reason } = req.body;

  if (!patientName || !doctorName || !appointmentTime || !reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const doctor = await Doctor.findOne({ name: doctorName, availability: true });

    if (!doctor) {
      return res.status(400).json({ error: "Doctor not available or does not exist" });
    }

    const newAppointment = new Appointment({
      patientName,
      doctorName,
      appointmentTime,
      reason,
      status: 'pending',
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", newAppointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

const rescheduleAppointment = async (req, res) => {
  const { id } = req.params;
  const { newDate } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const conflict = await Appointment.findOne({
      doctorName: appointment.doctorName,
      appointmentTime: newDate,
    });

    if (conflict) return res.status(409).json({ message: 'Conflict with existing appointment' });

    appointment.appointmentTime = newDate;
    await appointment.save();

    res.json({ message: 'Appointment rescheduled' });
  } catch (error) {
    res.status(500).json({ error: "Failed to reschedule appointment" });
  }
};

const approveAppointment = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);

  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

  appointment.status = 'approved';
  await appointment.save();
  res.json({ message: 'Appointment approved' });
};

const rejectAppointment = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);

  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

  appointment.status = 'rejected';
  await appointment.save();
  res.json({ message: 'Appointment rejected' });
};

module.exports = {
  getAllAppointments,
  createAppointment,
  rescheduleAppointment,
  approveAppointment,
  rejectAppointment,
};
