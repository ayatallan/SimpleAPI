import request from 'supertest';

import app from '../src/index';

// Mocking os.hostname for the /info endpoint test
jest.mock('os', () => ({
  hostname: jest.fn(() => 'mocked-hostname')
}));

describe('Test Express API Endpoints', () => {

  it('should return a greeting msg from /hello', async () => {
    const res = await request(app).get('/hello?name=Ayat');
    expect(res.statusCode).toEqual(200);
    expect(res.body.greeting).toBe('Hello, Ayat');
  });

  it('should return default greeting when no name is provided', async () => {
    const res = await request(app).get('/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.body.greeting).toBe('Hello, World');
  });

  it('should return system info from /info', async () => {
    const res = await request(app).get('/info');
    expect(res.statusCode).toEqual(200);
    expect(res.body.host_name).toBe('mocked-hostname');
    expect(res.body).toHaveProperty('time');
    expect(res.body).toHaveProperty('client_address');
    expect(res.body).toHaveProperty('headers');
  });

});
