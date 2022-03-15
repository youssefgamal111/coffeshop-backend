"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../models/user");
var body_parser_1 = __importDefault(require("body-parser"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var database_1 = __importDefault(require("../database"));
var userser = new user_1.userservices();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authHeader = req.get('Authorization');
                    token = authHeader.split(' ')[1];
                    jsonwebtoken_1.default.verify(token, database_1.default.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied, invalid token');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userser.index()];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authHeader = req.get('Authorization');
                    token = authHeader.split(' ')[1];
                    jsonwebtoken_1.default.verify(token, database_1.default.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied, invalid token');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userser.show(parseInt(req.params.id))];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                console.log(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var u, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                u = {
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password
                };
                return [4 /*yield*/, userser.create(u)];
            case 1:
                result = _a.sent();
                if (result === null) {
                    res.json('chose another pass');
                }
                else
                    res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, token, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userser.authenticate(req.body.username, req.body.password)];
            case 1:
                result = _a.sent();
                if (result !== null) {
                    token = jsonwebtoken_1.default.sign({ result: result }, database_1.default.TOKEN_SECRET);
                    res.json({
                        status: 'success',
                        data: __assign(__assign({}, result), { token: token }),
                        message: 'user authenticated'
                    });
                }
                else {
                    res.status(401).json({
                        status: 'error',
                        message: 'pass and username not match'
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var userroutes = function (app) {
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users/create', create);
    app.post('/authenticate', authenticate);
};
exports.default = userroutes;