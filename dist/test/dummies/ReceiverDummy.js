"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiverDummy = void 0;
const js_brasil_1 = require("js-brasil");
const PixKeyType_1 = require("../../src/domain/PixKeyType");
const Receiver_1 = __importDefault(require("../../src/domain/Receiver"));
const ReceiverStatus_1 = require("../../src/domain/ReceiverStatus");
class ReceiverDummy {
    static stub(overrides) {
        var _a, _b, _c, _d, _e, _f;
        const fakerReceiver = js_brasil_1.fakerBr.pessoa();
        return new Receiver_1.default((_a = overrides.id) !== null && _a !== void 0 ? _a : undefined, (_b = overrides.name) !== null && _b !== void 0 ? _b : fakerReceiver.nome, (_c = overrides.email) !== null && _c !== void 0 ? _c : fakerReceiver.email, (_d = ReceiverStatus_1.ReceiverStatus[overrides.status]) !== null && _d !== void 0 ? _d : 'DRAFT', (_e = PixKeyType_1.PixKeyType[overrides.pixKeyType]) !== null && _e !== void 0 ? _e : 'EMAIL', (_f = overrides.pixKey) !== null && _f !== void 0 ? _f : fakerReceiver.email);
    }
}
exports.ReceiverDummy = ReceiverDummy;
