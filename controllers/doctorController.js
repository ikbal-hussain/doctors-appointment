const Doctor = require('../models/doctor');

exports.getDoctors = async (req, res) => {
    const { specialization, availability } = req.query;
    const filter = {};
    if (specialization) filter.specialization = specialization;
    if (availability) filter.availability = availability;

    try {
        const doctors = await Doctor.find(filter);
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
};
