// import {MediaFile} from "./MediaFile.entity.js";
//
// var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
//     var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//     if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//     else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//     return c > 3 && r && Object.defineProperty(target, key, r), r;
// };
// var __metadata = (this && this.__metadata) || function (k, v) {
//     if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
// };
// import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
// let Campaign = class Campaign extends BaseEntity {
//     campaign_id;
//     name;
//     start_date;
//     end_date;
//     created_by;
//     created_at;
// };
// __decorate([
//     PrimaryGeneratedColumn(),
//     __metadata("design:type", Number)
// ], Campaign.prototype, "campaign_id", void 0);
// __decorate([
//     Column({ unique: true }),
//     __metadata("design:type", String)
// ], Campaign.prototype, "name", void 0);
// __decorate([
//     Column(),
//     __metadata("design:type", Date)
// ], Campaign.prototype, "start_date", void 0);
// __decorate([
//     Column(),
//     __metadata("design:type", Date)
// ], Campaign.prototype, "end_date", void 0);
// __decorate([
//     Column(),
//     __metadata("design:type", String)
// ], Campaign.prototype, "created_by", void 0);
// __decorate([
//     CreateDateColumn(),
//     __metadata("design:type", Date)
// ], Campaign.prototype, "created_at", void 0);
// Campaign = __decorate([
//     Entity({
//         name: "store_led_campaign",
//         schema: "public",
//     })
// ], Campaign);
// export { Campaign };
