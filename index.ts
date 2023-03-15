import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from "koa-passport";
import { router as cats } from "./routes/cats";
import { router as user } from "./routes/special";
import serve from 'koa-static-folder';


const app: Koa = new Koa();
const router: Router = new Router();

const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: "Welcome to the blog API!"
  };
  await next();
}

router.get('/api/v1', welcomeAPI);

app.use(serve('./docs'));
app.use(logger());
app.use(json());
app.use(cats.routes());
app.use(passport.initialize())
app.use(user.routes());

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
