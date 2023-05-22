import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/cats'
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

app.listen(3000);

//Test get All cats
describe('Get / - a simple api endpoint', () => {
  test('Get all cats', async () => {
    const result = await request(app.callback()).get('/api/v1/cats');
    expect(result.statusCode).toEqual(200);
  });
})