import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router as users } from "../routes/special";
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(users.routes());


const login = 'admin';
const password= '12345678';
let userid ;

//Test get All user
describe('Get / - a simple api endpoint', () => {
  it('Get all user', async () => {
    const result = await request(app.callback()).get('/api/v1/users')
      .auth(login, password);
    expect(result.statusCode).toEqual(200);
  });

  it('should return a 401 Unauthorized status code when not authenticated', async () => {
    const result = await request(app.callback()).get('/api/v1/users')
    expect(result.statusCode).toEqual(401);
  });
})

//Test signin
describe('POST /api/v1/signin', () => {
  it('should return a JWT token when valid credentials are provided', async () => {
    const result = await request(app.callback()).post('/api/v1/signin')
      .send({ username: 'admin', password: '12345678'});
    expect(result.statusCode).toEqual(200);
  });
  it('should return a 401 Unauthorized status code when invalid credentials are provided', async () => {
    const result = await request(app.callback()).post('/api/v1/signin')
      .send({ username: 'admin', password: 'wrongpass'});
    expect(result.statusCode).toEqual(401);
  });
});

//Test signup
describe('POST /api/v1/signup', () => {
  // it('should create a new user when valid data is provided', async () => {
  //   const userData = { username: 'newuser', password: 'newpass', email: 'newuser@example.com' };
  //   const result = await request(app.callback()).post('/api/v1/signup')
  //     .send(userData)
  //   expect(result.statusCode).toEqual(201);
  // });
  it('should return a 400 Bad Request status code when invalid data is provided', async () => {
    const userData = { password: 'short', email: 'invalid-email' };
    const result = await request(app.callback()).post('/api/v1/signup')
      .send(userData)
    expect(result.statusCode).toEqual(400);
  });
});

//Edit user
describe('Edit /api/v1/users/:id', () => {
  // it('should delete an existing user when authenticated', async () => {
  //   const userData = { password: 'edit', email: 'edit@example.com' };
  //   const result = await request(app.callback()).put('/api/v1/users/66')
  //     .send(userData)
  //     .auth(login, password);
  //   expect(result.statusCode).toEqual(202);
  // });
  it('should return a 401 Unauthorized status code when not authenticated', async () => {       const userData = { password: 'edit', email: 'edit@example.com' };
    const result = await request(app.callback()).put('/api/v1/users/65')
      .send(userData)
    expect(result.statusCode).toEqual(401);
  });
});

//Delete user
describe('DELETE /api/v1/users/:id', () => {
  // it('should delete an existing user when authenticated', async () => {
  //   const result = await request(app.callback()).delete('/api/v1/users/66')
  //     .auth(login, password);
  //   expect(result.statusCode).toEqual(204);
  // });
  it('should return a 401 Unauthorized status code when not authenticated', async () => {    
       const result = await request(app.callback()).delete('/api/v1/users/66')
    expect(result.statusCode).toEqual(401);
  });
});
