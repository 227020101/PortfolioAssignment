import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";

import * as model from '../models/users';
import { validateUser } from '../controllers/validationUser';


export interface LoginDetails {
  username: string,
  password: string
}
const router = new Router({ prefix: '/api/v1' });


const login = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  const result = await model.LoginCheck(body);
  if (result.length) {
    ctx.body = result[0];
  } else {
    ctx.body = { err: "Login ID or Password is incorrect"}
    ctx.status = 401;
  }
  await next();
}



const createUser = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  const result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
}

// Add a protected route that requires authentication
router.post('/signin', bodyParser(),login);
router.post('/signup', bodyParser(), validateUser, createUser);

export { router };