import { createConnection } from "typeorm";
import { Score } from "./score/entity";


export default () =>{
  console.log(process.env.DATABASE_URL || "postgres://postgres:secret@localhost:5432/postgres")
  return createConnection({
    type: "postgres",
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:secret@localhost:5432/postgres",
    entities: [Score],
    synchronize: true
  }).then(_ => console.log("Connected to Postgres with TypeORM"));
}