const request = require('supertest');
const app = require('../app');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const AdoptionStatus = require('../models/status.model');

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await AdoptionStatus.create({
    petId: 'pet123',
    status: 'reserved',
    notes: 'initial note'
  });
});

afterEach(async () => {
  await AdoptionStatus.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('PUT /adoption/status/:petId', () => {
  it('should update the status and notes for an existing petId', async () => {
    const res = await request(app)
      .put('/adoption/status/pet123')
      .send({
        status: 'adopted',
        notes: 'Updated successfully'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'adopted');
    expect(res.body).toHaveProperty('notes', 'Updated successfully');
  }, 10000);
});
