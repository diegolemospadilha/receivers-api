"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const supertest_1 = require("supertest");
const fullUrl = 'http://localhost:3000';
let request;
exports.request = request;
exports.request = request = (0, supertest_1.agent)(fullUrl);
