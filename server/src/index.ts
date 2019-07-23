import "reflect-metadata";
import * as Koa from "koa";
import setupDb from "./db";
import * as koaBody from "koa-bodyparser";
import * as Router from "koa-router";
import { graphqlKoa } from "apollo-server-koa";
import { graphiqlKoa } from 'apollo-server-koa';
import schema from "./schema";
import * as cors from "@koa/cors";

const port = process.env.PORT || 3030;
const app = new Koa();
const router = new Router();

app
.use(koaBody())
.use(cors({ credentials: true, keepHeadersOnError: true }));

router.post("/graphql", graphqlKoa({ schema }));
router.get("/graphql", graphqlKoa({ schema }));
router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql'// a POST endpoint that GraphiQL will make the actual requests to
  }),
);

app
.use(router.routes())
.use(router.allowedMethods());

setupDb()
  .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(err => console.error(err));
