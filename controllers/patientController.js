const Patient = require('../models/patient');

exports.getPatients = async (req, res) => {
    const { minAge, maxAge } = req.query;
    const filter = {};
    if (minAge || maxAge) filter.age = { $gte: minAge || 0, $lte: maxAge || 120 };

    try {
        const patients = await Patient.find(filter);
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching patients' });
    }
};
