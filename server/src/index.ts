import "reflect-metadata";
import * as Koa from "koa";
import setupDb from "./db";
import * as koaBody from "koa-bodyparser";
import * as Router from "koa-router";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import schema from "./schema";
import {fetchData} from './getData'

const port = process.env.PORT || 3030;
const app = new Koa();
const router = new Router();

app.use(koaBody())

router.get("/", async (ctx, next: () => {}) => {
  const data = await fetchData('w3bgir1')
  ctx.body = `${data.user.id}`;
  console.log(data)
  await next();
});

router.post('/graphql', graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));

router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql'
}));

app
  .use(router.routes())
  .use(router.allowedMethods());


setupDb()
  .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(err => console.error(err));