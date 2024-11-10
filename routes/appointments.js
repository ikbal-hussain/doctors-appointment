const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  createAppointment,
  rescheduleAppointment,
  approveAppointment,
  rejectAppointment
} = require('../controllers/appointmentController');

router.get("/", getAllAppointments);
router.post("/", createAppointment);
router.put('/:id/reschedule', rescheduleAppointment);
router.put('/:id/approve', approveAppointment);
router.put('/:id/reject', rejectAppointment);

module.exports = router;
