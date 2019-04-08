import 'reflect-metadata'
import * as Koa from 'koa'
import * as koaBody from 'koa-bodyparser'
import * as Router from 'koa-router'

import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
//import setupDb from './db'
//import schema from './schema' // YOUR GraphQL schema!

const port = process.env.PORT || 4000

const app = new Koa()
const router = new Router()

// Set up the 2 GraphQL routes (POST and GET) on /graphql
// router.post('/graphql', koaBody(), async (ctx, next: () => {}) => {
//   await graphqlKoa({ schema, context: ctx })(ctx, next)
// })
// router.get('/graphql', async (ctx, next: () => {}) => {
//   await graphqlKoa({ schema, context: ctx })(ctx, next)
// })

// router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

router.get('/', async (ctx, next) => {
  ctx.body = 'It works!'
  await next()
})

const apiEntrypointPath = '/graphql';
const graphQlOpts = graphqlKoa({
    schema,
});

router.get(apiEntrypointPath, graphQlOpts);
router.post(apiEntrypointPath, koaBody(), graphQlOpts);

// GraphiQL entrypoint
router.get('/graphiql', graphiqlKoa({ endpointURL: apiEntrypointPath }));

app
  .use(router.routes())
  .use(router.allowedMethods())

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))