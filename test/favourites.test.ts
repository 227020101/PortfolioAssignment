import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router as favourites } from "../routes/favourites";
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(favourites.routes());


const login = 'admin';
const password= '12345678';

//Test get favourites
describe('Get / - a simple api endpoint', () => {
  it('Get favourites', async () => {
    const result = await request(app.callback()).get('/api/v1/favourites/1')
      .auth(login, password);
    expect(result.statusCode).toEqual(200);
  });

  it('should return a 401 Unauthorized status code when not authenticated', async () => {
    const result = await request(app.callback()).get('/api/v1/favourites/1')
    expect(result.statusCode).toEqual(401);
  });
})


//add favourites
describe('POST /api/v1/signup', () => {
  it('should create a new user when valid data is provided', async () => {
    const data = { fid:"990" ,userid: "1",catid: "156" };
    const result = await request(app.callback()).post('/api/v1/favourites')
      .auth(login, password)
      .send(data);
    expect(result.statusCode).toEqual(201);
  });
  it('should return a 401 Unauthorized status code when not authenticated', async () => {
    const data = { fid:"990",userid: "1",catid: "156" };
    const result = await request(app.callback()).post('/api/v1/favourites')
      .send(data)
    expect(result.statusCode).toEqual(401);
  });
});


//Delete favourites
describe('DELETE /api/v1/favourites/:id', () => {
  it('should delete an existing favourites when authenticated', async () => {
    const result = await request(app.callback()).delete('/api/v1/favourites/990')
      .auth(login, password);
    expect(result.statusCode).toEqual(204);
  });
  it('should return a 401 Unauthorized status code when not authenticated', async () => {    
       const result = await request(app.callback()).delete('/api/v1/favourites/990')
    expect(result.statusCode).toEqual(401);
  });
});
