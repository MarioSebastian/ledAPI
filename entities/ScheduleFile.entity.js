var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { MediaFile } from "./MediaFile.entity.js";
import { OwlDevice } from "./OwlDevice.entity.js";
let ScheduleFile = class ScheduleFile extends BaseEntity {
    schedule_id;
    campaign;
    device;
    file;
    start_date;
    end_date;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], ScheduleFile.prototype, "schedule_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ScheduleFile.prototype, "campaign", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], ScheduleFile.prototype, "start_date", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], ScheduleFile.prototype, "end_date", void 0);
__decorate([
    ManyToOne(() => MediaFile, (f) => f.schedules, { onDelete: "RESTRICT" }),
    __metadata("design:type", Object)
], ScheduleFile.prototype, "file", void 0);
__decorate([
    ManyToOne(() => OwlDevice, (f) => f.scheduleFiles, { onDelete: "RESTRICT" }),
    __metadata("design:type", Object)
], ScheduleFile.prototype, "device", void 0);
ScheduleFile = __decorate([
    Entity({
        name: "store_led_schedule",
        schema: "public",
    })
], ScheduleFile);
export { ScheduleFile };
