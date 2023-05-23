import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/cats';
import { basicAuth } from '../controllers/auth';
import { validateCat } from '../controllers/validation';


// Since we are handling cats use a URI that begins with an appropriate path
const router = new Router({ prefix: '/api/v1/cats' });

// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {

  //connect to DB
  const cats = await model.getAll();
  if (cats.length) {
    ctx.body = cats;
  } else {
    ctx.body = {}
    ctx.status = 404;
  }
  await next();
}

const createcat = async (ctx: RouterContext, next: any) => {
  // The body parser gives us access to the request body on ctx.request.body.
  // Use this to extract the title and fullText we were sent.

  // Finally send back appropriate JSON and status code.
  // Once we move to a DB store, the newcat sent back will now have its ID.
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
const updatecat = async (ctx: RouterContext, next: any) => {
  //TODO: edit an cat
  // Get the ID from the route parameters.
  const id = +ctx.params.id;

  // Finally send back appropriate JSON and status code.

  // Once we move to a DB store, the newcat sent back will now have its ID.
  const body = ctx.request.body;
  const cats = await model.update(id, body);
  console.log(cats)
  if (cats.status == 202) {
    ctx.body = body;
    ctx.status = 202;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
}
const deletecat = async (ctx: RouterContext, next: any) => {
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

/* Routes are needed to connect path endpoints to handler functions.
 When an cat id needs to be matched we use a pattern to match
 a named route parameter. Here the name of the parameter will be 'id'
 and we will define the pattern to match at least 1 numeral. */
router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateCat,createcat);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateCat,updatecat);
router.del('/:id([0-9]{1,})', basicAuth, deletecat);
// Finally, define the exported object when import from other scripts.
export { router };
