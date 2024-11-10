const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');
const Appointment = require('./appointment');
const { AppDataSource } = require('../config/sqlConfig');

@Entity()
class Statistics {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'int', default: 0 })
    totalAppointments;

    @Column({ type: 'varchar', nullable: true })
    mostActiveDoctor;

    @Column({ type: 'varchar', nullable: true })
    mostActivePatient;

    @Column({ type: 'float', default: 0.0 })
    averageAppointmentsPerDay;

    static async calculateStatistics() {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const totalAppointments = await appointmentRepository.count();

        const mostActiveDoctor = await appointmentRepository
            .createQueryBuilder("appointment")
            .select("appointment.doctorName")
            .addSelect("COUNT(appointment.doctorName)", "appointmentCount")
            .groupBy("appointment.doctorName")
            .orderBy("appointmentCount", "DESC")
            .limit(1)
            .getRawOne();

        const mostActivePatient = await appointmentRepository
            .createQueryBuilder("appointment")
            .select("appointment.patientName")
            .addSelect("COUNT(appointment.patientName)", "appointmentCount")
            .groupBy("appointment.patientName")
            .orderBy("appointmentCount", "DESC")
            .limit(1)
            .getRawOne();

        const averageAppointmentsPerDay = totalAppointments / 30;

        return {
            totalAppointments,
            mostActiveDoctor: mostActiveDoctor ? mostActiveDoctor.appointment_doctorName : null,
            mostActivePatient: mostActivePatient ? mostActivePatient.appointment_patientName : null,
            averageAppointmentsPerDay,
        };
    }
}

module.exports = Statistics;
