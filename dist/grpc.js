"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
exports.__esModule = true;
var decoders = require("./decoders");
exports.getFull = function (options, client, grpcMethod, parseMethod) {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var either, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.getRaw(options, client, grpcMethod)];
                case 1:
                    either = _a.sent();
                    if (!either.hasOwnProperty("success")) return [3 /*break*/, 3];
                    return [4 /*yield*/, decoders[parseMethod](either)];
                case 2:
                    resp = _a.sent();
                    resolve(resp);
                    return [3 /*break*/, 4];
                case 3:
                    reject(either.error.messages);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
exports.getRaw = function (options, client, method) {
    return new Promise(function (resolve, reject) {
        client[method](options, function (err, resp) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(resp);
                }
                return [2 /*return*/];
            });
        }); });
    });
};
// Listen for data at name
exports.listenForDataAtNameRaw = function (options, client) {
    return exports.getRaw(options, client, "listenForDataAtName");
};
exports.listenForDataAtName = function (options, client) {
    return exports.getFull(options, client, "listenForDataAtName", "parseEitherListeningNameData");
};
// Do deploy
exports.doDeployRaw = function (options, client) {
    return exports.getRaw(options, client, "DoDeploy");
};
exports.doDeploy = function (deployData, client) {
    return exports.getFull(deployData, client, "DoDeploy", "parseEitherDoDeploy");
};
// Preview private names
exports.previewPrivateNamesRaw = function (options, client) {
    return exports.getRaw(options, client, "previewPrivateNames");
};
exports.previewPrivateNames = function (options, client) {
    return exports.getFull(options, client, "previewPrivateNames", "parseEitherPrivateNamesPreview");
};
// getBlocks
exports.getBlocksRaw = function (options, client) {
    return exports.getRaw(options, client, "getBlocks");
};
exports.getBlocks = function (options, client) {
    return exports.getFull(options, client, "getBlocks", "parseGetBlocks");
};
// Propose
exports.propose = function (options, client) {
    return exports.getRaw(options, client, "propose");
};
var getClient = function (grpcEndPoint, grpc, protoLoader, protoService) {
    var path = "/protobuf/DeployService.proto";
    if (protoService === "proposeService") {
        path = "/protobuf/ProposeService.proto";
    }
    return new Promise(function (resolve, reject) {
        protoLoader
            .load(__dirname + path, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        })
            .then(function (packageDefinition) {
            var packageObject = grpc.loadPackageDefinition(packageDefinition);
            var client;
            if (protoService === "deployService") {
                client = new packageObject.coop.rchain.casper.protocol.DeployService(grpcEndPoint, grpc.credentials.createInsecure());
            }
            else {
                client = new packageObject.coop.rchain.casper.protocol.ProposeService(grpcEndPoint, grpc.credentials.createInsecure());
            }
            resolve(client);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.getGrpcDeployClient = function (grpcEndPoint, grpc, protoLoader) {
    return getClient(grpcEndPoint, grpc, protoLoader, "deployService");
};
exports.getGrpcProposeClient = function (grpcEndPoint, grpc, protoLoader) {
    return getClient(grpcEndPoint, grpc, protoLoader, "proposeService");
};
