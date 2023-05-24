import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router as cats } from "../routes/cats";
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(cats.routes());

const login = 'admin';
const password= '12345678';

//Test get All cats
describe('Get / - a simple api endpoint', () => {
  test('Get all cats', async () => {
    const result = await request(app.callback()).get('/api/v1/cats');
    expect(result.statusCode).toEqual(200);
  });
})

//Test create Cat
describe('Cat API', () => {
  describe('POST /api/v1/cats', () => {
    it('should create a new cat', async () => {
      const newCat = { id:"990",name: 'Fluffy', alltext: "outgoing", gender: "male",age: "3","location": "Kowloon Bay" };
      const result = await request(app.callback()).post('/api/v1/cats')
        .send(newCat)
        .auth(login, password);
      expect(result.statusCode).toEqual(201);
    });
    it('should return a 400 Bad Request status code when a required field is missing', async () => {
      const newCat = { alltext: "outgoing", gender: "male",age: "3","location": "Kowloon Bay" };
      const result = await request(app.callback()).post('/api/v1/cats')
        .send(newCat)
        .auth(login, password);
      expect(result.status).toEqual(400);
      });
    it('should return a 401 Unauthorized status code when no credentials are provided', async () => {
      const newCat = { id:"990",name: 'Fluffy', alltext: "outgoing", gender: "male",age: "3","location": "Kowloon Bay" };
      const result = await request(app.callback()).post('/api/v1/cats')
        .send(newCat)
      expect(result.statusCode).toEqual(401);
    });
  });

  //Edit cat
  describe('Edit /api/v1/users/:id', () => {
    it('should edit an existing user when authenticated', async () => {
      const catData = { name: 'Fluffy', alltext: "outgoing", gender: "male",age: "4","location": "Kowloon Bay" };
      const result = await request(app.callback()).put('/api/v1/cats/990')
        .send(catData)
        .auth(login, password);
      expect(result.statusCode).toEqual(202);
    });
    it('should return a 401 Unauthorized status code when not authenticated', async () => { 
      const catData = { name: 'Fluffy', alltext: "outgoing", gender: "male",age: "4","location": "Kowloon Bay" };
      const result = await request(app.callback()).put('/api/v1/cats/990')
        .send(catData)
      expect(result.statusCode).toEqual(401);
    });
  });
  
  //Delete cats
  describe('DELETE /api/v1/cats/:id', () => {
    it('should delete an existing cats when authenticated', async () => {
      const result = await request(app.callback()).delete('/api/v1/cats/990')
        .auth(login, password);
      expect(result.statusCode).toEqual(204);
    });
    it('should return a 401 Unauthorized status code when not authenticated', async () => {    
         const result = await request(app.callback()).delete('/api/v1/cats/990')
      expect(result.statusCode).toEqual(401);
    });
  });
});