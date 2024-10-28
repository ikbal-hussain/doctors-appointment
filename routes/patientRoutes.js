const express = require('express');
const { getPatients } = require('../controllers/patientController');
const router = express.Router();

router.get('/', getPatients);

module.exports = router;
