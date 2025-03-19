"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
// public url
const CONNECT_DB = "mongodb://localhost:27017/postUserData";
if (!CONNECT_DB) {
    console.error("MonogDB_URL is undefined!");
}
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(CONNECT_DB)
            .then(() => {
            console.log("connected database");
        })
            .catch((err) => {
            console.log(err + "err in connection in database...");
        });
    });
}
module.exports = dbConnect;
