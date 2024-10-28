const { sequelize, DataTypes } = require('sequelize');
const Appointment = require('./appointment');

const Statistics = sequelize.define('Statistics', {
    totalAppointments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    mostActiveDoctor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mostActivePatient: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    averageAppointmentsPerDay: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
});


Statistics.calculateStatistics = async () => {
    const totalAppointments = await Appointment.count();
    const mostActiveDoctor = await Appointment.findAll({
        attributes: [
            'doctorName',
            [sequelize.fn('COUNT', sequelize.col('doctorName')), 'appointmentCount']
        ],
        group: ['doctorName'],
        order: [[sequelize.fn('COUNT', sequelize.col('doctorName')), 'DESC']],
        limit: 1,
    });

    const mostActivePatient = await Appointment.findAll({
        attributes: [
            'patientName',
            [sequelize.fn('COUNT', sequelize.col('patientName')), 'appointmentCount']
        ],
        group: ['patientName'],
        order: [[sequelize.fn('COUNT', sequelize.col('patientName')), 'DESC']],
        limit: 1,
    });

    const averageAppointmentsPerDay = totalAppointments / 30; // Assuming a 30-day month

    return {
        totalAppointments,
        mostActiveDoctor: mostActiveDoctor.length > 0 ? mostActiveDoctor[0].doctorName : null,
        mostActivePatient: mostActivePatient.length > 0 ? mostActivePatient[0].patientName : null,
        averageAppointmentsPerDay,
    };
};

module.exports = Statistics;
