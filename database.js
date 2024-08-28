import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { MediaFile } from "./entities/MediaFile.entity.js";
import { OwlDevice } from "./entities/OwlDevice.entity.js";
import { ScheduleFile } from "./entities/ScheduleFile.entity.js";
dotenv.config();

export const DataSourceOwl = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || "3306"),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    socketPath: process.env.DB_SOCKETPATH,
    synchronize: true,
    // entities: [dirname + "/entities/*{.js,.ts,entity.ts,entity.js}" + ".js"],
    entities: [MediaFile, OwlDevice, ScheduleFile],
    logging: false,
    logger: "file",
});
