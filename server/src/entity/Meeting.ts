import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  meeting_date: string;
  @Column()
  meeting_time: string;
  @Column()
  meeting_status: boolean;
}
