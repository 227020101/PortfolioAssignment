import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import { basicAuth } from '../controllers/auth'
import * as model from '../models/users';
import { validateUser } from '../controllers/validationUser';

const router = new Router({ prefix: '/api/v1' });

// Just for testing
router.get('/', async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: 'Public API return'
  };
  await next();
})

// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {
  //connect to DB
  const users = await model.getAll();
  if (users.length) {
    ctx.body = users;
  } else {
    ctx.body = {}
    ctx.status = 404;
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
router.get("/private", basicAuth , getAll);
router.post("/private", basicAuth, bodyParser(),validateUser,createUser);

export { router };