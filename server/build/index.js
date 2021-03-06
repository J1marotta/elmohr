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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Twit = require('twit');
require('dotenv').config();
var logger = require('simple-express-logger');
var T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});
var app = express();
app.use(cors());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Send a 500 otherwise keep going
app.use(function (_req, res, next) {
    try {
        next();
    }
    catch (e) {
        res.sendStatus(500);
    }
});
app.get('/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = req.query.q;
        T.get('users/search', { q: query }, function (err, data, response) {
            if (err ||
                (response.statusCode &&
                    (response.statusCode <= 200 || response.statusCode >= 300))) {
                console.error('there was an error hitting the search Api', err, response.statusCode);
            }
            res.send(data);
        });
        return [2 /*return*/];
    });
}); });
app.get('/users/:id/:screen_name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_id, screen_name;
    return __generator(this, function (_b) {
        _a = req.params, user_id = _a.user_id, screen_name = _a.screen_name;
        T.get('users/show', { id: user_id, screen_name: screen_name }, function (err, userdata, response) {
            if (err ||
                (response.statusCode &&
                    (response.statusCode <= 200 || response.statusCode >= 300))) {
                console.error('there was an error hitting the user Api', err, response.statusCode);
            }
            T.get('statuses/user_timeline', { id: user_id, screen_name: screen_name, count: 5 }, function (err, tweetdata, response) {
                if (err ||
                    (response.statusCode &&
                        (response.statusCode <= 200 || response.statusCode >= 300))) {
                    console.error('there was an error hitting the tweet Api', err, response.statusCode);
                }
                var data = __assign(__assign({}, userdata), { tweets: tweetdata });
                res.send(data);
            });
        });
        return [2 /*return*/];
    });
}); });
app.listen(4000);
console.log("Listening on port: 4000, wait for the development server to be up...");
exports.default = app;
