import bodyParser from "body-parser";
import express from "express";
import { HttpError, errorHandler } from "./helpers/errorHandler.js";
import lodash from "lodash";
import multer from "multer";
import { checkFileExist, downloadFileStream, removeFile, uploadStreamFile, } from "./google-cloud-storage/googleCloudStorage.js";
import { OwlDevice } from "./entities/OwlDevice.entity.js";
import { MediaFile } from "./entities/MediaFile.entity.js";
import { ScheduleFile } from "./entities/ScheduleFile.entity.js";
const { pick, isArray } = lodash;
export const App = () => {
    const app = express();
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //Test endpoints
    app.get("", (req, res) => {
        res.send("OK");
    });
    app.get("/test", (req, res) => {
        res.send("OK");
    });


    app.get("/playlist/:id", async (req, res) => {
        const device_id = req.params["id"];
        const schedules = await ScheduleFile.find({
            where: {
                device: {
                    device_id,
                },
            },
            relations: {
                device: true,
                file: true,
            },
        });
        return res.send(schedules);
    });
    app.get("/devices", async (req, res) => {
        OwlDevice.find().then(res => console.log(res));
        const devices = await OwlDevice.find();
        return res.send(devices);
    });
    app.post("/device", async (req, res) => {
        const body = pick(req.body, ["device_id"]);
        if (!body.device_id)
            throw new HttpError(400, "DEVICE ID CAN NOT NULL");
        const device = await OwlDevice.create({
            device_id: body.device_id,
        })
            .save()
            .catch((e) => {
            console.log(e);
            throw new HttpError(400, e.name);
        });
        return res.send(device);
    });
    const storage = {};
    app.post("/media-file", multer({
        storage,
        fileFilter: async (req, file, cb) => {
            const body = pick(req.body, ["name", "file"]);
            if (!body.name)
                throw new HttpError(400, "NAME CAN NOT NULL");
            if (!body.file)
                return cb(null, true);
            if (req.body.name)
                if (file.mimetype === "video/mp4" ||
                    file.mimetype === "video/quicktime" ||
                    file.mimetype === "video/h264" ||
                    file.mimetype === "video/h265")
                    return cb(null, true);
            return cb(null, false);
        },
    }).single("file"), async (req, res) => {
        const body = pick(req.body, ["name", "file"]);
        if (!body.name)
            throw new HttpError(400, "NAME CAN NOT NULL");
        const fileExist = await checkFileExist(body.name);
        if (!body.file && !fileExist) {
            throw new HttpError(400, "FILE NOT EXIST");
        }
        const media = await MediaFile.create({
            name: req.file?.filename || req.body.name,
        }).save();
        return res.send(media);
    });
    app.delete("/media-file", async (req, res) => {
        const media = await MediaFile.findOne({ where: { name: req.body.name } });
        if (!media)
            throw new HttpError(400, "MEDIA FILE NAME NOT FOUND");
        await removeFile(req.body.name).catch((e) => {
            throw new HttpError(500, e);
        });
        await media.remove();
        return res.send(media);
    });
    app.get("/media-file", async (req, res) => {
        const medias = await MediaFile.find();
        return res.send(medias);
    });
    app.post("/schedules", async (req, res) => {
        if (!isArray(req.body))
            throw new HttpError(400, "WRONG BODY FORMAT");
        const body = req.body.map((b) => {
            return pick(b, ["start_date", "end_date", "file_name", "device_ids"]);
        });
        const schedules_to_save = await Promise.all(body
            .map((b) => b.device_ids.map((d) => ({ ...b, device_id: d })))
            .flat()
            .map(async (data) => {
            const device = await OwlDevice.findOne({
                where: {
                    device_id: data.device_id,
                },
            });
            const file = await MediaFile.findOne({
                where: {
                    name: data.file_name,
                },
            });
            if (!device)
                throw new HttpError(400, "DEVICE NOT FOUND");
            if (!file)
                throw new HttpError(400, "MEDIA FILE NOT FOUND");
            const schedule = await ScheduleFile.findOne({
                where: {
                    device: { device_id: data.device_id },
                    file: { name: data.file_name },
                },
                relations: {
                    device: true,
                    file: true,
                },
            });
            if (schedule) {
                schedule.device = device;
                schedule.file = file;
                schedule.end_date = data.end_date;
                schedule.start_date = data.start_date;
                return schedule;
            }
            return ScheduleFile.create({
                device,
                file,
                end_date: data.end_date,
                start_date: data.start_date,
            });
        }));
        const dataRes = new Array();
        for (const s of schedules_to_save) {
            dataRes.push(await s.save());
        }
        return res.send(dataRes);
    });
    app.delete("/schedules", async (req, res) => {
        if (!isArray(req.body))
            throw new HttpError(400, "BODY DATA NEED TO BE ARRAY");
        const body = req.body.map((v) => ({
            file_name: String(v.file_name),
            device_id: String(v.device_id),
        }));
        for (const b of body) {
            const m = await MediaFile.findOne({ where: { name: b.file_name } });
            const d = await OwlDevice.findOne({ where: { device_id: b.device_id } });
            if (!m)
                continue;
            if (!d)
                continue;
            const s = await ScheduleFile.findOne({
                where: {
                    device: { device_id: d.device_id },
                    file: { id: m.id },
                },
                relations: {
                    device: true,
                    file: true,
                },
            });
            if (!s)
                continue;
            await s.remove();
        }
        return res.send();
    });
    app.use("/video/:name", (req, res, next) => {
        console.log(req.params.name);
        downloadFileStream(req.params.name).pipe(res);
    });
    app.use(errorHandler());
    return app;
};
