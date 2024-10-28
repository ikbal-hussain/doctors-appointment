
const Appointment = require('../models/appointment');

const approveAppointment = async (req, res) => {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = 'approved';
    await appointment.save();
    res.json({ message: 'Appointment approved' });
};

const rejectAppointment = async (req, res) => {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = 'rejected';
    await appointment.save();
    res.json({ message: 'Appointment rejected' });
};
const rescheduleAppointment = async (req, res) => {
    const { id } = req.params;
    const { newDate } = req.body;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const conflict = await Appointment.findOne({
        where: {
            doctorId: appointment.doctorId,
            date: newDate
        }
    });

    if (conflict) return res.status(409).json({ message: 'Conflict with existing appointment' });

    appointment.date = newDate;
    await appointment.save();
    res.json({ message: 'Appointment rescheduled' });
};

module.exports = {
    approveAppointment,
    rejectAppointment,
    rescheduleAppointment,
};

