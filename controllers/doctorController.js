const Doctor = require('../models/doctor');


exports.addDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body);
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(500).json({ message: 'Error adding doctor', error: err.message });
    }
};


exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        await doctor.update(req.body);
        res.json({ message: 'Doctor updated successfully', doctor });
    } catch (err) {
        res.status(500).json({ message: 'Error updating doctor', error: err.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        await doctor.destroy();
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
        const doctors = await Doctor.findAll({ where: filter });
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
};


exports.searchDoctors = async (req, res) => {
    const { name } = req.query;
    try {
        const doctors = await Doctor.findAll({
            where: { name: { [Op.like]: `%${name}%` } }
        });
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error searching doctors', error: err.message });
    }
};
