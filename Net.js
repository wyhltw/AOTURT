var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var Net;
(function (Net) {
    var NetComm = (function () {
        function NetComm() {
        }
        NetComm.ParseJsonResult = function (response) {
            return __awaiter(this, void 0, void 0, function () {
                var newResultString, responseString, jresult, netResult, ex_1, ErrorCodeNo, logLength, context, stack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (Config.OpenActions.SplitOutEmpty(",").Contains("ResponseHTTPLog")) {
                                newResultString = "URL=" + response.RequestURL + ",PostData=" + response.PostDataStr + ",IsSuccess=" + response.IsSuccess + ",Response=" + (response.RequestURL.indexOf("initGame") > 0 ? (response.ResponseString.length > 20 ? response.ResponseString.substring(0, 20) : "") : response.ResponseString);
                                Config.LastHTTPRequest.Add(newResultString);
                                if (Config.LastHTTPRequest.Count() > 25) {
                                    Config.LastHTTPRequest.Remove(Config.LastHTTPRequest.FirstOrDefault());
                                }
                            }
                            if (response.Code != 200) {
                                return [2, { ErrorCode: -10, ErrorMessage: "通信失败", eid: -6 }];
                            }
                            responseString = response.ResponseString;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            jresult = NJson.ObjArrayToList(NJson.LowerParse(responseString));
                            netResult = jresult;
                            if (netResult.newshipvo && netResult.newshipvo.Length > 0) {
                                if (!netResult.newshipvo[0]) {
                                    return [2, { ErrorCode: -89, ErrorMessage: "数据有误", eid: -6 }];
                                }
                            }
                            if (netResult.newshipvo) {
                                netResult.newshipvo.ForEach(function (c) {
                                    Player.UserShipVo.Add(c);
                                });
                            }
                            if (netResult.tactics && Player.Tactics) {
                                Player.UpdateTactics(netResult.tactics);
                            }
                            if (netResult.updatetaskvo) {
                                netResult.updatetaskvo.ForEach(function (ut) {
                                    var updateTask = Player.TaskVo.FirstOrDefault(function (c) { return c.taskcid == ut.taskcid; });
                                    if (updateTask) {
                                        updateTask.condition = ut.condition;
                                    }
                                });
                            }
                            if (netResult.eid != undefined && netResult.eid != 0) {
                                Logs.Debug(netResult.eid + GameNetErrorCode.GetDictValue(netResult.eid));
                            }
                            return [4, NetErrorRelinker.CheckError(netResult)];
                        case 2:
                            _a.sent();
                            return [2, jresult];
                        case 3:
                            ex_1 = _a.sent();
                            ErrorCodeNo = new Date().getTime();
                            if (api.systemType.toLowerCase() == "web" || (api.systemType.toLowerCase() == "android" && Config.OpenActions.indexOf("AndroidPostWorkError") >= 0) || (api.systemType.toLowerCase() == "ios" && Config.OpenActions.indexOf("IOSPostWorkError") >= 0)) {
                                logLength = $("#PartialMission .mainLog #LogsInfo p").length;
                                context = List.From($("#PartialMission .mainLog #LogsInfo p:gt(" + Math.max(0, logLength - 2) + ")").toArray()).Select(function (c) { return $(c).html(); }).JoinToString("|") + "|" + response;
                                context = Encrypt.Base64Encrypt(context).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                                stack = Encrypt.Base64Encrypt(ex_1.stack).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                                NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/PostClientError", {
                                    Tag: "WorkErrorParseJsonResult",
                                    CodeNo: ErrorCodeNo,
                                    Drive: api.systemType.toLowerCase(),
                                    AppVersion: api.appVersion,
                                    LoginArea: Config.LoginUser.LoginArea,
                                    LoginName: Config.LoginUser.LoginName,
                                    ServerName: Config.LoginUser.ServerName,
                                    Message: ex_1.message,
                                    StackTrace: stack,
                                    Context: context
                                });
                            }
                            console.log("ParseJsonResultEx=" + ex_1.message);
                            return [2, { ErrorCode: -10, ErrorMessage: "通信失败", eid: -6 }];
                        case 4: return [2];
                    }
                });
            });
        };
        NetComm.DealyRandom = function (minDealyTime) {
            return __awaiter(this, void 0, void 0, function () {
                var realDealyTime;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            MissionWorker.CheckThreadSemaphore();
                            ZhanYiWorker.CheckThreadSemaphore();
                            YanXiWorker.CheckThreadSemaphore();
                            realDealyTime = minDealyTime;
                            if (Config.PlayerConfig.RandomDealy == true) {
                                realDealyTime += Math.random() * Math.min(3000, minDealyTime);
                            }
                            return [4, Sleep(realDealyTime)];
                        case 1:
                            _a.sent();
                            MissionWorker.CheckThreadSemaphore();
                            ZhanYiWorker.CheckThreadSemaphore();
                            YanXiWorker.CheckThreadSemaphore();
                            return [2];
                    }
                });
            });
        };
        return NetComm;
    }());
    Net.NetComm = NetComm;
    var Conditioning = (function () {
        function Conditioning() {
        }
        Conditioning.GameReset = function () {
            return __awaiter(this, void 0, void 0, function () {
                var bsea_getData_Result, bsea_getUserInfo_Result, active_getUserData_Result, pve_getUserData_result, _a, _b, campaign_getUserData_result, ex_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 6, , 7]);
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/bsea/getData/"), "", Config.LoginCookie)];
                        case 1:
                            bsea_getData_Result = _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/live/getUserInfo"), "", Config.LoginCookie)];
                        case 2:
                            bsea_getUserInfo_Result = _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/active/getUserData/"), "", Config.LoginCookie)];
                        case 3:
                            active_getUserData_Result = _c.sent();
                            _b = (_a = NJson).DeserializeOfType_ThenLower;
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/getUserData/"), "", Config.LoginCookie)];
                        case 4:
                            pve_getUserData_result = _b.apply(_a, [(_c.sent()).ResponseString, { pvelevel: new List() }]);
                            if (pve_getUserData_result.pvelevel) {
                                Player.PveLevel = pve_getUserData_result.pvelevel;
                            }
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/getUserData/"), "", Config.LoginCookie)];
                        case 5:
                            campaign_getUserData_result = _c.sent();
                            return [3, 7];
                        case 6:
                            ex_2 = _c.sent();
                            return [3, 7];
                        case 7: return [2];
                    }
                });
            });
        };
        Conditioning.GuardConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/guard/getConfig/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.GuardConfigResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            ex_3 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.GuardGetThreeUserData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_4;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/guard/getThreeUserData/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.GuardGetThreeUserDataResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.PveEvent = result;
                            return [2, result];
                        case 4:
                            ex_4 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.GetPeventTask = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_5;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/task/getPeventTask"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.GetPeventTaskResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            ex_5 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.PeventSupAtkStatus = function (mapid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_6;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/pevent/supAtkStatus/" + mapid), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.PeventSupAtkStatusResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            ex_6 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.GetSpoilsShopList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_7;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/shop/getSpoilsShopList/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.SpoilsShopListResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.Spoils = result.spoils;
                            return [2, result];
                        case 4:
                            ex_7 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.SupplyBoats = function (shipids, supportMapid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(2000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/boat/supplyBoats/[" + shipids.JoinToString(",") + "]/" + supportMapid + "/0/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new ConditioningResult.SupplyFleetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateUserVo(result.uservo);
                            Player.UpdateShipVo(result.shipvo);
                            return [2, result];
                        case 5:
                            Exception_1 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Conditioning.QuickRepairShip = function (damageShips) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(2500)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/instantRepairShips/" + "[" + damageShips.Select(function (c) { return c.id; }).JoinToString(",") + "]" + "/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new ConditioningResult.RepairShipResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateUserVo(result.uservo);
                            Player.UpdateRepairDockVo(result.repairdockvo);
                            Player.UpdateShipVo(result.shipvos);
                            Player.UpdatePackageVo(result.packagevo);
                            return [2, result];
                        case 5:
                            Exception_2 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Conditioning.DockRepairShip = function (dockID, shipid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/repair/" + shipid + "/" + dockID + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.DockRepairShipResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.status != 1) {
                                Logs.Debug(getResult.ResponseString);
                            }
                            Player.UpdateUserVo(result.uservo);
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            Player.UpdateRepairDockVo(result.repairdockvo);
                            return [2, result];
                        case 4:
                            Exception_3 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.DockRubDown = function (shipid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_4;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/rubdown/" + shipid), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.DockRubDownResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateRepairDockVo(result.repairdockvo);
                            return [2, result];
                        case 4:
                            Exception_4 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.DockRepairQuick = function (dockID) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_5;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/instantRepair/" + dockID + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.DockRepairQuickResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.status != 1) {
                                Logs.Debug(getResult.ResponseString);
                            }
                            Player.UpdateUserVo(result.uservo);
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            Player.UpdateRepairDockVo(result.repairdockvo);
                            Player.UpdatePackageVo(result.packagevo);
                            return [2, result];
                        case 4:
                            Exception_5 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.DockRepairComplete = function (dockID, shipid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_6;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(1500)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/repairComplete/" + dockID + "/" + shipid + "/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new ConditioningResult.DockRepairQuickResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.status != 1) {
                                Logs.Debug(getResult.ResponseString);
                            }
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            Player.UpdateRepairDockVo(result.repairdockvo);
                            return [2, result];
                        case 5:
                            Exception_6 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Conditioning.RemoveBoat = function (fleetNo, index) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Shipid_1, ship, Exception_7;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/removeBoat/" + fleetNo + "/" + index + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.RemoveBoatResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.status != 1) {
                                Logs.Debug(getResult.ResponseString);
                            }
                            Shipid_1 = Player.FleetVo.FirstOrDefault(function (c) { return c.id == fleetNo; }).ships[index];
                            ship = Player.UserShipVo.FirstOrDefault(function (c) { return c.id == Shipid_1; });
                            if (ship) {
                                ship.fleetid = 0;
                            }
                            Player.UpdateFleetVo(result.fleetvo);
                            return [2, result];
                        case 4:
                            Exception_7 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.ChangeBoat = function (fleetNo, index, shipid) {
            return __awaiter(this, void 0, void 0, function () {
                var currentFleetShipIds, getResult, result, _a, _b, Exception_8;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            currentFleetShipIds = Player.GetFleetShips(fleetNo).Select(function (c) { return c.id; });
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/changeBoat/" + fleetNo + "/" + shipid + "/" + index + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.ChangeBoatResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.status != 1) {
                                Logs.Debug(getResult.ResponseString);
                            }
                            Player.UpdateFleetVo(result.fleetvo);
                            Player.UserShipVo.Where(function (c) { return currentFleetShipIds.Contains(c.id); }).ForEach(function (c) {
                                c.fleetid = 0;
                            });
                            Player.GetFleetShips(fleetNo).ForEach(function (c) {
                                c.fleetid = fleetNo;
                            });
                            return [2, result];
                        case 4:
                            Exception_8 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.InstantFleet = function (fleetNo, shipids) {
            return __awaiter(this, void 0, void 0, function () {
                var currentFleetShipIds, getResult, result, _a, _b, ex_8;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            currentFleetShipIds = Player.GetFleetShips(fleetNo).Select(function (c) { return c.id; });
                            return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/boat/instantFleet/" + fleetNo + "/[" + shipids.JoinToString(",") + "]/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.InstantFleetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateFleetVo(result.fleetvo);
                            Player.UserShipVo.Where(function (c) { return currentFleetShipIds.Contains(c.id); }).ForEach(function (c) {
                                c.fleetid = 0;
                            });
                            Player.GetFleetShips(fleetNo).ForEach(function (c) {
                                c.fleetid = fleetNo;
                            });
                            return [2, result];
                        case 4:
                            ex_8 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.SetFleet = function (pvemapid, shipids) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_9;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/pve/setFleet/" + pvemapid + "/[" + shipids.JoinToString(",") + "]/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.SetFleetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (Player.PveEvent && Player.PveEvent.pveeventlevel) {
                                Player.PveEvent.pveeventlevel.FirstOrDefault(function (c) { return c.pvelevelid == pvemapid; }).fleet = result.fleet;
                            }
                            return [2, result];
                        case 4:
                            ex_9 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.ChangeEquipment = function (shipid, equipmentcid, index) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_9;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/changeEquipment/" + shipid + "/" + equipmentcid + "/" + index), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.ChangeEquipmentResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            Player.UpdateEquipmentVo(result.equipmentvo);
                            return [2, result];
                        case 4:
                            Exception_9 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.RemoveEquipment = function (shipid, index) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_10;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(500)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/boat/removeEquipment/" + shipid + "/" + index), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new ConditioningResult.ChangeEquipmentResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            Player.UpdateEquipmentVo(result.equipmentvo);
                            return [2, result];
                        case 5:
                            Exception_10 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Conditioning.SetSupport = function (mapid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_11;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/setSupport/" + mapid), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.SetSupportResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_11 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Conditioning.GetRankInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_10;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/rank/getData/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ConditioningResult.RankResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [_c.sent()]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            ex_10 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        return Conditioning;
    }());
    Net.Conditioning = Conditioning;
    var Award = (function () {
        function Award() {
        }
        Award.LoginAward = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var getResult, result, _a, _b, Exception_12;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(3000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/active/getLoginAward//"), "", Config.LoginCookie, false)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 7, , 8]);
                            _b = (_a = new AwardResult.LoginAwardResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateUserVo(result.userresvo);
                            if (!(result.newshipvo != null && result.newshipvo.Count() > 0)) return [3, 6];
                            return [4, result.newshipvo.ForEachAsync(function (newship) { return __awaiter(_this, void 0, void 0, function () {
                                    var lockCIDS;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                Config.PlayerStatistics.DayGetShipCount++;
                                                lockCIDS = Config.PlayerConfig.ForcelockCIDS;
                                                if (!lockCIDS.Contains(newship.shipcid)) return [3, 2];
                                                Logs.Print("强制锁船！ " + Player.GetShipName(newship) + " 加锁");
                                                return [4, Net.Dock.LockBoat(newship.id)];
                                            case 1:
                                                _a.sent();
                                                return [3, 7];
                                            case 2:
                                                if (!(Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0)) return [3, 6];
                                                if (!Config.PlayerConfig.AutoLockShip) return [3, 4];
                                                Logs.Print("得到新船！ " + Player.GetShipName(newship) + " 加锁");
                                                return [4, Net.Dock.LockBoat(newship.id)];
                                            case 3:
                                                _a.sent();
                                                return [3, 5];
                                            case 4:
                                                Logs.Print("得到新船！ " + Player.GetShipName(newship) + " 不加锁");
                                                _a.label = 5;
                                            case 5: return [3, 7];
                                            case 6:
                                                Logs.Print(Player.GetShipName(newship));
                                                _a.label = 7;
                                            case 7:
                                                if (Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0) {
                                                    Player.UnLockShip.Add(newship.shipcid);
                                                }
                                                return [2];
                                        }
                                    });
                                }); })];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6: return [2, result];
                        case 7:
                            Exception_12 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 8: return [2];
                    }
                });
            });
        };
        Award.GetAward = function (taskid) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var getResult, result, _a, _b, Exception_13;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(2000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/task/getAward/" + taskid + "/"), "", Config.LoginCookie, false)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 7, , 8]);
                            _b = (_a = new AwardResult.GetAwardResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateTaskVo(result.taskvo);
                            Player.UpdateUserVo(result.userresvo);
                            if (!(result.newshipvo != null && result.newshipvo.Count() > 0)) return [3, 6];
                            return [4, result.newshipvo.ForEachAsync(function (newship) { return __awaiter(_this, void 0, void 0, function () {
                                    var lockCIDS;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                Config.PlayerStatistics.DayGetShipCount++;
                                                lockCIDS = Config.PlayerConfig.ForcelockCIDS;
                                                if (!lockCIDS.Contains(newship.shipcid)) return [3, 2];
                                                Logs.Print("强制锁船！ " + Player.GetShipName(newship) + " 加锁");
                                                return [4, Net.Dock.LockBoat(newship.id)];
                                            case 1:
                                                _a.sent();
                                                return [3, 7];
                                            case 2:
                                                if (!(Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0)) return [3, 6];
                                                if (!Config.PlayerConfig.AutoLockShip) return [3, 4];
                                                Logs.Print("得到新船！ " + Player.GetShipName(newship) + " 加锁");
                                                return [4, Net.Dock.LockBoat(newship.id)];
                                            case 3:
                                                _a.sent();
                                                return [3, 5];
                                            case 4:
                                                Logs.Print("得到新船！ " + Player.GetShipName(newship) + " 不加锁");
                                                _a.label = 5;
                                            case 5: return [3, 7];
                                            case 6:
                                                Logs.Print(Player.GetShipName(newship));
                                                _a.label = 7;
                                            case 7:
                                                if (Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0) {
                                                    Player.UnLockShip.Add(newship.shipcid);
                                                }
                                                return [2];
                                        }
                                    });
                                }); })];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6: return [2, result];
                        case 7:
                            Exception_13 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 8: return [2];
                    }
                });
            });
        };
        return Award;
    }());
    Net.Award = Award;
    var Campaign = (function () {
        function Campaign() {
        }
        Campaign.Init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, updateCampaign, Exception_14;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/getUserData/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new CampaignResult.CampaignInitResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            updateCampaign = new Net.Result.CampaignVo();
                            updateCampaign.passinfo = result.passinfo;
                            updateCampaign.cancampaignchallengelevel = result.cancampaignchallengelevel;
                            Player.UpdateCampaignInfo(updateCampaign);
                            return [2, result];
                        case 4:
                            Exception_14 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Campaign.GetFleet = function (campaignID) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_15;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/getFleet/" + campaignID + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new CampaignResult.GetFleetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_15 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Campaign.ChangeFleet = function (campaignID, shipid, postion) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_16;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/changeFleet/" + campaignID + "/" + shipid + "/" + postion + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new CampaignResult.ChangeFleetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_16 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Campaign.RemoveBoat = function (campaignID, postion) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_17;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/changeFleet/" + campaignID + "/0/" + postion + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new CampaignResult.ChangeFleetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_17 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Campaign.Spy = function (campaignID) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_18;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(2000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/Spy/" + campaignID + "/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new Net.Result.SpyResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_18 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Campaign.Challenge = function (campaignID, formation) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_19;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(2000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/challenge/" + campaignID + "/" + formation + "/"), "", Config.LoginCookie, false)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new Net.CampaignResult.CamChallengeResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(result.shipvo);
                            return [2, result];
                        case 5:
                            Exception_19 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Campaign.GetWarResult = function (FightNight) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_20;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!Config.PlayerConfig.SkipFight) return [3, 2];
                            return [4, NetComm.DealyRandom(Config.PlayerConfig.SkipFightSeconds * 1200)];
                        case 1:
                            _c.sent();
                            return [3, 4];
                        case 2: return [4, NetComm.DealyRandom(50000)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/campaign/getWarResult/" + (FightNight ? 1 : 0) + "/"), "", Config.LoginCookie, false)];
                        case 5:
                            getResult = _c.sent();
                            _c.label = 6;
                        case 6:
                            _c.trys.push([6, 8, , 9]);
                            _b = (_a = new CampaignResult.CampaignWarResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 7:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdatePackageVo(result.packagevo);
                            Player.UpdateShipVo(result.shipvo);
                            Player.UpdateUserVo(result.userresvo);
                            Player.UpdateCampaignInfo(result.campaignvo);
                            return [2, result];
                        case 8:
                            Exception_20 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 9: return [2];
                    }
                });
            });
        };
        return Campaign;
    }());
    Net.Campaign = Campaign;
    var Dock = (function () {
        function Dock() {
        }
        Dock.DismantleBoat = function (shipids, unloadEquip) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result_1, _a, _b, Exception_21;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/dock/dismantleBoat/[" + shipids.JoinToString(",") + "]/" + (unloadEquip == true ? "0" : "1") + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new DockResult.DismantleBoatResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result_1 = _b.apply(_a, [(_c.sent())]);
                            if (result_1.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result_1.eid) }];
                            }
                            Player.UserShipVo.RemoveAll(function (c) { return result_1.delships.Contains(c.id); });
                            Player.UpdateUserVo(result_1.uservo);
                            Player.UpdateEquipmentVo(result_1.equipmentvo);
                            return [2, result_1];
                        case 4:
                            Exception_21 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Dock.LockBoat = function (shipid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, r, Exception_22;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/boat/lock/" + shipid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new DockResult.LockBoatResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                r = Config.AwardShipCID.SplitOutEmpty(",");
                                r.Add(Player.GetShip(shipid).shipcid.toString());
                                Config.AwardShipCID = r.Distinct().JoinToString(",");
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            return [2, result];
                        case 4:
                            Exception_22 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Dock.DismantleEquipment = function (content) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_23;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/dock/dismantleEquipment/"), "content=" + content, Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new DockResult.DismantleEquipmentResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            else {
                                Player.UpdateUserVo(result.uservo);
                                Player.UpdateEquipmentVo(result.equipmentvo);
                                return [2, result];
                            }
                            return [3, 5];
                        case 4:
                            Exception_23 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Dock.LockEquipment = function (equipCid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_24;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/boat/equipLock/" + equipCid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new DockResult.LockEquipmentResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.equipmentvo == null) {
                                return [2, { ErrorCode: -20, ErrorMessage: "状态异常" }];
                            }
                            Player.UpdateEquipmentVo(new List().Add(result.equipmentvo));
                            return [2, result];
                        case 4:
                            Exception_24 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        return Dock;
    }());
    Net.Dock = Dock;
    var Explore = (function () {
        function Explore() {
        }
        Explore.GetResult = function (fleetID, ExploreId) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_25;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(3000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/explore/getResult/" + ExploreId + "/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            getResult.ResponseString = getResult.ResponseString.replace("\"2\":", "\"Oil\":").replace("\"3\":", "\"Ammo\":").replace("\"4\":", "\"Steel\":").replace("\"9\":", "\"Aluminium\":");
                            _b = (_a = new ExploreResult.ExploreGetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdatePveExplore(result.pveexplorevo);
                            Player.UpdateFleetVo(new List().Add(result.shipvo));
                            Player.UpdateUserVo(result.userresvo);
                            Player.UpdatePackageVo(result.packagevo);
                            if (result.newaward) {
                                Config.PlayerStatistics.DayGetYuanZheng_Oil += result.newaward.oil ? result.newaward.oil : 0;
                                Config.PlayerStatistics.DayGetYuanZheng_Ammo += result.newaward.ammo ? result.newaward.ammo : 0;
                                Config.PlayerStatistics.DayGetYuanZheng_Steel += result.newaward.steel ? result.newaward.steel : 0;
                                Config.PlayerStatistics.DayGetYuanZheng_Aluminium += result.newaward.aluminium ? result.newaward.aluminium : 0;
                            }
                            if (result.packagevo && result.packagevo.Count() > 0) {
                                if (result.packagevo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).Count() > 0) {
                                    Config.PlayerStatistics.DayGetYuanZheng_RepairNum++;
                                }
                                if (result.packagevo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速建造; }).Count() > 0) {
                                    Config.PlayerStatistics.DayGetYuanZheng_KuanJianNum++;
                                }
                                if (result.packagevo.Where(function (c) { return c.itemcid == DBEnum.PackageType.建造蓝图; }).Count() > 0) {
                                    Config.PlayerStatistics.DayGetYuanZheng_ShipTuZhiNum++;
                                }
                                if (result.packagevo.Where(function (c) { return c.itemcid == DBEnum.PackageType.装备蓝图; }).Count() > 0) {
                                    Config.PlayerStatistics.DayGetYuanZheng_EquipTuZhiNum++;
                                }
                            }
                            return [2, result];
                        case 5:
                            Exception_25 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Explore.Start = function (fleetID, ExploreId) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_26;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(3000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/explore/start/" + fleetID + "/" + ExploreId + "/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new ExploreResult.ExploreStartResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.exploreid == 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: "状态异常" }];
                            }
                            Player.UpdatePveExplore(result.pveexplorevo);
                            Player.UpdateFleetVo(result.fleetvo);
                            return [2, result];
                        case 5:
                            Exception_26 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Explore.Cancel = function (ExploreId) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_27;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/explore/cancel/" + ExploreId + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new ExploreResult.ExploreCancelResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdatePveExplore(result.pveexplorevo);
                            Player.UpdateFleetVo(result.fleetvo);
                            return [2, result];
                        case 4:
                            Exception_27 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        return Explore;
    }());
    Net.Explore = Explore;
    var Fight = (function () {
        function Fight() {
        }
        Fight.Cha11enge = function (id) {
            if (id === void 0) { id = ""; }
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_28;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(500)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/cha11enge/" + id + "/" + Config.CurrentFleetID + "/0/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new FightResult.Cha11engeResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.status != 1) {
                                return [2, { ErrorCode: -10, ErrorMessage: "进图失败" }];
                            }
                            return [2, result];
                        case 5:
                            Exception_28 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Fight.NewNext = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_29;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/newNext/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new FightResult.NewNextResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (!result.node) {
                                return [2, { ErrorCode: -10, ErrorMessage: "寻路失败" }];
                            }
                            return [2, result];
                        case 4:
                            Exception_29 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Fight.Spy = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_30;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(1000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/spy/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new FightResult.SpyResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_30 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Fight.Dealto = function (nodeNo, Formation) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, logLength, context, stack, Exception_31;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(3000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/dealto/" + nodeNo + "/" + Config.CurrentFleetID + "/" + Formation + "/"), "", Config.LoginCookie, false)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new FightResult.DealtoResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(result.shipvo);
                            Player.UpdateUserVo(result.userresvo);
                            if (result.packagevo && result.packagevo.Count() > 0 && result.packagevo.Where(function (c) { return c.itemcid == DBEnum.PackageType.损管; }).Count() > 0) {
                                if (api.systemType.toLowerCase() == "web" || (api.systemType.toLowerCase() == "android" && Config.OpenActions.indexOf("AndroidPostWorkError") >= 0) || (api.systemType.toLowerCase() == "ios" && Config.OpenActions.indexOf("IOSPostWorkError") >= 0)) {
                                    logLength = $("#PartialMission .mainLog #LogsInfo p").length;
                                    context = List.From($("#PartialMission .mainLog #LogsInfo p:gt(" + Math.max(0, logLength - 10) + ")").toArray()).Select(function (c) { return $(c).html(); }).JoinToString("|");
                                    context = Encrypt.Base64Encrypt(context).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                                    stack = Encrypt.Base64Encrypt(JSON.stringify({
                                        Ships: Player.GetFleetShips(),
                                        FleetVo: Player.FleetVo,
                                        SuNumber: result.packagevo.FirstOrDefault(function (c) { return c.itemcid == DBEnum.PackageType.损管; }).num,
                                        RepairDockVo: Player.RepairDockVo,
                                        User: Player.User,
                                        Mission: MissionWorker.CurrentWork,
                                        MissionTotal: MissionWorker.MissionProgressTotal,
                                        MissionNow: MissionWorker.MissionProgressNow,
                                    })).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                                    NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/PostClientError", {
                                        Tag: "WorkError",
                                        CodeNo: new Date().getTime(),
                                        Drive: api.systemType.toLowerCase(),
                                        AppVersion: api.appVersion,
                                        LoginArea: Config.LoginUser.LoginArea,
                                        LoginName: Config.LoginUser.LoginName,
                                        ServerName: Config.LoginUser.ServerName,
                                        Message: "吃了损管",
                                        StackTrace: stack,
                                        Context: context
                                    });
                                    setTimeout(function () {
                                        MainTimer.CheckConfigUpdate_Local();
                                        MainTimer.CheckConfigUpdate_Cloud();
                                        api.rebootApp();
                                    }, 500);
                                }
                            }
                            return [2, result];
                        case 5:
                            Exception_31 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Fight.SkipWar = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ships, Exception_32;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(3000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/SkipWar/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new FightResult.SkipResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            ships = Player.GetFleetShips();
                            ships.ForEach(function (item) {
                                var costOil = item.battlepropsmax.oil * 0.1;
                                item.battleprops.oil = Math.max(0, item.battleprops.oil - costOil);
                            });
                            return [2, result];
                        case 5:
                            Exception_32 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Fight.GetWarResult = function (isFightNight) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, logLength, context, stack, Exception_33;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/getWarResult/" + (isFightNight ? "1" : "0") + "/"), "", Config.LoginCookie, false)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new FightResult.FightWarResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.warresult == undefined || result.warresult == null || result.warresult.resultlevel == undefined || result.warresult.resultlevel == 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: "数据不存在" }];
                            }
                            Player.UpdateShipVo(result.shipvo);
                            if (result.packagevo && result.packagevo.Count() > 0 && result.packagevo.Where(function (c) { return c.itemcid == DBEnum.PackageType.损管; }).Count() > 0) {
                                if (api.systemType.toLowerCase() == "web" || (api.systemType.toLowerCase() == "android" && Config.OpenActions.indexOf("AndroidPostWorkError") >= 0) || (api.systemType.toLowerCase() == "ios" && Config.OpenActions.indexOf("IOSPostWorkError") >= 0)) {
                                    logLength = $("#PartialMission .mainLog #LogsInfo p").length;
                                    context = List.From($("#PartialMission .mainLog #LogsInfo p:gt(" + Math.max(0, logLength - 10) + ")").toArray()).Select(function (c) { return $(c).html(); }).JoinToString("|");
                                    context = Encrypt.Base64Encrypt(context).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                                    stack = Encrypt.Base64Encrypt(JSON.stringify({
                                        Ships: Player.GetFleetShips(),
                                        FleetVo: Player.FleetVo,
                                        SuNumber: result.packagevo.FirstOrDefault(function (c) { return c.itemcid == DBEnum.PackageType.损管; }).num,
                                        RepairDockVo: Player.RepairDockVo,
                                        User: Player.User,
                                        Mission: MissionWorker.CurrentWork,
                                        MissionTotal: MissionWorker.MissionProgressTotal,
                                        MissionNow: MissionWorker.MissionProgressNow,
                                    })).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                                    NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/PostClientError", {
                                        Tag: "WorkError",
                                        CodeNo: new Date().getTime(),
                                        Drive: api.systemType.toLowerCase(),
                                        AppVersion: api.appVersion,
                                        LoginArea: Config.LoginUser.LoginArea,
                                        LoginName: Config.LoginUser.LoginName,
                                        ServerName: Config.LoginUser.ServerName,
                                        Message: "吃了损管",
                                        StackTrace: stack,
                                        Context: context
                                    });
                                    setTimeout(function () {
                                        MainTimer.CheckConfigUpdate_Local();
                                        MainTimer.CheckConfigUpdate_Cloud();
                                        api.rebootApp();
                                    }, 500);
                                }
                            }
                            return [2, result];
                        case 4:
                            Exception_33 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        return Fight;
    }());
    Net.Fight = Fight;
    var Login = (function () {
        function Login() {
        }
        Login.InitUserInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_34;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/api/initGame/?&crazy=1"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new LoginResult.InitUserInfoResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (!(result.usershipvo && result.usershipvo.Length > 0)) {
                                return [2, { ErrorCode: -10, ErrorMessage: "初始化失败" }];
                            }
                            NetDate.PastMilliSecond = Math.ceil(((new Date().getTime() / 1000) - (result.systime)) * 1000);
                            Player.User = result.uservo;
                            Player.ShipBuildDockVo = result.dockvo;
                            Player.EquipBuildDockVo = result.equipmentdockvo;
                            Player.RepairDockVo = result.repairdockvo;
                            Player.FleetVo = result.fleetvo;
                            Player.PveExploreVo = result.pveexplorevo;
                            Player.UserShipVo = result.usershipvo;
                            Player.EquipmentVO = result.equipmentvo;
                            Player.PackageVo = result.packagevo;
                            Player.TaskVo = result.taskvo.Select(function (c) { c.issuccess = false, c.getawardtime = 0; return c; });
                            Player.Tactics = result.tactics;
                            Player.UnLockShip = result.unlockship ? result.unlockship.Select(function (c) { return c.toString().ToNumber(); }) : new List();
                            if (result.marketingdata && result.marketingdata.continueloginaward) {
                                Player.CanGainDayReward = result.marketingdata.continueloginaward.cangetday;
                            }
                            Player.CampaignInfo = Player.CampaignInfo == null ? new Net.Result.CampaignVo() : Player.CampaignInfo;
                            Player.FleetVo.ForEach(function (fleet) {
                                var fleetShips = Player.UserShipVo.Where(function (c) { return fleet.ships.Contains(c.id); });
                                fleetShips.ForEach(function (item) {
                                    item.fleetid = fleet.id;
                                });
                            });
                            Login.LastInitTime = NetDate.GetTimeSpan();
                            return [2, result];
                        case 4:
                            Exception_34 = _c.sent();
                            console.log(Exception_34);
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Login.LastInitTime = 0;
        return Login;
    }());
    Net.Login = Login;
    var PVP = (function () {
        function PVP() {
        }
        PVP.GetChallengeList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_35;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(500)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pvp/getChallengeList/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new PVPResult.ChallengeListResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_35 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        PVP.Spy = function (uid, fleetID) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_36;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(2000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pvp/spy/" + uid + "/" + fleetID + "/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new Net.Result.NetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_36 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        PVP.Challenge = function (uid, fleetID, formation) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_37;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(3000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pvp/challenge/" + uid + "/" + fleetID + "/" + formation + "/"), "", Config.LoginCookie, false)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new PVPResult.PVPChallengeResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_37 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        PVP.GetWarResult = function (FightNight) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_38;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!Config.PlayerConfig.SkipFight) return [3, 2];
                            return [4, NetComm.DealyRandom(Config.PlayerConfig.SkipFightSeconds * 1200)];
                        case 1:
                            _c.sent();
                            return [3, 4];
                        case 2: return [4, NetComm.DealyRandom(50000)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pvp/getWarResult/" + (FightNight ? 1 : 0) + "/"), "", Config.LoginCookie, false)];
                        case 5:
                            getResult = _c.sent();
                            _c.label = 6;
                        case 6:
                            _c.trys.push([6, 8, , 9]);
                            _b = (_a = new PVPResult.PVPWarResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 7:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(result.shipvo);
                            return [2, result];
                        case 8:
                            Exception_38 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 9: return [2];
                    }
                });
            });
        };
        return PVP;
    }());
    Net.PVP = PVP;
    var Friend = (function () {
        function Friend() {
        }
        Friend.GetChallengeList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_39;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(500)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/friend/getlist"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new FriendResult.GetListResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_39 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Friend.VisitorFriend = function (uid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_40;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/friend/visitorFriend/" + uid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new FriendResult.VisitorFriendResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_40 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Friend.Spy = function (uid, fleetID) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_41;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(2000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/friend/spy/" + uid + "/" + fleetID + "/"), "", Config.LoginCookie)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new Net.Result.NetResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_41 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Friend.Challenge = function (uid, fleetID, formation) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_42;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetComm.DealyRandom(3000)];
                        case 1:
                            _c.sent();
                            return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/friend/challenge/" + uid + "/" + fleetID + "/" + formation + "/"), "", Config.LoginCookie, false)];
                        case 2:
                            getResult = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            _b = (_a = new FriendResult.FriendChallengeResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 4:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 5:
                            Exception_42 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 6: return [2];
                    }
                });
            });
        };
        Friend.GetWarResult = function (FightNight) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_43;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!Config.PlayerConfig.SkipFight) return [3, 2];
                            return [4, NetComm.DealyRandom(Config.PlayerConfig.SkipFightSeconds * 1200)];
                        case 1:
                            _c.sent();
                            return [3, 4];
                        case 2: return [4, NetComm.DealyRandom(50000)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/friend/getWarResult/" + (FightNight ? 1 : 0) + "/"), "", Config.LoginCookie, false)];
                        case 5:
                            getResult = _c.sent();
                            _c.label = 6;
                        case 6:
                            _c.trys.push([6, 8, , 9]);
                            _b = (_a = new FriendResult.FriendWarResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 7:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(result.shipvo);
                            return [2, result];
                        case 8:
                            Exception_43 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 9: return [2];
                    }
                });
            });
        };
        return Friend;
    }());
    Net.Friend = Friend;
    var Transform = (function () {
        function Transform() {
        }
        Transform.Strengthen = function (upShipid, foodShips) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_44;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/boat/strengthen/" + upShipid + "/[" + foodShips.JoinToString(",") + "]/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new TransformResult.StrengthenResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            if (result.eid == 0) {
                                Player.UserShipVo.RemoveAll(function (c) { return result.delships.Contains(c.id); });
                            }
                            Player.UpdateEquipmentVo(result.equipmentvo);
                            return [2, result];
                        case 4:
                            Exception_44 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Transform.SkillLevelUp = function (upShipid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_45;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/boat/skillLevelUp/" + upShipid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new TransformResult.SkillLevelUpResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            return [2, result];
                        case 4:
                            Exception_45 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        return Transform;
    }());
    Net.Transform = Transform;
    var Build = (function () {
        function Build() {
        }
        Build.BuildBoat = function (dockid, oil, ammo, steel, aluminium) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_46;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/dock/buildBoat/" + dockid + "/" + oil + "/" + steel + "/" + ammo + "/" + aluminium + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new BuildResult.BuildBoatResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdatePackageVo(result.packagevo);
                            Player.UpdateUserVo(result.userresvo);
                            Player.ShipBuildDockVo.ForEach(function (c) {
                                var newDock = result.dockvo.FirstOrDefault(function (d) { return d.id == c.id; });
                                c.shiptype = newDock.shiptype;
                                c.starttime = newDock.starttime;
                                c.endtime = newDock.endtime;
                            });
                            return [2, result];
                        case 4:
                            Exception_46 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Build.GetBoat = function (dockid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_47;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/dock/getBoat/" + dockid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new BuildResult.GetBoatResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.ShipBuildDockVo.ForEach(function (c) {
                                var newDock = result.dockvo.FirstOrDefault(function (d) { return d.id == c.id; });
                                c.shiptype = newDock.shiptype;
                                c.starttime = newDock.starttime;
                                c.endtime = newDock.endtime;
                            });
                            return [2, result];
                        case 4:
                            Exception_47 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Build.InstantBuild = function (dockid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_48;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/dock/instantBuild/" + dockid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new BuildResult.InstantBuildResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdatePackageVo(result.packagevo);
                            Player.ShipBuildDockVo.ForEach(function (c) {
                                var newDock = result.dockvo.FirstOrDefault(function (d) { return d.id == c.id; });
                                c.endtime = newDock.endtime;
                            });
                            return [2, result];
                        case 4:
                            Exception_48 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Build.BuildEquipment = function (dockid, oil, ammo, steel, aluminium) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_49;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/dock/buildEquipment/" + dockid + "/" + oil + "/" + steel + "/" + ammo + "/" + aluminium + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new BuildResult.BuildEquipmentResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdatePackageVo(result.packagevo);
                            Player.UpdateUserVo(result.userresvo);
                            Player.EquipBuildDockVo.ForEach(function (c) {
                                var newDock = result.equipmentdockvo.FirstOrDefault(function (d) { return d.id == c.id; });
                                c.equipmentcid = newDock.equipmentcid;
                                c.starttime = newDock.starttime;
                                c.endtime = newDock.endtime;
                            });
                            return [2, result];
                        case 4:
                            Exception_49 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Build.GetEquipment = function (dockid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_50;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/dock/getEquipment/" + dockid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new BuildResult.GetEquipmentResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.EquipBuildDockVo.ForEach(function (c) {
                                var newDock = result.equipmentdockvo.FirstOrDefault(function (d) { return d.id == c.id; });
                                c.equipmentcid = newDock.equipmentcid;
                                c.starttime = newDock.starttime;
                                c.endtime = newDock.endtime;
                            });
                            return [2, result];
                        case 4:
                            Exception_50 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Build.InstantEquipmentBuild = function (dockid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_51;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/dock/instantEquipmentBuild/" + dockid + "/"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new BuildResult.InstantEquipmentBuildResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdatePackageVo(result.packagevo);
                            Player.EquipBuildDockVo.ForEach(function (c) {
                                var newDock = result.equipmentdockvo.FirstOrDefault(function (d) { return d.id == c.id; });
                                c.endtime = newDock.endtime;
                            });
                            return [2, result];
                        case 4:
                            Exception_51 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        return Build;
    }());
    Net.Build = Build;
    var Live = (function () {
        function Live() {
        }
        Live.GetTactics = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_11;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/live/getTactics"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new LiveResult.GetTacticsResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            ex_11 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Live.StudyTactics = function (shipid, cid, seatNumber, roomNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_12;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/live/studyTactics/" + shipid + "/" + cid + "/" + seatNumber + "/" + roomNumber), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new LiveResult.StudyTacticsResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (result.shipvo) {
                                Player.UpdateShipVo(List.From([result.shipvo]));
                            }
                            if (result.uservo) {
                                Player.UpdateUserVo(result.uservo);
                            }
                            if (result.packagevo) {
                                Player.UpdatePackageVo(result.packagevo);
                            }
                            return [2, result];
                        case 4:
                            ex_12 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Live.SetTeacher = function (teacherid, roomNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, ex_13;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPPost(Config.FormatURL("DataDomain/live/setTeacher/" + teacherid + "/" + roomNumber), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new LiveResult.SetTeacherResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            ex_13 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Live.GetUserInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_52;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/live/getUserInfo"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new Net.LiveResult.GetUserInfoResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_52 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Live.GetAddPopularity = function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_53;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/live/getAddPopularity"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new Net.LiveResult.GetAddPopularityResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_53 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Live.SetChief = function (shid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_54;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/live/setChief/" + shid), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new Net.LiveResult.SetChiefResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            return [2, result];
                        case 4:
                            Exception_54 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Live.SetCookbook = function (shiefshipid, foodcid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_55;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/live/setCookbook/" + shiefshipid + "/" + foodcid + "/0"), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new Net.LiveResult.SetCookResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            if (!result.shipvo) {
                                return [2, { ErrorCode: -10, ErrorMessage: "设置厨师料理失败" }];
                            }
                            Player.UpdateShipVo(new List().Add(result.shipvo));
                            return [2, result];
                        case 4:
                            Exception_55 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        Live.Eat = function (foodcid) {
            return __awaiter(this, void 0, void 0, function () {
                var getResult, result, _a, _b, Exception_56;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/live/eat/" + foodcid), "", Config.LoginCookie)];
                        case 1:
                            getResult = _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = new Net.LiveResult.EatResult())._InitData;
                            return [4, NetComm.ParseJsonResult(getResult)];
                        case 3:
                            result = _b.apply(_a, [(_c.sent())]);
                            if (result.eid != 0) {
                                return [2, { ErrorCode: -10, ErrorMessage: GameNetErrorCode.GetDictValue(result.eid) }];
                            }
                            Player.UpdateShipVo(result.usershipvo);
                            Player.UpdateUserVo(result.userresvo);
                            return [2, result];
                        case 4:
                            Exception_56 = _c.sent();
                            return [2, { ErrorCode: -10, ErrorMessage: "访问异常" }];
                        case 5: return [2];
                    }
                });
            });
        };
        return Live;
    }());
    Net.Live = Live;
    var Result;
    (function (Result) {
        var NetResult = (function (_super) {
            __extends(NetResult, _super);
            function NetResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ErrorCode = 0;
                _this.ErrorMessage = "";
                _this.eid = 0;
                _this.newshipvo = new List();
                _this.updatetaskvo = new List();
                _this.tactics = new List();
                return _this;
            }
            return NetResult;
        }(IInitable));
        Result.NetResult = NetResult;
        var UpdateTask = (function () {
            function UpdateTask() {
                this.taskcid = 0;
                this.condition = new List();
            }
            return UpdateTask;
        }());
        Result.UpdateTask = UpdateTask;
        var PveLevel = (function () {
            function PveLevel() {
                this.hp = 0;
                this.id = "";
                this.pvelevelid = "";
                this.status = "";
                this.support_level = "";
                this.support_status = "";
                this.support_aluminium = "";
                this.support_ammo = "";
                this.support_oil = "";
            }
            return PveLevel;
        }());
        Result.PveLevel = PveLevel;
        var UserResource = (function () {
            function UserResource() {
                this.aluminium = 0;
                this.ammo = 0;
                this.gold = 0;
                this.oil = 0;
                this.steel = 0;
            }
            return UserResource;
        }());
        Result.UserResource = UserResource;
        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.zone_name = "";
                _this.uid = "";
                _this.username = "";
                _this.level = 0;
                _this.exp = 0;
                _this.nextexp = 0;
                _this.fleetmaxnum = 0;
                _this.equipmentnumtop = 0;
                _this.shipnumtop = 0;
                return _this;
            }
            return User;
        }(UserResource));
        Result.User = User;
        var RepairDock = (function () {
            function RepairDock() {
                this.id = 0;
                this.locked = 0;
                this.shipid = 0;
                this.starttime = 0;
                this.endtime = 0;
            }
            return RepairDock;
        }());
        Result.RepairDock = RepairDock;
        var ShipBuildDock = (function () {
            function ShipBuildDock() {
                this.id = 0;
                this.locked = 0;
                this.shiptype = 0;
                this.starttime = 0;
                this.endtime = 0;
            }
            return ShipBuildDock;
        }());
        Result.ShipBuildDock = ShipBuildDock;
        var EquipBuildDock = (function () {
            function EquipBuildDock() {
                this.id = 0;
                this.locked = 0;
                this.equipmentcid = 0;
                this.starttime = 0;
                this.endtime = 0;
            }
            return EquipBuildDock;
        }());
        Result.EquipBuildDock = EquipBuildDock;
        var Fleet = (function () {
            function Fleet() {
                this.id = 0;
                this.status = 0;
                this.title = 0;
                this.ships = new List();
            }
            return Fleet;
        }());
        Result.Fleet = Fleet;
        var Package = (function () {
            function Package() {
                this.itemcid = 0;
                this.num = 0;
            }
            return Package;
        }());
        Result.Package = Package;
        var PveExplore = (function () {
            function PveExplore() {
                this.chapters = new List();
                this.levels = new List();
            }
            return PveExplore;
        }());
        Result.PveExplore = PveExplore;
        var PveExploreLevels = (function () {
            function PveExploreLevels() {
                this.exploreid = 0;
                this.fleetid = 0;
                this.starttime = 0;
                this.endtime = 0;
            }
            return PveExploreLevels;
        }());
        Result.PveExploreLevels = PveExploreLevels;
        var CampaignVo = (function () {
            function CampaignVo() {
                this.cancampaignchallengelevel = new List();
                this.passinfo = null;
            }
            return CampaignVo;
        }());
        Result.CampaignVo = CampaignVo;
        var CampaignInitResult_PassInfo = (function () {
            function CampaignInitResult_PassInfo() {
                this.passnum = 0;
                this.remainnum = 0;
                this.totalnum = 0;
            }
            return CampaignInitResult_PassInfo;
        }());
        Result.CampaignInitResult_PassInfo = CampaignInitResult_PassInfo;
        var GameTask = (function () {
            function GameTask() {
                this.title = "";
                this.desc = "";
                this.taskcid = 0;
                this.nextcid = new List();
                this.condition = new List();
                this.issuccess = false;
                this.getawardtime = 0;
            }
            return GameTask;
        }());
        Result.GameTask = GameTask;
        var GameTaskCondition = (function () {
            function GameTaskCondition() {
                this.totalamount = 0;
                this.finishedamount = 0;
            }
            return GameTaskCondition;
        }());
        Result.GameTaskCondition = GameTaskCondition;
        var Ship = (function () {
            function Ship() {
                this.id = 0;
                this.shipcid = 0;
                this.islocked = 0;
                this.status = 0;
                this.fleetid = 0;
                this.love = 0;
                this.lovemax = 0;
                this.married = 0;
                this.marry_time = 0;
                this.battleprops = null;
                this.battlepropsbasic = null;
                this.battlepropsmax = null;
                this.capacityslot = null;
                this.capacityslotexist = null;
                this.capacityslotmax = null;
                this.missileslot = null;
                this.missileslotexist = null;
                this.missileslotmax = null;
                this.create_time = 0;
                this.level = 0;
                this.exp = 0;
                this.nextexp = 0;
                this.skillid = 0;
                this.skilllevel = 0;
                this.nextskillid = 0;
                this.strengthenattribute = null;
                this.cookbook = new List();
                this.tactics = new List();
                this.equipmentarr = new List();
                this.repairoilmodulus = 0;
                this.repairsteelmodulus = 0;
                this.repairtime = 0;
                this.skin_cid = 0;
            }
            return Ship;
        }());
        Result.Ship = Ship;
        var Strengthen = (function () {
            function Strengthen() {
                this.atk = 0;
                this.torpedo = 0;
                this.air_def = 0;
                this.def = 0;
            }
            return Strengthen;
        }());
        Result.Strengthen = Strengthen;
        var ShipBattleProps = (function () {
            function ShipBattleProps() {
                this.oil = 0;
                this.ammo = 0;
                this.aluminium = 0;
                this.airdef = 0;
                this.antisub = 0;
                this.atk = 0;
                this.crit_repair = 0;
                this.hp = 0;
                this.def = 0;
                this.torpedo = 0;
                this.hit = 0;
                this.hit_repair = 0;
                this.luck = 0;
                this.miss = 0;
                this.miss_repair = 0;
                this.radar = 0;
                this.range = 0;
                this.speed = 0;
            }
            return ShipBattleProps;
        }());
        Result.ShipBattleProps = ShipBattleProps;
        var Equipment = (function () {
            function Equipment() {
                this.equipmentcid = 0;
                this.locked = 0;
                this.num = 0;
            }
            return Equipment;
        }());
        Result.Equipment = Equipment;
        var MarketingData = (function () {
            function MarketingData() {
                this.continueloginaward = null;
            }
            return MarketingData;
        }());
        Result.MarketingData = MarketingData;
        var DayLoginAward = (function () {
            function DayLoginAward() {
                this.cangetday = 0;
            }
            return DayLoginAward;
        }());
        Result.DayLoginAward = DayLoginAward;
        var Tactics = (function () {
            function Tactics() {
                this.boat_id = 0;
                this.cid = 0;
                this.level = 0;
                this.exp = 0;
                this.status = 0;
                this.postion = 0;
                this.tactics_id = 0;
                this.classid = "";
                this.position = "";
            }
            return Tactics;
        }());
        Result.Tactics = Tactics;
        var FightShip = (function () {
            function FightShip() {
                this.shipcid = 0;
                this.type = 0;
                this.title = "";
                this.level = 0;
                this.airdef = 0;
                this.antisub = 0;
                this.atk = 0;
                this.hp = 0;
                this.def = 0;
                this.torpedo = 0;
                this.miss = 0;
                this.radar = 0;
                this.range = 0;
                this.speed = 0;
            }
            return FightShip;
        }());
        Result.FightShip = FightShip;
        var EnemyFleet = (function () {
            function EnemyFleet() {
                this.formation = 0;
                this.id = "";
                this.level = 0;
                this.title = "";
            }
            return EnemyFleet;
        }());
        Result.EnemyFleet = EnemyFleet;
        var Enemy = (function () {
            function Enemy() {
                this.canskip = 0;
                this.isfound = 0;
                this.successrate = "";
                this.enemyfleet = null;
                this.enemyships = new List();
            }
            return Enemy;
        }());
        Result.Enemy = Enemy;
        var SpyResult = (function (_super) {
            __extends(SpyResult, _super);
            function SpyResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.enemyvo = null;
                return _this;
            }
            return SpyResult;
        }(NetResult));
        Result.SpyResult = SpyResult;
        var Buff = (function () {
            function Buff() {
                this.buffcid = 0;
                this.cutintype = 0;
                this.frominde = 0;
                this.targetindex = new List();
                this.team = 0;
            }
            return Buff;
        }());
        Result.Buff = Buff;
        var Damage = (function () {
            function Damage() {
                this.amount = 0;
                this.deftype = 0;
                this.extradef = 0;
                this.extradefhelper = 0;
                this.index = 0;
                this.iscritical = 0;
            }
            return Damage;
        }());
        Result.Damage = Damage;
        var ShipAttack = (function () {
            function ShipAttack() {
                this.attackside = 0;
                this.fromindex = 0;
                this.attackturns = 0;
                this.attacktype = 0;
                this.bosshphurt = 0;
                this.bosshpleft = 0;
                this.damage = new List();
                this.targetindex = new List();
                this.damages = new List();
                this.dropamount = 0;
                this.equipmentcid = 0;
                this.fightback = 0;
                this.ignoredamage = 0;
                this.planeamoun = 0;
                this.planetype = 0;
                this.skillid = 0;
                this.specialattacktype = 0;
                this.tactics_cid = 0;
                this.tactics_exp = 0;
            }
            return ShipAttack;
        }());
        Result.ShipAttack = ShipAttack;
        var DealtoResult_WarReport = (function () {
            function DealtoResult_WarReport() {
                this.candonightwar = 0;
                this.isexploresuccess = 0;
                this.hasexplorebuff = 0;
                this.selfbuffs = new List();
                this.enemybuff = new List();
                this.aircontroltype = 0;
                this.hpbeforenightwarenemy = new List();
                this.hpbeforenightwarself = new List();
                this.openairattack = new List();
                this.openmissileattack = new List();
                this.openantisubattack = new List();
                this.opentorpedoattack = new List();
                this.normalattacks = new List();
                this.normalattacks2 = new List();
                this.closetorpedoattack = new List();
                this.closemissileattack = new List();
                this.enemyships = new List();
                this.selfships = new List();
            }
            return DealtoResult_WarReport;
        }());
        Result.DealtoResult_WarReport = DealtoResult_WarReport;
        var UserLevelVo = (function () {
            function UserLevelVo() {
                this.exp = 0;
                this.expadd = 0;
                this.nextlevelexpneed = 0;
                this.level = 0;
                this.lastlevelexpneed = 0;
            }
            return UserLevelVo;
        }());
        Result.UserLevelVo = UserLevelVo;
        var ShipResult = (function () {
            function ShipResult() {
                this.hp = 0;
                this.expadd = 0;
                this.islevelup = 0;
                this.ismvp = 0;
                this.level = 0;
                this.nextlevelexpneed = 0;
                this.lastlevelexpneed = 0;
            }
            return ShipResult;
        }());
        Result.ShipResult = ShipResult;
        var WarResult_Result = (function () {
            function WarResult_Result() {
                this.enemygetfromwar = 0;
                this.selfgetfromwar = 0;
                this.resultlevel = 0;
                this.enemyshipresults = new List();
                this.selfshipresults = new List();
                this.userlevelvo = null;
            }
            return WarResult_Result;
        }());
        Result.WarResult_Result = WarResult_Result;
    })(Result = Net.Result || (Net.Result = {}));
    var ConditioningResult;
    (function (ConditioningResult) {
        var InstantFleetResult = (function (_super) {
            __extends(InstantFleetResult, _super);
            function InstantFleetResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.fleetvo = new List();
                _this.shipvo = new List();
                return _this;
            }
            return InstantFleetResult;
        }(Result.NetResult));
        ConditioningResult.InstantFleetResult = InstantFleetResult;
        var SetFleetResult = (function (_super) {
            __extends(SetFleetResult, _super);
            function SetFleetResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.fleet = new List();
                return _this;
            }
            return SetFleetResult;
        }(Result.NetResult));
        ConditioningResult.SetFleetResult = SetFleetResult;
        var SupplyFleetResult = (function (_super) {
            __extends(SupplyFleetResult, _super);
            function SupplyFleetResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = new List();
                _this.uservo = null;
                return _this;
            }
            return SupplyFleetResult;
        }(Result.NetResult));
        ConditioningResult.SupplyFleetResult = SupplyFleetResult;
        var RepairShipResult = (function (_super) {
            __extends(RepairShipResult, _super);
            function RepairShipResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.packagevo = new List();
                _this.shipvos = new List();
                _this.repairdockvo = new List();
                _this.uservo = null;
                return _this;
            }
            return RepairShipResult;
        }(Result.NetResult));
        ConditioningResult.RepairShipResult = RepairShipResult;
        var RemoveBoatResult = (function (_super) {
            __extends(RemoveBoatResult, _super);
            function RemoveBoatResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.fleetvo = new List();
                _this.status = 0;
                return _this;
            }
            return RemoveBoatResult;
        }(Result.NetResult));
        ConditioningResult.RemoveBoatResult = RemoveBoatResult;
        var ChangeBoatResult = (function (_super) {
            __extends(ChangeBoatResult, _super);
            function ChangeBoatResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.fleetvo = new List();
                _this.status = 0;
                return _this;
            }
            return ChangeBoatResult;
        }(Result.NetResult));
        ConditioningResult.ChangeBoatResult = ChangeBoatResult;
        var DockRepairShipResult = (function (_super) {
            __extends(DockRepairShipResult, _super);
            function DockRepairShipResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = 0;
                _this.repairdockvo = new List();
                _this.shipvo = null;
                _this.uservo = null;
                return _this;
            }
            return DockRepairShipResult;
        }(Result.NetResult));
        ConditioningResult.DockRepairShipResult = DockRepairShipResult;
        var DockRubDownResult = (function (_super) {
            __extends(DockRubDownResult, _super);
            function DockRubDownResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.repairdockvo = new List();
                return _this;
            }
            return DockRubDownResult;
        }(Result.NetResult));
        ConditioningResult.DockRubDownResult = DockRubDownResult;
        var DockRepairQuickResult = (function (_super) {
            __extends(DockRepairQuickResult, _super);
            function DockRepairQuickResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = 0;
                _this.packagevo = new List();
                _this.repairdockvo = new List();
                _this.shipvo = null;
                _this.uservo = null;
                return _this;
            }
            return DockRepairQuickResult;
        }(Result.NetResult));
        ConditioningResult.DockRepairQuickResult = DockRepairQuickResult;
        var PVEGetUserDataResult = (function (_super) {
            __extends(PVEGetUserDataResult, _super);
            function PVEGetUserDataResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.pvelevel = new List();
                return _this;
            }
            return PVEGetUserDataResult;
        }(Result.NetResult));
        ConditioningResult.PVEGetUserDataResult = PVEGetUserDataResult;
        var ChangeEquipmentResult = (function (_super) {
            __extends(ChangeEquipmentResult, _super);
            function ChangeEquipmentResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = null;
                _this.equipmentvo = new List();
                return _this;
            }
            return ChangeEquipmentResult;
        }(Result.NetResult));
        ConditioningResult.ChangeEquipmentResult = ChangeEquipmentResult;
        var SpoilsShopListResult = (function (_super) {
            __extends(SpoilsShopListResult, _super);
            function SpoilsShopListResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.spoils = 0;
                return _this;
            }
            return SpoilsShopListResult;
        }(Result.NetResult));
        ConditioningResult.SpoilsShopListResult = SpoilsShopListResult;
        var BseaGetDataResult = (function (_super) {
            __extends(BseaGetDataResult, _super);
            function BseaGetDataResult() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BseaGetDataResult;
        }(Result.NetResult));
        ConditioningResult.BseaGetDataResult = BseaGetDataResult;
        var LiveGetUserInfoResult = (function (_super) {
            __extends(LiveGetUserInfoResult, _super);
            function LiveGetUserInfoResult() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LiveGetUserInfoResult;
        }(Result.NetResult));
        ConditioningResult.LiveGetUserInfoResult = LiveGetUserInfoResult;
        var ActiveGetUserDataResult = (function (_super) {
            __extends(ActiveGetUserDataResult, _super);
            function ActiveGetUserDataResult() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ActiveGetUserDataResult;
        }(Result.NetResult));
        ConditioningResult.ActiveGetUserDataResult = ActiveGetUserDataResult;
        var PveGetUserDataResult = (function (_super) {
            __extends(PveGetUserDataResult, _super);
            function PveGetUserDataResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.pvelevel = new List();
                return _this;
            }
            return PveGetUserDataResult;
        }(Result.NetResult));
        ConditioningResult.PveGetUserDataResult = PveGetUserDataResult;
        var CampaignGetUserDataResult = (function (_super) {
            __extends(CampaignGetUserDataResult, _super);
            function CampaignGetUserDataResult() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CampaignGetUserDataResult;
        }(Result.NetResult));
        ConditioningResult.CampaignGetUserDataResult = CampaignGetUserDataResult;
        var SetSupportResult = (function (_super) {
            __extends(SetSupportResult, _super);
            function SetSupportResult() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SetSupportResult;
        }(Result.NetResult));
        ConditioningResult.SetSupportResult = SetSupportResult;
        var GetPeventTaskResult = (function (_super) {
            __extends(GetPeventTaskResult, _super);
            function GetPeventTaskResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.exploit = 0;
                return _this;
            }
            return GetPeventTaskResult;
        }(Result.NetResult));
        ConditioningResult.GetPeventTaskResult = GetPeventTaskResult;
        var GuardConfigResult = (function (_super) {
            __extends(GuardConfigResult, _super);
            function GuardConfigResult() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return GuardConfigResult;
        }(Result.NetResult));
        ConditioningResult.GuardConfigResult = GuardConfigResult;
        var GuardGetThreeUserDataResult = (function (_super) {
            __extends(GuardGetThreeUserDataResult, _super);
            function GuardGetThreeUserDataResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.passednodes = null;
                _this.pveeventlevel = null;
                return _this;
            }
            return GuardGetThreeUserDataResult;
        }(Result.NetResult));
        ConditioningResult.GuardGetThreeUserDataResult = GuardGetThreeUserDataResult;
        var PveEventLevel = (function () {
            function PveEventLevel() {
                this.pvelevelid = 0;
                this.fleet = null;
                this.supatkstatus = 0;
                this.supported = 0;
                this.hp = 0;
                this.isnew = 0;
            }
            return PveEventLevel;
        }());
        ConditioningResult.PveEventLevel = PveEventLevel;
        var PeventSupAtkStatusResult = (function (_super) {
            __extends(PeventSupAtkStatusResult, _super);
            function PeventSupAtkStatusResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = 0;
                _this.supatkstatus = 0;
                return _this;
            }
            return PeventSupAtkStatusResult;
        }(Result.NetResult));
        ConditioningResult.PeventSupAtkStatusResult = PeventSupAtkStatusResult;
        var RankResult = (function (_super) {
            __extends(RankResult, _super);
            function RankResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.exploitrank = null;
                _this.exploit = "";
                _this.destroyrank = null;
                _this.handbookrank = null;
                _this.fleetrank = null;
                return _this;
            }
            return RankResult;
        }(Result.NetResult));
        ConditioningResult.RankResult = RankResult;
        var ExploitRank = (function () {
            function ExploitRank() {
                this.list = null;
                this.my = null;
            }
            return ExploitRank;
        }());
        ConditioningResult.ExploitRank = ExploitRank;
        var ExploitRankRow = (function () {
            function ExploitRankRow() {
                this.exploit = "";
                this.completetime = "";
                this.titleId = 0;
                this.rank = 0;
                this.uid = "";
                this.username = "";
                this.avatarCid = "";
                this.level = "";
            }
            return ExploitRankRow;
        }());
        ConditioningResult.ExploitRankRow = ExploitRankRow;
        var DestroyRank = (function () {
            function DestroyRank() {
                this.list = null;
                this.my = 0;
            }
            return DestroyRank;
        }());
        ConditioningResult.DestroyRank = DestroyRank;
        var DestroyRankRow = (function () {
            function DestroyRankRow() {
                this.shipcid = "";
                this.shiplevel = 0;
                this.num = 0;
                this.rank = 0;
                this.uid = "";
                this.username = "";
                this.avatarcid = 0;
                this.level = "";
            }
            return DestroyRankRow;
        }());
        ConditioningResult.DestroyRankRow = DestroyRankRow;
        var HandbookRank = (function () {
            function HandbookRank() {
                this.list = null;
                this.my = null;
            }
            return HandbookRank;
        }());
        ConditioningResult.HandbookRank = HandbookRank;
        var HandbookRankRow = (function () {
            function HandbookRankRow() {
                this.num = "";
                this.rate = "";
                this.completetime = "";
                this.rank = 0;
                this.uid = "";
                this.username = "";
                this.avatarcid = 0;
                this.level = "";
            }
            return HandbookRankRow;
        }());
        ConditioningResult.HandbookRankRow = HandbookRankRow;
        var FleetRank = (function () {
            function FleetRank() {
                this.list = null;
                this.my = null;
            }
            return FleetRank;
        }());
        ConditioningResult.FleetRank = FleetRank;
        var FleetRankRow = (function () {
            function FleetRankRow() {
                this.num = 0;
                this.titleid = 0;
                this.rank = 0;
                this.uid = "";
                this.username = "";
                this.avatarcid = 0;
                this.level = "";
            }
            return FleetRankRow;
        }());
        ConditioningResult.FleetRankRow = FleetRankRow;
    })(ConditioningResult = Net.ConditioningResult || (Net.ConditioningResult = {}));
    var AwardResult;
    (function (AwardResult) {
        var GetAwardResult = (function (_super) {
            __extends(GetAwardResult, _super);
            function GetAwardResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.taskvo = new List();
                _this.userresvo = null;
                return _this;
            }
            return GetAwardResult;
        }(Result.NetResult));
        AwardResult.GetAwardResult = GetAwardResult;
        var LoginAwardResult = (function (_super) {
            __extends(LoginAwardResult, _super);
            function LoginAwardResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.userresvo = null;
                return _this;
            }
            return LoginAwardResult;
        }(Result.NetResult));
        AwardResult.LoginAwardResult = LoginAwardResult;
    })(AwardResult = Net.AwardResult || (Net.AwardResult = {}));
    var CampaignResult;
    (function (CampaignResult) {
        var CampaignInitResult = (function (_super) {
            __extends(CampaignInitResult, _super);
            function CampaignInitResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cancampaignchallengelevel = new List();
                _this.passinfo = null;
                return _this;
            }
            return CampaignInitResult;
        }(Result.NetResult));
        CampaignResult.CampaignInitResult = CampaignInitResult;
        var GetFleetResult = (function (_super) {
            __extends(GetFleetResult, _super);
            function GetFleetResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.campaignlevelfleet = new List();
                return _this;
            }
            return GetFleetResult;
        }(Net.Result.NetResult));
        CampaignResult.GetFleetResult = GetFleetResult;
        var ChangeFleetResult = (function (_super) {
            __extends(ChangeFleetResult, _super);
            function ChangeFleetResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.campaignlevelfleet = new List();
                return _this;
            }
            return ChangeFleetResult;
        }(Net.Result.NetResult));
        CampaignResult.ChangeFleetResult = ChangeFleetResult;
        var CamChallengeResult = (function (_super) {
            __extends(CamChallengeResult, _super);
            function CamChallengeResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = new List();
                _this.warreport = null;
                return _this;
            }
            return CamChallengeResult;
        }(Net.Result.NetResult));
        CampaignResult.CamChallengeResult = CamChallengeResult;
        var CampaignWarResult = (function (_super) {
            __extends(CampaignWarResult, _super);
            function CampaignWarResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = new List();
                _this.userresvo = null;
                _this.packagevo = new List();
                _this.campaignvo = null;
                _this.warresult = null;
                return _this;
            }
            return CampaignWarResult;
        }(Net.Result.NetResult));
        CampaignResult.CampaignWarResult = CampaignWarResult;
    })(CampaignResult = Net.CampaignResult || (Net.CampaignResult = {}));
    var DockResult;
    (function (DockResult) {
        var LockBoatResult = (function (_super) {
            __extends(LockBoatResult, _super);
            function LockBoatResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.islocked = 0;
                _this.shipvo = null;
                return _this;
            }
            return LockBoatResult;
        }(Net.Result.NetResult));
        DockResult.LockBoatResult = LockBoatResult;
        var DismantleBoatResult = (function (_super) {
            __extends(DismantleBoatResult, _super);
            function DismantleBoatResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.delships = new List();
                _this.uservo = null;
                _this.equipmentvo = new List();
                return _this;
            }
            return DismantleBoatResult;
        }(Net.Result.NetResult));
        DockResult.DismantleBoatResult = DismantleBoatResult;
        var DismantleEquipmentResult = (function (_super) {
            __extends(DismantleEquipmentResult, _super);
            function DismantleEquipmentResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.delequipments = new List();
                _this.uservo = null;
                _this.equipmentvo = new List();
                return _this;
            }
            return DismantleEquipmentResult;
        }(Net.Result.NetResult));
        DockResult.DismantleEquipmentResult = DismantleEquipmentResult;
        var LockEquipmentResult = (function (_super) {
            __extends(LockEquipmentResult, _super);
            function LockEquipmentResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.islocked = 0;
                _this.equipmentvo = null;
                return _this;
            }
            return LockEquipmentResult;
        }(Net.Result.NetResult));
        DockResult.LockEquipmentResult = LockEquipmentResult;
    })(DockResult = Net.DockResult || (Net.DockResult = {}));
    var ExploreResult;
    (function (ExploreResult) {
        var ExploreGetResult = (function (_super) {
            __extends(ExploreGetResult, _super);
            function ExploreGetResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.bigsuccess = 0;
                _this.shipvo = null;
                _this.userresvo = null;
                _this.pveexplorevo = null;
                _this.newaward = null;
                _this.packagevo = new List();
                return _this;
            }
            return ExploreGetResult;
        }(Net.Result.NetResult));
        ExploreResult.ExploreGetResult = ExploreGetResult;
        var ExploreNewAward = (function () {
            function ExploreNewAward() {
                this.oil = 0;
                this.ammo = 0;
                this.steel = 0;
                this.aluminium = 0;
            }
            return ExploreNewAward;
        }());
        ExploreResult.ExploreNewAward = ExploreNewAward;
        var ExploreStartResult = (function (_super) {
            __extends(ExploreStartResult, _super);
            function ExploreStartResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.exploreid = 0;
                _this.fleetvo = new List();
                _this.pveexplorevo = null;
                return _this;
            }
            return ExploreStartResult;
        }(Net.Result.NetResult));
        ExploreResult.ExploreStartResult = ExploreStartResult;
        var ExploreCancelResult = (function (_super) {
            __extends(ExploreCancelResult, _super);
            function ExploreCancelResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = 0;
                _this.fleetvo = new List();
                _this.pveexplorevo = null;
                return _this;
            }
            return ExploreCancelResult;
        }(Net.Result.NetResult));
        ExploreResult.ExploreCancelResult = ExploreCancelResult;
    })(ExploreResult = Net.ExploreResult || (Net.ExploreResult = {}));
    var FightResult;
    (function (FightResult) {
        var NewNextResult = (function (_super) {
            __extends(NewNextResult, _super);
            function NewNextResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.node = 0;
                return _this;
            }
            return NewNextResult;
        }(Net.Result.NetResult));
        FightResult.NewNextResult = NewNextResult;
        var Cha11engeResult = (function (_super) {
            __extends(Cha11engeResult, _super);
            function Cha11engeResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = 0;
                return _this;
            }
            return Cha11engeResult;
        }(Net.Result.NetResult));
        FightResult.Cha11engeResult = Cha11engeResult;
        var SpyResult = (function (_super) {
            __extends(SpyResult, _super);
            function SpyResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.enemyvo = null;
                return _this;
            }
            return SpyResult;
        }(Net.Result.NetResult));
        FightResult.SpyResult = SpyResult;
        var DealtoResult = (function (_super) {
            __extends(DealtoResult, _super);
            function DealtoResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = 0;
                _this.shipvo = new List();
                _this.warreport = null;
                _this.userresvo = null;
                _this.packagevo = null;
                return _this;
            }
            return DealtoResult;
        }(Net.Result.NetResult));
        FightResult.DealtoResult = DealtoResult;
        var SkipResult = (function (_super) {
            __extends(SkipResult, _super);
            function SkipResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.issuccess = 0;
                _this.userresvo = null;
                return _this;
            }
            return SkipResult;
        }(Net.Result.NetResult));
        FightResult.SkipResult = SkipResult;
        var FightWarResult = (function (_super) {
            __extends(FightWarResult, _super);
            function FightWarResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.bosshpleft = 0;
                _this.shipvo = new List();
                _this.userresvo = null;
                _this.equipmentvo = new List();
                _this.extraprogress = null;
                _this.warresult = null;
                _this.packagevo = null;
                return _this;
            }
            return FightWarResult;
        }(Net.Result.NetResult));
        FightResult.FightWarResult = FightWarResult;
        var ExtraProgress = (function () {
            function ExtraProgress() {
                this.bosshp = 0;
                this.bosshpleft = 0;
                this.nightattacks = new List();
            }
            return ExtraProgress;
        }());
        FightResult.ExtraProgress = ExtraProgress;
    })(FightResult = Net.FightResult || (Net.FightResult = {}));
    var LoginResult;
    (function (LoginResult) {
        var PasswordLoginResult = (function (_super) {
            __extends(PasswordLoginResult, _super);
            function PasswordLoginResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.userid = 0;
                _this.userloginid = "";
                _this.Pwd = "";
                _this.callphone = "";
                _this.defaultserver = 0;
                _this.email = "";
                _this.hf_skey = "";
                _this.realstatus = 0;
                _this.serverlist = new List();
                return _this;
            }
            return PasswordLoginResult;
        }(Net.Result.NetResult));
        LoginResult.PasswordLoginResult = PasswordLoginResult;
        var PasswordLoginResult_Server = (function () {
            function PasswordLoginResult_Server() {
                this.host = "";
                this.id = 0;
                this.name = "";
                this.status = 0;
                this.hadrole = 0;
            }
            return PasswordLoginResult_Server;
        }());
        LoginResult.PasswordLoginResult_Server = PasswordLoginResult_Server;
        var InitUserInfoResult = (function (_super) {
            __extends(InitUserInfoResult, _super);
            function InitUserInfoResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.uservo = null;
                _this.repairdockvo = new List();
                _this.dockvo = new List();
                _this.equipmentdockvo = new List();
                _this.fleetvo = new List();
                _this.usershipvo = new List();
                _this.packagevo = new List();
                _this.pveexplorevo = null;
                _this.taskvo = new List();
                _this.tactics = new List();
                _this.equipmentvo = new List();
                _this.marketingdata = null;
                _this.systime = 0;
                _this.unlockship = new List();
                _this.unlockequipment = new List();
                return _this;
            }
            return InitUserInfoResult;
        }(Net.Result.NetResult));
        LoginResult.InitUserInfoResult = InitUserInfoResult;
    })(LoginResult = Net.LoginResult || (Net.LoginResult = {}));
    var PVPResult;
    (function (PVPResult) {
        var ChallengeListResult = (function (_super) {
            __extends(ChallengeListResult, _super);
            function ChallengeListResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.list = new List();
                return _this;
            }
            return ChallengeListResult;
        }(Net.Result.NetResult));
        PVPResult.ChallengeListResult = ChallengeListResult;
        var ChallengePlayer = (function () {
            function ChallengePlayer() {
                this.uid = 0;
                this.level = 0;
                this.username = "";
                this.fleetname = "";
                this.ships = new List();
                this.resultlevel = 0;
            }
            return ChallengePlayer;
        }());
        PVPResult.ChallengePlayer = ChallengePlayer;
        var PVPChallengeResult = (function (_super) {
            __extends(PVPChallengeResult, _super);
            function PVPChallengeResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.warreport = null;
                return _this;
            }
            return PVPChallengeResult;
        }(Net.Result.NetResult));
        PVPResult.PVPChallengeResult = PVPChallengeResult;
        var PVPWarResult = (function (_super) {
            __extends(PVPWarResult, _super);
            function PVPWarResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = new List();
                _this.warresult = null;
                return _this;
            }
            return PVPWarResult;
        }(Net.Result.NetResult));
        PVPResult.PVPWarResult = PVPWarResult;
    })(PVPResult = Net.PVPResult || (Net.PVPResult = {}));
    var FriendResult;
    (function (FriendResult) {
        var GetListResult = (function (_super) {
            __extends(GetListResult, _super);
            function GetListResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.list = new List();
                return _this;
            }
            return GetListResult;
        }(Net.Result.NetResult));
        FriendResult.GetListResult = GetListResult;
        var FriendPlayer = (function () {
            function FriendPlayer() {
                this.uid = 0;
                this.avatar_cid = 0;
                this.username = "";
                this.level = 0;
                this.sign = "";
                this.last_login_time = 0;
            }
            return FriendPlayer;
        }());
        FriendResult.FriendPlayer = FriendPlayer;
        var VisitorFriendResult = (function (_super) {
            __extends(VisitorFriendResult, _super);
            function VisitorFriendResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.fuid = 0;
                _this.detailinfo = null;
                _this.challengenum = 0;
                _this.challengescore = 0;
                _this.friendfleet = new List();
                return _this;
            }
            return VisitorFriendResult;
        }(Net.Result.NetResult));
        FriendResult.VisitorFriendResult = VisitorFriendResult;
        var VisitorFriendDetail = (function () {
            function VisitorFriendDetail() {
                this.username = "";
                this.level = 0;
            }
            return VisitorFriendDetail;
        }());
        FriendResult.VisitorFriendDetail = VisitorFriendDetail;
        var FriendChallengeResult = (function (_super) {
            __extends(FriendChallengeResult, _super);
            function FriendChallengeResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.warreport = null;
                return _this;
            }
            return FriendChallengeResult;
        }(Net.Result.NetResult));
        FriendResult.FriendChallengeResult = FriendChallengeResult;
        var FriendWarResult = (function (_super) {
            __extends(FriendWarResult, _super);
            function FriendWarResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = new List();
                _this.warresult = null;
                return _this;
            }
            return FriendWarResult;
        }(Net.Result.NetResult));
        FriendResult.FriendWarResult = FriendWarResult;
    })(FriendResult = Net.FriendResult || (Net.FriendResult = {}));
    var TransformResult;
    (function (TransformResult) {
        var StrengthenResult = (function (_super) {
            __extends(StrengthenResult, _super);
            function StrengthenResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.delships = new List();
                _this.shipvo = null;
                _this.equipmentvo = new List();
                return _this;
            }
            return StrengthenResult;
        }(Net.Result.NetResult));
        TransformResult.StrengthenResult = StrengthenResult;
        var SkillLevelUpResult = (function (_super) {
            __extends(SkillLevelUpResult, _super);
            function SkillLevelUpResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = null;
                return _this;
            }
            return SkillLevelUpResult;
        }(Net.Result.NetResult));
        TransformResult.SkillLevelUpResult = SkillLevelUpResult;
    })(TransformResult = Net.TransformResult || (Net.TransformResult = {}));
    var BuildResult;
    (function (BuildResult) {
        var BuildBoatResult = (function (_super) {
            __extends(BuildBoatResult, _super);
            function BuildBoatResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.packagevo = null;
                _this.buildnum = 0;
                _this.userresvo = null;
                _this.dockvo = null;
                return _this;
            }
            return BuildBoatResult;
        }(Net.Result.NetResult));
        BuildResult.BuildBoatResult = BuildBoatResult;
        var GetBoatResult = (function (_super) {
            __extends(GetBoatResult, _super);
            function GetBoatResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = null;
                _this.dockvo = null;
                return _this;
            }
            return GetBoatResult;
        }(Net.Result.NetResult));
        BuildResult.GetBoatResult = GetBoatResult;
        var InstantBuildResult = (function (_super) {
            __extends(InstantBuildResult, _super);
            function InstantBuildResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.packagevo = null;
                _this.dockvo = null;
                _this.status = 0;
                return _this;
            }
            return InstantBuildResult;
        }(Net.Result.NetResult));
        BuildResult.InstantBuildResult = InstantBuildResult;
        var BuildEquipmentResult = (function (_super) {
            __extends(BuildEquipmentResult, _super);
            function BuildEquipmentResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.packagevo = null;
                _this.buildnum = 0;
                _this.userresvo = null;
                _this.equipmentdockvo = null;
                return _this;
            }
            return BuildEquipmentResult;
        }(Net.Result.NetResult));
        BuildResult.BuildEquipmentResult = BuildEquipmentResult;
        var GetEquipmentResult = (function (_super) {
            __extends(GetEquipmentResult, _super);
            function GetEquipmentResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.equipmentvo = null;
                _this.equipmentcid = "";
                _this.equipmentdockvo = null;
                return _this;
            }
            return GetEquipmentResult;
        }(Net.Result.NetResult));
        BuildResult.GetEquipmentResult = GetEquipmentResult;
        var InstantEquipmentBuildResult = (function (_super) {
            __extends(InstantEquipmentBuildResult, _super);
            function InstantEquipmentBuildResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.packagevo = null;
                _this.equipmentdockvo = null;
                _this.status = 0;
                return _this;
            }
            return InstantEquipmentBuildResult;
        }(Net.Result.NetResult));
        BuildResult.InstantEquipmentBuildResult = InstantEquipmentBuildResult;
    })(BuildResult = Net.BuildResult || (Net.BuildResult = {}));
    var LiveResult;
    (function (LiveResult) {
        var GetTacticsResult = (function (_super) {
            __extends(GetTacticsResult, _super);
            function GetTacticsResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.classnum = "";
                _this.tacticsnum = "";
                _this.tacticsnum2 = "";
                _this.teacher = "";
                _this.teacher2 = "";
                _this.teacherlist = null;
                return _this;
            }
            return GetTacticsResult;
        }(Result.NetResult));
        LiveResult.GetTacticsResult = GetTacticsResult;
        var StudyTacticsResult = (function (_super) {
            __extends(StudyTacticsResult, _super);
            function StudyTacticsResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = null;
                _this.studystatus = 0;
                _this.packagevo = new List();
                _this.uservo = null;
                return _this;
            }
            return StudyTacticsResult;
        }(Result.NetResult));
        LiveResult.StudyTacticsResult = StudyTacticsResult;
        var SetTeacherResult = (function (_super) {
            __extends(SetTeacherResult, _super);
            function SetTeacherResult() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SetTeacherResult;
        }(Result.NetResult));
        LiveResult.SetTeacherResult = SetTeacherResult;
        var GetUserInfoResult = (function (_super) {
            __extends(GetUserInfoResult, _super);
            function GetUserInfoResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.buff = null;
                _this.chief = "";
                _this.status = 0;
                _this.cookbook = null;
                _this.eattimes = 0;
                _this.cookbookproficiency = null;
                _this.popularity = "";
                return _this;
            }
            return GetUserInfoResult;
        }(Net.Result.NetResult));
        LiveResult.GetUserInfoResult = GetUserInfoResult;
        var Buff = (function () {
            function Buff() {
                this.cid = "";
                this.endtime = 0;
            }
            return Buff;
        }());
        LiveResult.Buff = Buff;
        var cookbookproficiency = (function () {
            function cookbookproficiency() {
                this.boat_id = 0;
                this.cid = "";
                this.num = 0;
            }
            return cookbookproficiency;
        }());
        LiveResult.cookbookproficiency = cookbookproficiency;
        var GetAddPopularityResult = (function (_super) {
            __extends(GetAddPopularityResult, _super);
            function GetAddPopularityResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.addpopularity = 0;
                return _this;
            }
            return GetAddPopularityResult;
        }(Net.Result.NetResult));
        LiveResult.GetAddPopularityResult = GetAddPopularityResult;
        var SetChiefResult = (function (_super) {
            __extends(SetChiefResult, _super);
            function SetChiefResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = 0;
                return _this;
            }
            return SetChiefResult;
        }(Net.Result.NetResult));
        LiveResult.SetChiefResult = SetChiefResult;
        var SetCookResult = (function (_super) {
            __extends(SetCookResult, _super);
            function SetCookResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.shipvo = null;
                return _this;
            }
            return SetCookResult;
        }(Net.Result.NetResult));
        LiveResult.SetCookResult = SetCookResult;
        var EatResult = (function (_super) {
            __extends(EatResult, _super);
            function EatResult() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.buff = null;
                _this.popularity = 0;
                _this.rtype = 0;
                _this.cid = "";
                _this.userresvo = null;
                _this.usershipvo = null;
                return _this;
            }
            return EatResult;
        }(Net.Result.NetResult));
        LiveResult.EatResult = EatResult;
    })(LiveResult = Net.LiveResult || (Net.LiveResult = {}));
})(Net || (Net = {}));
var GameNetErrorCode = (function () {
    function GameNetErrorCode() {
    }
    GameNetErrorCode.GetInstance = function () {
        if (this._instance == null) {
            this._instance = new GameNetErrorCode();
        }
        return this._instance;
    };
    GameNetErrorCode.GetDictValue = function (code) {
        if (this.Dict.Length == 0) {
            this.Init();
        }
        try {
            return GameNetErrorCode.Dict.Where(function (c) { return ("-" + c.Key) == code.toString(); }).FirstOrDefault().Value;
        }
        catch (_a) {
            return "未知错误";
        }
    };
    GameNetErrorCode.Init = function () {
        GameNetErrorCode.Dict.Add("1", "操作速度太快，请慢点操作");
        GameNetErrorCode.Dict.Add("2", "数据库错误");
        GameNetErrorCode.Dict.Add("3", "您的账号被封锁，请联系游戏管理员！");
        GameNetErrorCode.Dict.Add("4", "非法访问！");
        GameNetErrorCode.Dict.Add("5", "超时！");
        GameNetErrorCode.Dict.Add("6", "网络异常");
        GameNetErrorCode.Dict.Add("101", "参数错误");
        GameNetErrorCode.Dict.Add("102", "资源不足");
        GameNetErrorCode.Dict.Add("103", "数据不存在");
        GameNetErrorCode.Dict.Add("104", "钻石数量不够");
        GameNetErrorCode.Dict.Add("105", "燃料不够");
        GameNetErrorCode.Dict.Add("106", "弹药不够");
        GameNetErrorCode.Dict.Add("107", "铝材不够");
        GameNetErrorCode.Dict.Add("108", "钢材不够");
        GameNetErrorCode.Dict.Add("109", "等级不够");
        GameNetErrorCode.Dict.Add("110", "用户名已被注册");
        GameNetErrorCode.Dict.Add("111", "密码不一致");
        GameNetErrorCode.Dict.Add("112", "没有注册");
        GameNetErrorCode.Dict.Add("113", "用户名密码不正确");
        GameNetErrorCode.Dict.Add("114", "没有登录");
        GameNetErrorCode.Dict.Add("115", "不是游客");
        GameNetErrorCode.Dict.Add("116", "游客未登记");
        GameNetErrorCode.Dict.Add("117", "游客已绑定");
        GameNetErrorCode.Dict.Add("118", "邮箱不对");
        GameNetErrorCode.Dict.Add("119", "角色名已存在");
        GameNetErrorCode.Dict.Add("120", "角色名不合法");
        GameNetErrorCode.Dict.Add("121", "注册码不存在");
        GameNetErrorCode.Dict.Add("122", "注册码已用");
        GameNetErrorCode.Dict.Add("123", "用户名请用字母数字");
        GameNetErrorCode.Dict.Add("124", "cookie出错1");
        GameNetErrorCode.Dict.Add("125", "cookie出错2");
        GameNetErrorCode.Dict.Add("126", "手机号码不正确");
        GameNetErrorCode.Dict.Add("127", "验证出错");
        GameNetErrorCode.Dict.Add("128", "登录错误次数超过限制");
        GameNetErrorCode.Dict.Add("129", "您取名包含非法字符，请重新取名");
        GameNetErrorCode.Dict.Add("130", "登录失效，不能绑定");
        GameNetErrorCode.Dict.Add("131", "不能绑定");
        GameNetErrorCode.Dict.Add("132", "未审核通过，请联系客服");
        GameNetErrorCode.Dict.Add("133", "该账号已绑定，请勿重复");
        GameNetErrorCode.Dict.Add("134", "验证码已发送");
        GameNetErrorCode.Dict.Add("135", "验证码出错");
        GameNetErrorCode.Dict.Add("136", "请输入用户名");
        GameNetErrorCode.Dict.Add("137", "请输入密码");
        GameNetErrorCode.Dict.Add("138", "用户名长度6-24位");
        GameNetErrorCode.Dict.Add("139", "密码长度6-24位");
        GameNetErrorCode.Dict.Add("140", "与旧密码相同");
        GameNetErrorCode.Dict.Add("141", "原始密码不正确");
        GameNetErrorCode.Dict.Add("142", "密码修改成功");
        GameNetErrorCode.Dict.Add("143", "需要修改密码");
        GameNetErrorCode.Dict.Add("144", "找回密码的邮件已发送，请通过邮件找回密码");
        GameNetErrorCode.Dict.Add("145", "已绑定邮箱");
        GameNetErrorCode.Dict.Add("146", "暂未开放");
        GameNetErrorCode.Dict.Add("147", "邮箱未验证");
        GameNetErrorCode.Dict.Add("148", "邮箱需要验证，请去邮箱根据邮件进行后续操作");
        GameNetErrorCode.Dict.Add("149", "角色名已经存在");
        GameNetErrorCode.Dict.Add("150", "一周只能改一次名");
        GameNetErrorCode.Dict.Add("151", "您输入的用户名太长");
        GameNetErrorCode.Dict.Add("152", "密码只能使用数字字母和下划线");
        GameNetErrorCode.Dict.Add("153", "真实姓名不正确");
        GameNetErrorCode.Dict.Add("154", "身份证号不正确");
        GameNetErrorCode.Dict.Add("155", "继承码不存在");
        GameNetErrorCode.Dict.Add("156", "绑定邮箱不一致");
        GameNetErrorCode.Dict.Add("157", "角色已存在，不能继承");
        GameNetErrorCode.Dict.Add("158", "继承码已经使用");
        GameNetErrorCode.Dict.Add("159", "继承码不能使用在该分区");
        GameNetErrorCode.Dict.Add("201", "修理船坞正在工作");
        GameNetErrorCode.Dict.Add("202", "船坞数量不足");
        GameNetErrorCode.Dict.Add("203", "目前不需要加速");
        GameNetErrorCode.Dict.Add("204", "加速道具不足");
        GameNetErrorCode.Dict.Add("205", "时间没到");
        GameNetErrorCode.Dict.Add("206", "舰船被锁定，不能拆除");
        GameNetErrorCode.Dict.Add("207", "船坞数量已满");
        GameNetErrorCode.Dict.Add("208", "舰船不需要维修");
        GameNetErrorCode.Dict.Add("209", "舰船正在维修");
        GameNetErrorCode.Dict.Add("210", "建造蓝图不足");
        GameNetErrorCode.Dict.Add("211", "舰船在舰队中不能拆除");
        GameNetErrorCode.Dict.Add("212", "舰船目前不能改造");
        GameNetErrorCode.Dict.Add("213", "道具不足");
        GameNetErrorCode.Dict.Add("214", "舰船等级不足");
        GameNetErrorCode.Dict.Add("215", "船坞已满");
        GameNetErrorCode.Dict.Add("216", "好感度不足");
        GameNetErrorCode.Dict.Add("217", "已签订誓约");
        GameNetErrorCode.Dict.Add("218", "装备蓝图不足");
        GameNetErrorCode.Dict.Add("219", "装备数量已满");
        GameNetErrorCode.Dict.Add("220", "未签订誓约,不能使用");
        GameNetErrorCode.Dict.Add("221", "未拥有,不能使用");
        GameNetErrorCode.Dict.Add("222", "不能使用该皮肤");
        GameNetErrorCode.Dict.Add("301", "舰船等级不足");
        GameNetErrorCode.Dict.Add("302", "舰船不能升阶");
        GameNetErrorCode.Dict.Add("303", "装备不存在");
        GameNetErrorCode.Dict.Add("304", "装备已被移除");
        GameNetErrorCode.Dict.Add("305", "不是空闲状态，不能被吞噬");
        GameNetErrorCode.Dict.Add("306", "装备已使用");
        GameNetErrorCode.Dict.Add("307", "装备正在使用,不能拆除");
        GameNetErrorCode.Dict.Add("308", "舰船在其他舰队中");
        GameNetErrorCode.Dict.Add("309", "舰队中不能有相同的舰船");
        GameNetErrorCode.Dict.Add("310", "舰船和装备不匹配");
        GameNetErrorCode.Dict.Add("311", "舰船和装备不匹配");
        GameNetErrorCode.Dict.Add("312", "装备栏位已满");
        GameNetErrorCode.Dict.Add("313", "相同位置不需要更换");
        GameNetErrorCode.Dict.Add("314", "第一舰队不能为空");
        GameNetErrorCode.Dict.Add("315", "该舰船没有技能");
        GameNetErrorCode.Dict.Add("316", "属性没有强化到达满值");
        GameNetErrorCode.Dict.Add("317", "技能等级已满");
        GameNetErrorCode.Dict.Add("318", "已经有编队,不能再次编队");
        GameNetErrorCode.Dict.Add("319", "舰队不存在");
        GameNetErrorCode.Dict.Add("320", "舰船已锁定");
        GameNetErrorCode.Dict.Add("321", "舰船已解锁");
        GameNetErrorCode.Dict.Add("322", "不适用的技能");
        GameNetErrorCode.Dict.Add("323", "不能转换相同的技能");
        GameNetErrorCode.Dict.Add("324", "原技能等级为0，不能转换");
        GameNetErrorCode.Dict.Add("325", "技能无法觉醒");
        GameNetErrorCode.Dict.Add("326", "技能无法升级");
        GameNetErrorCode.Dict.Add("401", "前置章节未通关");
        GameNetErrorCode.Dict.Add("402", "节点不存在");
        GameNetErrorCode.Dict.Add("403", "没有下一节点");
        GameNetErrorCode.Dict.Add("404", "舰队正在远征");
        GameNetErrorCode.Dict.Add("405", "舰队不存在");
        GameNetErrorCode.Dict.Add("406", "舰队中没有舰船");
        GameNetErrorCode.Dict.Add("407", "舰队中有大破的舰船，不能出征");
        GameNetErrorCode.Dict.Add("408", "补给为空，不能出征");
        GameNetErrorCode.Dict.Add("409", "节点已结束");
        GameNetErrorCode.Dict.Add("410", "舰队中必须有一艘旗舰");
        GameNetErrorCode.Dict.Add("411", "正在出征中");
        GameNetErrorCode.Dict.Add("412", "远征中");
        GameNetErrorCode.Dict.Add("413", "正在修理，不能出征");
        GameNetErrorCode.Dict.Add("414", "主力舰队作战，潜艇无法参加");
        GameNetErrorCode.Dict.Add("415", "支援补给未满无法出征");
        GameNetErrorCode.Dict.Add("416", "此关卡必须满血出征");
        GameNetErrorCode.Dict.Add("417", "请先为此关卡编队");
        GameNetErrorCode.Dict.Add("418", "胜利才能驻守");
        GameNetErrorCode.Dict.Add("419", "不需要驻守");
        GameNetErrorCode.Dict.Add("420", "驻守中");
        GameNetErrorCode.Dict.Add("421", "船型不符合要求，不能出征");
        GameNetErrorCode.Dict.Add("422", "每日只能重置一次");
        GameNetErrorCode.Dict.Add("501", "邮件不存在");
        GameNetErrorCode.Dict.Add("502", "邮件附件已领取");
        GameNetErrorCode.Dict.Add("601", "舰队不在远征");
        GameNetErrorCode.Dict.Add("602", "远征时间未到");
        GameNetErrorCode.Dict.Add("603", "舰队不存在");
        GameNetErrorCode.Dict.Add("604", "舰队正在远征");
        GameNetErrorCode.Dict.Add("605", "有舰队正在远征此关卡");
        GameNetErrorCode.Dict.Add("606", "旗舰等级不够");
        GameNetErrorCode.Dict.Add("607", "舰队船只数量不足");
        GameNetErrorCode.Dict.Add("608", "船只类型不符合条件");
        GameNetErrorCode.Dict.Add("609", "章节未开启,当前关卡不能远征");
        GameNetErrorCode.Dict.Add("701", "任务未完成");
        GameNetErrorCode.Dict.Add("702", "奖励已领取");
        GameNetErrorCode.Dict.Add("801", "商城购买");
        GameNetErrorCode.Dict.Add("802", "不能购买");
        GameNetErrorCode.Dict.Add("803", "已经拥有,不能购买");
        GameNetErrorCode.Dict.Add("901", "舰队不存在");
        GameNetErrorCode.Dict.Add("902", "舰队没有舰船");
        GameNetErrorCode.Dict.Add("903", "舰队正在远征");
        GameNetErrorCode.Dict.Add("904", "请重新挑战");
        GameNetErrorCode.Dict.Add("905", "不在挑战列表中");
        GameNetErrorCode.Dict.Add("906", "已挑战");
        GameNetErrorCode.Dict.Add("1001", "建造船坞已满");
        GameNetErrorCode.Dict.Add("1002", "装备开发船坞已满");
        GameNetErrorCode.Dict.Add("1003", "维修船坞已满");
        GameNetErrorCode.Dict.Add("1004", "舰船船坞已满");
        GameNetErrorCode.Dict.Add("1005", "装备仓库已满");
        GameNetErrorCode.Dict.Add("1006", "不是钻石购买的类型");
        GameNetErrorCode.Dict.Add("1007", "该商品限购");
        GameNetErrorCode.Dict.Add("1008", "不是*屏蔽的关键字*购买的类型");
        GameNetErrorCode.Dict.Add("1009", "支付未成功");
        GameNetErrorCode.Dict.Add("1010", "不在购买时间内");
        GameNetErrorCode.Dict.Add("1011", "战利品不足");
        GameNetErrorCode.Dict.Add("1012", "不能重复购买");
        GameNetErrorCode.Dict.Add("1013", "功勋不足");
        GameNetErrorCode.Dict.Add("1101", "此位置不允许放船");
        GameNetErrorCode.Dict.Add("1102", "船的类型不匹配");
        GameNetErrorCode.Dict.Add("1103", "船的cid不匹配");
        GameNetErrorCode.Dict.Add("1104", "不能用同一种战舰");
        GameNetErrorCode.Dict.Add("1105", "不符合规则，不能出击");
        GameNetErrorCode.Dict.Add("1106", "前置pve没过");
        GameNetErrorCode.Dict.Add("1107", "前置战役没过");
        GameNetErrorCode.Dict.Add("1108", "今日挑战次数已满");
        GameNetErrorCode.Dict.Add("1109", "舰队含远征中船只，无法出征");
        GameNetErrorCode.Dict.Add("1110", "舰队含修理中船只，无法出征");
        GameNetErrorCode.Dict.Add("1111", "舰队含已撤退船只，无法出征");
        GameNetErrorCode.Dict.Add("1112", "支援系统未解锁");
        GameNetErrorCode.Dict.Add("1113", "不能升级");
        GameNetErrorCode.Dict.Add("1201", "无此兑换码");
        GameNetErrorCode.Dict.Add("1202", "尚未开启兑换");
        GameNetErrorCode.Dict.Add("1203", "该兑换码已过期");
        GameNetErrorCode.Dict.Add("1204", "已用完");
        GameNetErrorCode.Dict.Add("1205", "您已兑换过该类礼包");
        GameNetErrorCode.Dict.Add("1206", "奖励已经领取");
        GameNetErrorCode.Dict.Add("1207", "没有领取资格");
        GameNetErrorCode.Dict.Add("1208", "等级不够,无法领取");
        GameNetErrorCode.Dict.Add("1209", "等级太高,无法领取");
        GameNetErrorCode.Dict.Add("1301", "您的好友已满,不能再添加");
        GameNetErrorCode.Dict.Add("1302", "好友申请已满,不能再申请");
        GameNetErrorCode.Dict.Add("1303", "申请已过期");
        GameNetErrorCode.Dict.Add("1304", "对方的好友已满,不能再添");
        GameNetErrorCode.Dict.Add("1305", "挑战次数已满，请休息一会");
        GameNetErrorCode.Dict.Add("1306", "调整队伍次数已满");
        GameNetErrorCode.Dict.Add("1307", "已经是好友");
        GameNetErrorCode.Dict.Add("1308", "您输入的玩家并不存在");
        GameNetErrorCode.Dict.Add("1309", "签名不得超过30个字节");
        GameNetErrorCode.Dict.Add("1310", "没有此勋章");
        GameNetErrorCode.Dict.Add("1311", "勋章没有完成");
        GameNetErrorCode.Dict.Add("1312", "勋章已经完成");
        GameNetErrorCode.Dict.Add("1313", "请不要向自己发送好友申请");
        GameNetErrorCode.Dict.Add("1314", "该玩家只允许通过UID添加好友");
        GameNetErrorCode.Dict.Add("1401", "一波战役不能选择其他好友");
        GameNetErrorCode.Dict.Add("1402", "不是好友");
        GameNetErrorCode.Dict.Add("1403", "好友已协助战斗，次日才可邀请");
        GameNetErrorCode.Dict.Add("1404", "不能使用好友舰队");
        GameNetErrorCode.Dict.Add("1405", "不能重复使用船只");
        GameNetErrorCode.Dict.Add("1406", "同舰船类型已达到出战数量上限");
        GameNetErrorCode.Dict.Add("1407", "补给次数不足");
        GameNetErrorCode.Dict.Add("1408", "驻守中的舰船不能补给及修理");
        GameNetErrorCode.Dict.Add("1409", "舰队中有一耐久度为0的船，不能出战");
        GameNetErrorCode.Dict.Add("1410", "敌人已经被消灭");
        GameNetErrorCode.Dict.Add("1411", "副本时间未开启");
        GameNetErrorCode.Dict.Add("1412", "战斗中不能编队");
        GameNetErrorCode.Dict.Add("1413", "战斗中不能补给");
        GameNetErrorCode.Dict.Add("1414", "有舰船正在驻守中，无法出征");
        GameNetErrorCode.Dict.Add("1415", "有舰船正在驻守中，无法出征");
        GameNetErrorCode.Dict.Add("1416", "有舰船正驻守中，无法远征");
        GameNetErrorCode.Dict.Add("1417", "有舰船驻守中，不能进行战役");
        GameNetErrorCode.Dict.Add("1418", "有舰船驻守中");
        GameNetErrorCode.Dict.Add("1419", "旗舰大破不能出击");
        GameNetErrorCode.Dict.Add("1501", "已编队");
        GameNetErrorCode.Dict.Add("1502", "已侦察");
        GameNetErrorCode.Dict.Add("1503", "下次侦察时间未到");
        GameNetErrorCode.Dict.Add("1504", "已经在待命中");
        GameNetErrorCode.Dict.Add("1505", "请先侦察");
        GameNetErrorCode.Dict.Add("1506", "事件已经结束");
        GameNetErrorCode.Dict.Add("1507", "非战斗点");
        GameNetErrorCode.Dict.Add("1508", "不是宝箱");
        GameNetErrorCode.Dict.Add("1509", "夜幕降临，侦察机无法在0点至8点出击侦察");
        GameNetErrorCode.Dict.Add("1601", "房间不存在");
        GameNetErrorCode.Dict.Add("1602", "家具在房间中，不能回收");
        GameNetErrorCode.Dict.Add("1603", "家具已锁定，不能回收");
        GameNetErrorCode.Dict.Add("1604", "家具没有收集完成");
        GameNetErrorCode.Dict.Add("1605", "已领取");
        GameNetErrorCode.Dict.Add("1606", "家具数量不足");
        GameNetErrorCode.Dict.Add("1607", "家具仓库已满");
        GameNetErrorCode.Dict.Add("1608", "今日好感度收取已达上限（5次）");
        GameNetErrorCode.Dict.Add("1609", "方案名10个字");
        GameNetErrorCode.Dict.Add("1610", "家具方案不存在");
        GameNetErrorCode.Dict.Add("1611", "自己上传的方案不能取消");
        GameNetErrorCode.Dict.Add("1612", "已经收藏过了");
        GameNetErrorCode.Dict.Add("1613", "每周上传3次");
        GameNetErrorCode.Dict.Add("1614", "只能收藏 100个");
        GameNetErrorCode.Dict.Add("1615", "宿舍已达上限");
        GameNetErrorCode.Dict.Add("1701", "请先设置一个厨师");
        GameNetErrorCode.Dict.Add("1702", "还未学会这道菜谱");
        GameNetErrorCode.Dict.Add("1703", "厨师与菜谱国籍不相同");
        GameNetErrorCode.Dict.Add("1704", "好友没有设置厨师");
        GameNetErrorCode.Dict.Add("1705", "厨师没有学会这道菜");
        GameNetErrorCode.Dict.Add("1706", "每日只能吃三次食物");
        GameNetErrorCode.Dict.Add("1801", "教官没有拥有");
        GameNetErrorCode.Dict.Add("1802", "训练栏已达上限");
        GameNetErrorCode.Dict.Add("1803", "训练栏已满");
        GameNetErrorCode.Dict.Add("1804", "没有设置教官");
        GameNetErrorCode.Dict.Add("1805", "不是当前教官的战术");
        GameNetErrorCode.Dict.Add("1806", "船型限制,不能学习该战术");
        GameNetErrorCode.Dict.Add("1807", "舰船等级不足");
        GameNetErrorCode.Dict.Add("1808", "未完成学习的战术，不能使用");
        GameNetErrorCode.Dict.Add("1809", "有战术在学习中，不能替换");
        GameNetErrorCode.Dict.Add("1901", "投票时间已经结束");
        GameNetErrorCode.Dict.Add("1902", "蓝飘带数量不足");
        GameNetErrorCode.Dict.Add("2001", "不需要选择战况");
        GameNetErrorCode.Dict.Add("2002", "前置关卡未过");
        GameNetErrorCode.Dict.Add("2003", "奖励已经领取");
        GameNetErrorCode.Dict.Add("2004", "分数不够");
        GameNetErrorCode.Dict.Add("2005", "奖励不存在");
        GameNetErrorCode.Dict.Add("2006", "当前战况限制，不可用当前舰队，请重新编队");
        GameNetErrorCode.Dict.Add("2007", "旗舰大破不能出击");
        GameNetErrorCode.Dict.Add("9993", "活动已经结束，请点击[确认]后回到港口界面");
        GameNetErrorCode.Dict.Add("9994", "您已经登出");
        GameNetErrorCode.Dict.Add("9995", "登陆失效");
        GameNetErrorCode.Dict.Add("9996", "非法请求");
        GameNetErrorCode.Dict.Add("9997", "您的账号已经在别的设备上登录");
        GameNetErrorCode.Dict.Add("9998", "账号被冻结，请联系客服");
        GameNetErrorCode.Dict.Add("9999", "服务器正在维护");
    };
    GameNetErrorCode.Dict = new Dictionary();
    return GameNetErrorCode;
}());
//# sourceMappingURL=net.js.map