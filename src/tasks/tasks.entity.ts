import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./types/tasks-status";

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: Status;
}