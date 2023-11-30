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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventlog = void 0;
const database_1 = __importDefault(require("../database"));
const result = {};
const createEventlog = (eventdata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("createEventlog", eventdata);
        const { address, blockHash, blockNumber, data, logIndex, removed, topics, transactionHash, transactionIndex, returnValues, event, signature, } = eventdata;
        const jsonString = JSON.stringify(returnValues, (key, value) => {
            if (typeof value === "bigint") {
                return value.toString();
            }
            return value;
        });
        // console.log(
        //   "hahsdhahdsha",
        //   address,
        //   blockHash,
        //   blockNumber,
        //   data,
        //   logIndex,
        //   removed,
        //   topics,
        //   transactionHash,
        //   transactionIndex,
        //   returnValues,
        //   event,
        //   signature
        // );
        const result = yield database_1.default.models.EventLog.create({
            address,
            blockHash,
            blockNumber,
            data,
            logIndex,
            removed,
            topics,
            transactionHash,
            transactionIndex,
            returnValues: jsonString,
            event,
            signature,
        });
        // console.log("hahsdhahdsha", result);
        return result;
    }
    catch (error) {
        console.log("createEventlog 오류발생", error);
    }
});
exports.createEventlog = createEventlog;
