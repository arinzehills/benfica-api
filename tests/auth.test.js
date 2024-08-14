const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const userModel = require('../src/database/models/userModel');


describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, );
    await userModel.deleteMany({});
    const res = await request(app)
    .post('/api/auth/register')
    .send({ username: 'Hills', email: 'a@a.com', password: '123' });
    console.log("Before HEY REGoster RES",res.body)
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'John', email: 'john@example.com', password: '123456' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data.user');
      expect(res.body).toHaveProperty('data.token',);
    });

    it('should not register a user with an existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'Jane', email: 'john@example.com', password: '123456' });
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('message',"User already exists");
    });
  });


    describe('POST /api/auth/login', () => {
        it('should login an existing user', async () => {
          const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'john@example.com', password: '123456' });
    
          expect(res.statusCode).toBe(200 ||201);
          expect(res.body).toHaveProperty('data.token');
        });
    
        it('should not login with wrong credentials', async () => {
          const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'john@example.com', password: 'wrongpassword' });
    
          expect(res.statusCode).toBe(404); 
        });
    });    
});