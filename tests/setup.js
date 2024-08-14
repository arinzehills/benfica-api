const mongoose = require('mongoose');
const userModel = require('../src/database/models/userModel');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, );
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
