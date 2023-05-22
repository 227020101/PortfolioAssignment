import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router as cats } from "../routes/cats";
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(cats.routes());


//Test get All cats
describe('Get / - a simple api endpoint', () => {
  test('Get all cats', async () => {
    jest.setTimeout(10000);
    const result = await request(app.callback()).get('/api/v1/cats');
    expect(result.statusCode).toEqual(200);
  });
})
