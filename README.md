# Healthcare Appointment Booking System

## Overview
This is a backend for a healthcare appointment booking system built with Node.js. It allows patients to book appointments with doctors, retrieve lists of available doctors, and manage patient records using JSON file storage.

### Features
- Retrieve list of doctors
- Retrieve list of patients
- Book an appointment with validation
- Logging middleware

### Project Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `npm run dev`.

### Routes
- **GET /doctors**: Retrieve list of available doctors.
- **GET /patients**: Retrieve list of registered patients.
- **GET /appointments**: Retrieve list of booked appointments.
- **POST /appointments**: Book an appointment.

### Logging
Logs all incoming requests with timestamp, HTTP method, and URL.
