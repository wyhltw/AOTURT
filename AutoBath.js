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
var AutoBath = (function () {
    function AutoBath() {
    }
    AutoBath.RunThread = function () {
        var _this = this;
        this.timer = new Timer();
        this.timer.Interval = 8000;
        this.timer.Elapsed = function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timer.Stop();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        if (!(MissionWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready)) return [3, 3];
                        return [4, this.CheckAutoInDock()];
                    case 2:
                        _a.sent();
                        this.CheckAutoRepair();
                        _a.label = 3;
                    case 3: return [3, 6];
                    case 4:
                        ex_1 = _a.sent();
                        return [3, 6];
                    case 5:
                        this.timer.Start();
                        return [7];
                    case 6: return [2];
                }
            });
        }); };
        this.timer.Start();
    };
    AutoBath.CheckAutoInDock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _This, removeShipids;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        _This.RepairShips = _This.RepairShips.Where(function (c) {
                            var ship = Player.GetShip(c.ShipID);
                            if (ship == null) {
                                return false;
                            }
                            if (ship.battleprops.hp >= ship.battlepropsmax.hp) {
                                return false;
                            }
                            return true;
                        });
                        if (NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
                            return [2];
                        removeShipids = new List();
                        return [4, _This.RepairShips.Where(function (c) { return c.IsRepairing == false; }).OrderBy(function (c) { return c.OrderIndex; }).ForEachAsync(function (rp) { return __awaiter(_this, void 0, void 0, function () {
                                var ship, freeDocks, repairDock, repairResult, moreMsg;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            ship = Player.GetShip(rp.ShipID);
                                            if (!(ship == null || ship.battleprops.hp >= ship.battlepropsmax.hp)) return [3, 1];
                                            removeShipids.Add(rp.ShipID);
                                            return [3, 12];
                                        case 1:
                                            if (!Player.IsRepairShip(ship)) return [3, 2];
                                            rp.IsRepairing = true;
                                            return [3, 12];
                                        case 2:
                                            if (!(Player.IsYuanZhangShip(ship) || Player.IsZhuShouShip(ship))) return [3, 3];
                                            return [3, 12];
                                        case 3:
                                            freeDocks = Player.RepairDockVo.Where(function (c) { return c.locked == 0 && (c.shipid == 0 || c.shipid == undefined); });
                                            if (!(freeDocks.Count() > 0)) return [3, 12];
                                            repairDock = freeDocks[0];
                                            return [4, Net.NetComm.DealyRandom(2000)];
                                        case 4:
                                            _a.sent();
                                            return [4, Net.Conditioning.DockRepairShip(repairDock.id, ship.id)];
                                        case 5:
                                            repairResult = _a.sent();
                                            return [4, Net.NetComm.DealyRandom(2000)];
                                        case 6:
                                            _a.sent();
                                            if (!(repairResult.ErrorCode == 0)) return [3, 9];
                                            rp.IsRepairing = true;
                                            if (!(Config.MoreSetting.RepairRubDown == true)) return [3, 8];
                                            return [4, Net.Conditioning.DockRubDown(ship.id)];
                                        case 7:
                                            _a.sent();
                                            _a.label = 8;
                                        case 8:
                                            Logs.Print("澡堂 - " + Player.GetShipName(ship) + " 泡澡");
                                            return [3, 12];
                                        case 9:
                                            moreMsg = (repairResult.eid == -102 || repairResult.eid == -105 || repairResult.eid == -106 || repairResult.eid == -107 || repairResult.eid == -108) ? "资源不足" : "";
                                            Logs.Print("澡堂 - " + Player.GetShipName(ship) + " 泡澡失败" + moreMsg);
                                            return [4, Net.Login.InitUserInfo()];
                                        case 10:
                                            _a.sent();
                                            return [4, Net.NetComm.DealyRandom(5000)];
                                        case 11:
                                            _a.sent();
                                            _a.label = 12;
                                        case 12: return [2];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _This.RepairShips.RemoveAll(function (c) { return removeShipids.Contains(c.ShipID); });
                        return [2];
                }
            });
        });
    };
    AutoBath.CheckAutoRepair = function () {
        if (MissionWorker.LastEndTimeSpan == 0) {
            MissionWorker.LastEndTimeSpan = NetDate.GetTimeSpan();
        }
        if (Config.MoreSetting.AutoRepair == false || NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
            return;
        if (Config.MoreSetting.AutoRepair_Leisure == true && MissionWorker.State == DBEnum.WorkState.Ready && (NetDate.GetTimeSpan() - MissionWorker.LastEndTimeSpan) > (1000 * 60 * 5)) {
            var freeDocks = Player.RepairDockVo.Where(function (c) { return c.locked == 0 && (c.shipid == 0 || c.shipid == undefined); });
            if (freeDocks.Count() > 0) {
                var waitRepairShipids = AutoBath.RepairShips.Select(function (c) { return c.ShipID; });
                var readyShips = Player.UserShipVo.Where(function (ship) { return ship.battleprops.hp < ship.battlepropsmax.hp && waitRepairShipids.Contains(ship.id) == false && Player.IsYuanZhangShip(ship) == false && Player.IsZhuShouShip(ship) == false && Player.IsRepairShip(ship) == false; }).Select(function (c) { return { Ship: c, RepairTime: Player.GetRepairTime(c) }; }).Where(function (c) { return c.RepairTime > (Config.MoreSetting.AutoRepair_MinutesMin * 60) && c.RepairTime < (Config.MoreSetting.AutoRepair_MinutesMax * 60); });
                if (readyShips.Count() > 0) {
                    switch (Config.MoreSetting.AutoRepair_Order) {
                        case "TimeAsc":
                            {
                                readyShips = readyShips.OrderBy(function (c) { return c.RepairTime; });
                            }
                            break;
                        case "TimeDesc":
                            {
                                readyShips = readyShips.OrderByDescending(function (c) { return c.RepairTime; });
                            }
                            break;
                        case "LevelAsc":
                            {
                                readyShips = readyShips.OrderBy(function (c) { return c.Ship.level; });
                            }
                            break;
                        case "LevelDesc":
                            {
                                readyShips = readyShips.OrderByDescending(function (c) { return c.Ship.level; });
                            }
                            break;
                        default:
                            {
                                readyShips = readyShips.OrderBy(function (c) { return c.Ship.id; });
                            }
                            ;
                    }
                    readyShips = readyShips.Take(freeDocks.Count());
                    readyShips.ForEach(function (c) {
                        AutoBath.RepairShips.Add({ ShipID: c.Ship.id, IsRepairing: false, OrderIndex: -1 });
                    });
                }
            }
        }
    };
    AutoBath.RepairShips = new List();
    return AutoBath;
}());
var ReparirShip = (function () {
    function ReparirShip() {
    }
    return ReparirShip;
}());
//# sourceMappingURL=AutoBath.js.map