import supertest, { agent } from 'supertest';

const fullUrl = 'http://localhost:3000';
let request: supertest.SuperTest<supertest.Test>;

request = agent(fullUrl);

export { request };