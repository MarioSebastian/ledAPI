
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";
import { ScheduleFile } from "./ScheduleFile.entity.js";
let OwlDevice = class OwlDevice extends BaseEntity {
    device_id;
    device_name;
    store_id;
    horizontal_orientation;
    horizontal_resolution;
    vertical_resolution;
    scheduleFiles;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OwlDevice.prototype, "device_id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], OwlDevice.prototype, "device_name", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OwlDevice.prototype, "store_id", void 0);
__decorate([
    Column({ type: "bit", width: 1 }),
    __metadata("design:type", Boolean)
], OwlDevice.prototype, "horizontal_orientation", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OwlDevice.prototype, "horizontal_resolution", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OwlDevice.prototype, "vertical_resolution", void 0);
__decorate([
    OneToMany(() => ScheduleFile, (f) => f.device),
    __metadata("design:type", Array)
], OwlDevice.prototype, "scheduleFiles", void 0);
OwlDevice = __decorate([
    Entity({
        name: "store_led_device",
        schema: "public",
    })
], OwlDevice);
export { OwlDevice };
