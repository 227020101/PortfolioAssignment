import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import { basicAuth } from '../controllers/auth';
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

const deleteUser = async (ctx: RouterContext, next: any) => {
  //TODO: delete an cat
  // Get the ID from the route parameters.
  const id = +ctx.params.id;
  // Finally send back appropriate JSON and status code.

  const result = await model.deleteById(id);
  if (result.status == 204) {
    ctx.status = 204;
    ctx.body = result;
  } else {
    ctx.status = 500;
    ctx.body = { err: "delete data failed" };
  }

  // Once we move to a DB store, the newcat sent back will now have its ID.
  await next();
}

const updateUser = async (ctx: RouterContext, next: any) => {
  //TODO: edit an User
  // Get the ID from the route parameters.
  const id = +ctx.params.id;

  // Finally send back appropriate JSON and status code.

  // Once we move to a DB store, the newcat sent back will now have its ID.
  const body = ctx.request.body;
  console.log(body);
  let users = await model.update(id, body);
  if (users = 202) {
    ctx.body = body;
    ctx.status = 202;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
}

// Add a protected route that requires authentication
router.post('/signin', bodyParser(),login);
router.post('/signup', bodyParser(), validateUser, createUser);
router.get('/users', bodyParser(),basicAuth, getAll);
router.put('/users/:id([0-9]{1,})', basicAuth, bodyParser(), validateUser, updateUser);
router.del('/users/:id([0-9]{1,})', basicAuth, deleteUser);

export { router };