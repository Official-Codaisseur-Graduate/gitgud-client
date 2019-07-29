"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("./score/entity");
exports.default = () => {
    console.log(process.env.DATABASE_URL || "postgres://postgres:secret@localhost:5432/postgres");
    return typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL ||
            "postgres://postgres:secret@localhost:5432/postgres",
        entities: [entity_1.Score],
        synchronize: true
    }).then(_ => console.log("Connected to Postgres with TypeORM"));
};
//# sourceMappingURL=db.js.map