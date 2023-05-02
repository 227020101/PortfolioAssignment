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
    const result = await
      request(app.callback()).get('/api/v1/cats');
    expect(result.statusCode).toEqual(200);
  })
})

//Test get one cat
describe('Get / - a simple api endpoint', () => {
  test('Get a cat', async () => {
    const result = await
      request(app.callback()).get('/api/v1/cats/1');
    expect(result.statusCode).toEqual(200);
  })
})

//Create cat
describe('Post / - a simple api endpoint', () => {
  const jsonCont = {
    "name": "Bala",
    "alltext": "Energetic,Outgoing,Exuberant",
    "birthday": "2021-02-01",
    "category_ids": 1,
    "microchipNo": "12345",
    "gender": "F"
  }
  const username = "bob";
  const password = "Abc123";
  const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  test('Create a cat', async () => {
    const result = await
      (await request(app.callback()).post('/api/v1/cats'))
        .header({ key: access_token })
        .send({ json: jsonCont });
    expect(result.statusCode).toEqual(201);
  })
})


