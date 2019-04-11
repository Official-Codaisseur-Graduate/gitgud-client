import { createConnection } from "typeorm";
//import Adv from './advert/entity'

export default () =>
  createConnection({
    type: "postgres",
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:secret@localhost:5432/postgres",
    entities: [],
    synchronize: true
  }).then(_ => console.log("Connected to Postgres with TypeORM"));
