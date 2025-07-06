const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const AdoptionStatus = require('../models/status.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
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
  await mongoose.disconnect();
  await mongoServer.stop();
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
