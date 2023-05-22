import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router as users } from "../routes/special";
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(users.routes());


//Test get All user
describe('Get / - a simple api endpoint', () => {
  test('Get all user', async () => {
    jest.setTimeout(10000);
    const result = await request(app.callback()).get('/api/v1/users')
      .auth('admin', '12345678');
    expect(result.statusCode).toEqual(200);
  });
})

