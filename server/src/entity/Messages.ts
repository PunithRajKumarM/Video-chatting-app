import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  message: string;
  @Column()
  roomId: string;
}
