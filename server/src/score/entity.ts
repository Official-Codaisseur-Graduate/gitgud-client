import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn
} from "typeorm";

@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  profileScore: number;

  @Column({default: 0})
  gitScore: number;

  @CreateDateColumn()
  createdAt: Date;
}
