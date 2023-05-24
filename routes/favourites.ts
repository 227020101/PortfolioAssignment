import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/favourites';
import { basicAuth } from '../controllers/auth';
import { validationFavourites } from '../controllers/validationFavourites';


// Since we are handling cats use a URI that begins with an appropriate path
const router = new Router({ prefix: '/api/v1/favourites' });

// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {
  const userid = +ctx.params.id;
  //connect to DB
  const favourites = await model.getByUserId(userid);
  if (favourites.length) {
    ctx.body = favourites;
  } else {
    ctx.body = {}
    ctx.status = 404;
  }
  await next();
}

const addFavourites = async (ctx: RouterContext, next: any) => {

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

const deleteFavourites = async (ctx: RouterContext, next: any) => {
  //TODO: delete favourites
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

router.get('/:id([0-9]{1,})', basicAuth, getAll);
router.post('/', basicAuth, bodyParser(), validationFavourites, addFavourites);
router.del('/:id([0-9]{1,})', basicAuth, deleteFavourites);
// Finally, define the exported object when import from other scripts.
export { router };
