import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/image';
import { basicAuth } from '../controllers/auth';



// Since we are handling cats use a URI that begins with an appropriate path
const router = new Router({ prefix: '/api/v1/uploadImage' });

// Now we define the handler functions

const uploadImage = async (ctx: RouterContext, next: any) => {
  //TODO: edit an cat
  // Get the ID from the route parameters.
  const id = +ctx.params.id;

  // Finally send back appropriate JSON and status code.

  const body = ctx.request.body;
  let image = await model.update(id, body);
  if (image = 202) {
    ctx.body = body;
    ctx.status = 202;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
}


router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), uploadImage);
export { router };
