"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/express-api";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI, {
            dbName: "express-api",
            autoIndex: true,
        });
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
