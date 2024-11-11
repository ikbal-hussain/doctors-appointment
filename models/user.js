const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
    name: 'User',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        username: {
            type: 'varchar',
            unique: true,
            nullable: false,
        },
        password: {
            type: 'varchar',
            nullable: false,
        },
        role: {
            type: 'varchar',
            default: 'patient',
        },
    },
});

module.exports = User;
