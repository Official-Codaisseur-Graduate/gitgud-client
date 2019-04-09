// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { BaseEntity } from "typeorm/repository/BaseEntity";
// import { IsString, IsEmail } from "class-validator";
// import { ObjectType, Field } from 'graphql-schema-decorator'
// import { GraphQLID, GraphQLString } from 'graphql'

// @ObjectType({ description: 'Advertisment' })
// @Entity()
// export default class Adv extends BaseEntity {
//   @Field({
//     type: GraphQLID,
//     nonNull: true,
//   })
//   @PrimaryGeneratedColumn()
//   id?: number;

//   @Field({
//     type: GraphQLString,
//   })
//   @IsString()
//   @Column("text", { nullable: false })
//   title: string;

//   @Field({
//     type: GraphQLString,
//   })
//   @IsString()
//   @Column("text", { nullable: false })
//   description: string;

//   @Field({
//     type: GraphQLString,
//   })
//   @IsString()
//   @Column("text", { nullable: false })
//   picture: string;

//   @Field({
//     type: GraphQLString,
//   })
//   @IsString()
//   @Column("text", { nullable: false })
//   price: string;

//   @Field({
//     type: GraphQLString,
//   })
//   @IsEmail()
//   @Column("text", { nullable: false })
//   email: string;

//   @Field({
//     type: GraphQLString,
//   })
//   @IsString()
//   @Column("text", { nullable: false })
//   phone: string;
// }
