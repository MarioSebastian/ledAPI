import {OwlDevice} from "./OwlDevice.entity.js";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { ScheduleFile } from "./ScheduleFile.entity.js";
let MediaFile = class MediaFile extends BaseEntity {
    media_id;
    name;
    horizontal_orientation;
    horizontal_resolution;
    vertical_resolution;
    created_by;
    created_at;
    schedules;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MediaFile.prototype, "media_id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "name", void 0);
__decorate([
Column({ type: "bit", width: 1 }),
    __metadata("design:type", Boolean)
], MediaFile.prototype, "horizontal_orientation", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], MediaFile.prototype, "horizontal_resolution", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], MediaFile.prototype, "vertical_resolution", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], MediaFile.prototype, "runtime", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MediaFile.prototype, "created_by", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], MediaFile.prototype, "created_at", void 0);
__decorate([
    OneToMany(() => ScheduleFile, (f) => f.file),
    __metadata("design:type", Array)
], MediaFile.prototype, "schedules", void 0);
MediaFile = __decorate([
    Entity({
        name: "store_led_media",
        schema: "public",
    })
], MediaFile);
export { MediaFile };
