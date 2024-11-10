const Doctor = require('../models/doctor');

exports.addDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(500).json({ message: 'Error adding doctor', error: err.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        doctor.set(req.body);
        await doctor.save();
        res.json({ message: 'Doctor updated successfully', doctor });
    } catch (err) {
        res.status(500).json({ message: 'Error updating doctor', error: err.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        await doctor.remove();
        res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting doctor', error: err.message });
    }
};

exports.getDoctors = async (req, res) => {
    const { specialization, availability } = req.query;
    const filter = {};
    if (specialization) filter.specialization = specialization;
    if (availability) filter.availability = availability;

    try {
        const doctors = await Doctor.find(filter);
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors', error: err.message });
    }
};

exports.searchDoctors = async (req, res) => {
    const { name } = req.query;
    try {
        const doctors = await Doctor.find({ name: { $regex: name, $options: 'i' } });
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error searching doctors', error: err.message });
    }
};
