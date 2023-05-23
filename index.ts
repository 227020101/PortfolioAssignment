import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from "koa-passport";
import { router as cats } from "./routes/cats";
import { router as image } from "./routes/image";
import { router as user } from "./routes/special";
import { router as favourites } from "./routes/favourites";
import serve from 'koa-static-folder';
import cors from '@koa/cors';


const app: Koa = new Koa();
const router: Router = new Router();

const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: "Welcome to the blog API!"
  };
  await next();
}

router.get('/api/v1', welcomeAPI);
app.use(cors());
app.use(serve('./docs'));

app.use(logger());
app.use(json());
app.use(cats.routes());
app.use(image.routes());
app.use(passport.initialize());
app.use(user.routes());
app.use(favourites.routes());

app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { error: "No such endpoint existed" }
    }
  } catch (err: any) {
    ctx.body = { err: err }
  }
})

app.listen(10888);
