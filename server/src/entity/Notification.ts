import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  notification: string;
}
