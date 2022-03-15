"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = __importDefault(require("./controllers/product"));
var user_1 = __importDefault(require("./controllers/user"));
var order_1 = __importDefault(require("./controllers/order"));
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
(0, user_1.default)(app);
(0, product_1.default)(app);
(0, order_1.default)(app);
app.get('/', function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
