import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Messages } from "./entity/Messages";
import { Meeting } from "./entity/Meeting";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "video-chat-app",
  synchronize: true,
  logging: false,
  entities: [User, Messages, Meeting],
  migrations: [],
  subscribers: [],
});
