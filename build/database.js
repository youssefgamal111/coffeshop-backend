"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DB_test = _a.POSTGRES_DB_test, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALTY_ROUNDS = _a.SALTY_ROUNDS, TOKEN_SECRET = _a.TOKEN_SECRET;
var client = new pg_1.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD
});
if (ENV === 'test') {
    client = new pg_1.Pool({
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_DB_test,
        password: POSTGRES_PASSWORD
    });
}
exports.default = { client: client, pepper: BCRYPT_PASSWORD, salt: SALTY_ROUNDS, ENV: ENV, TOKEN_SECRET: TOKEN_SECRET };
