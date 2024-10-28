const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.post('/', rbacMiddleware(['admin']), doctorController.addDoctor);
router.put('/:id', rbacMiddleware(['admin']), doctorController.updateDoctor);
router.delete('/:id', rbacMiddleware(['admin']), doctorController.deleteDoctor);
router.get('/', doctorController.getDoctors);
router.get('/search', doctorController.searchDoctors);

module.exports = router;
