"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainToOutput = exports.dbToOutputWithPaginate = exports.dbToDomain = exports.inputToDomain = void 0;
const Receiver_1 = __importDefault(require("../Receiver"));
function inputToDomain(input) {
    var _a;
    return new Receiver_1.default((_a = input.id) !== null && _a !== void 0 ? _a : undefined, input.name, input.email, input.status, input.pixKeyType, input.pixKey);
}
exports.inputToDomain = inputToDomain;
function dbToDomain(row) {
    if (!row)
        return undefined;
    return new Receiver_1.default(row.id, row.name, row.email, row.status, row.pix_key_type, row.pix_key);
}
exports.dbToDomain = dbToDomain;
function dbToOutputWithPaginate(rows, currentPage, totalPages) {
    const output = {
        totalPages: parseInt(totalPages),
        currentPage,
        data: rows.map(dbToDomain)
    };
    return output;
}
exports.dbToOutputWithPaginate = dbToOutputWithPaginate;
function domainToOutput(domain) {
    const { id, name, email, status, pixKeyType, pixKey } = domain;
    const output = {
        id, name, email, status, pixKeyType, pixKey
    };
    return output;
}
exports.domainToOutput = domainToOutput;
