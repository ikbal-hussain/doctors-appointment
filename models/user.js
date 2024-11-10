const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'varchar', unique: true, nullable: false })
    username;

    @Column({ type: 'varchar', nullable: false })
    password;

    @Column({ type: 'varchar', default: 'patient' })
    role;
}

module.exports = User;
