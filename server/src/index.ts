import "reflect-metadata";
import * as Koa from "koa";
import setupDb from "./db";
import * as koaBody from "koa-bodyparser";
import * as Router from "koa-router";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import schema from "./schema";
// import {fetchGeneralData} from './gitUse';
// import { fetchData } from './getData'
const cors = require('koa-cors');


const port = process.env.PORT || 3030;
const app = new Koa();
const router = new Router();



app.use(koaBody())
app.use(cors())

// this is the clientside call to the server
// router.get("/", async (ctx, next: () => {}) => {
//   const data = await fetchData('vdegraaf')
  
//   ctx.body = `${data}`;
//   console.log(data)
//   await next();
// });

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
