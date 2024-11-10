const request = require('supertest');
const app = require('../server'); 
const { it } = require('node:test');
const { describe } = require('../models/user');


describe('Appointment API', () => {
    it('should approve an appointment', async () => {
        const res = await request(app)
            .put('/appointments/1/approve')
            .set('Authorization', 'Bearer jwt_token'); 
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Appointment approved');
    });

  
});


