import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/comments';
import { basicAuth } from '../controllers/auth';
import { validateCat } from '../controllers/validation';


// Since we are handling comments use a URI that begins with an appropriate path
const router = new Router({ prefix: '/api/v1/comments' });

// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {

  //connect to DB
  const comments = await model.getAll();
  if (comments.length) {
    ctx.body = comments;
  } else {
    ctx.body = {}
    ctx.status = 404;
  }
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  // Get the ID from the route parameters.
  const id = +ctx.params.id;
  const comments = await model.getById(id);
  // If it exists then return the comment as JSON.
  // Otherwise return a 404 Not Found status code

  if (comments.length) {
    ctx.body = comments[0];
  } else {
    ctx.body = {}
    ctx.status = 404;
  }
  await next();
}

const createcomment = async (ctx: RouterContext, next: any) => {
  // The body parser gives us access to the request body on ctx.request.body.
  // Use this to extract the title and fullText we were sent.

  // Finally send back appropriate JSON and status code.
  // Once we move to a DB store, the newcomment sent back will now have its ID.

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
const updatecomment = async (ctx: RouterContext, next: any) => {
  //TODO: edit an comment
  // Get the ID from the route parameters.
  const id = +ctx.params.id;

  // Finally send back appropriate JSON and status code.

  //updatecommentByID(id,title,fullText);
  // Once we move to a DB store, the newcomment sent back will now have its ID.
  const body = ctx.request.body;

  let comments = await model.update(id, body);
  if (comments = 202) {
    ctx.body = body;
    ctx.status = 202;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
}
const deletecomment = async (ctx: RouterContext, next: any) => {
  //TODO: delete an comment
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
  //updatecommentByID(id,title,fullText);
  // Once we move to a DB store, the newcomment sent back will now have its ID.
  await next();
}
/* Routes are needed to connect path endpoints to handler functions.
 When an comment id needs to be matched we use a pattern to match
 a named route parameter. Here the name of the parameter will be 'id'
 and we will define the pattern to match at least 1 numeral. */
router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateCat, createcomment);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateCat, updatecomment);
router.del('/:id([0-9]{1,})', basicAuth, deletecomment);
// Finally, define the exported object when import from other scripts.
export { router };
