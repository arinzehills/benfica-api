const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

let token;

beforeAll(async () => {
  // Obtain a token before running the tests
      const authResponse = await request(app)
        .post('/api/auth/login') // Adjust the endpoint to match your login route
        .send({ email: 'a@a.com', password: '123' }); // Adjust credentials as needed
      console.log("HEY AUTH RES",authResponse.body)
      token = authResponse.body.data.token; // Adjust this if the token is in a different property
});
describe('POST /posts validation', () => {
    it('should return 400 if title is missing', async () => {
      console.log("HEY YOU Token ",token)
      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'This is a post description from jest test',
          status: 'In Progress',
        });
        console.log("RES",response.body)
      expect(response.statusCode).toBe(401);
    });
  

  
    it('should return 200 if valid post data is provided', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({
          title: 'Sample Post',
          description: 'This is a post description',
          status: 'In Progress',
          assigned_to: new mongoose.Types.ObjectId().toString(),
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe('Sample Post');
    });
  });