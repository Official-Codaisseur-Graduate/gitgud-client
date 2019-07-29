"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Koa = require("koa");
const db_1 = require("./db");
const koaBody = require("koa-bodyparser");
const Router = require("koa-router");
const apollo_server_koa_1 = require("apollo-server-koa");
const apollo_server_koa_2 = require("apollo-server-koa");
const schema_1 = require("./schema");
const cors = require("@koa/cors");
const port = process.env.PORT || 3030;
const app = new Koa();
const router = new Router();
app
    .use(koaBody())
    .use(cors({ credentials: true, keepHeadersOnError: true }));
router.post("/graphql", apollo_server_koa_1.graphqlKoa({ schema: schema_1.default }));
router.get("/graphql", apollo_server_koa_1.graphqlKoa({ schema: schema_1.default }));
router.get('/graphiql', apollo_server_koa_2.graphiqlKoa({
    endpointURL: '/graphql'
}));
app
    .use(router.routes())
    .use(router.allowedMethods());
db_1.default()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map