import "reflect-metadata";
import * as Koa from "koa";
import setupDb from "./db";
import * as koaBody from "koa-bodyparser";
import * as Router from "koa-router";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import schema from "./schema";

// import {fetchData} from './data/getData';
import { fetchReproData } from './data/reproDetails'
// import { fetchGeneralData } from './data/gitUse'


const cors = require('koa-cors');

const port = process.env.PORT || 3030;
const app = new Koa();
const router = new Router();



app.use(koaBody())
app.use(cors())


// Test, is client side call
router.get("/", async (ctx, next: () => {}) => {
  const data = await fetchReproData('vdegraaf', 'heroGame')
  ctx.body = `${data}`;
  // console.log(data)
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
