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
var MissionWorker = (function () {
    function MissionWorker() {
    }
    Object.defineProperty(MissionWorker, "IsPveEvent", {
        get: function () {
            return List.From(["9962", "9963", "9964", "9965", "9966", "9967"]).Contains(MissionWorker.CurrentWork.ChallengeID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionWorker, "PVEEvent", {
        get: function () {
            try {
                return Player.PveEvent.pveeventlevel.FirstOrDefault(function (c) { return c.pvelevelid.toString() == MissionWorker.CurrentWork.ChallengeID.toString(); });
            }
            catch (_a) {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionWorker, "QiXiShips", {
        get: function () {
            var _This = this;
            if (List.From(["9962", "9963", "9964", "9965", "9966", "9967"]).Contains(_This.CurrentWork.ChallengeID) && Player.PveEvent && Player.PveEvent != null) {
                var pveEvent = Player.PveEvent.pveeventlevel.FirstOrDefault(function (c) { return c.pvelevelid.toString() == _This.CurrentWork.ChallengeID.toString(); });
                if (pveEvent && pveEvent.supatkstatus == 1 && pveEvent.fleet && pveEvent.fleet.Count() > 0) {
                    pveEvent.fleet = pveEvent.fleet ? pveEvent.fleet : new List();
                    return pveEvent.fleet.Select(function (c) { return Player.GetShip(c); });
                }
            }
            return new List();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionWorker, "RepairTypes", {
        get: function () {
            var _This = this;
            var expsetting = Config.MoreSetting.ExpertPVESettings.Where(function (c) { return c.CustiomPVEID == _This.CurrentWork.CustiomPVEID; }).FirstOrDefault();
            if (expsetting == null || expsetting.CanChangeRepairLevel == false) {
                return List.From([_This.CurrentWork.RepairLevel, _This.CurrentWork.RepairLevel, _This.CurrentWork.RepairLevel, _This.CurrentWork.RepairLevel, _This.CurrentWork.RepairLevel, _This.CurrentWork.RepairLevel]);
            }
            else {
                return expsetting.RepairTypes;
            }
        },
        enumerable: true,
        configurable: true
    });
    MissionWorker.Start = function (init) {
        return __awaiter(this, void 0, void 0, function () {
            var _This, fleetStatus, busyFleetShips, i, workResult, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        _This.OnCheck.ForEach(function (f) { f(); });
                        if (MissionWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("【执行失败，当前任务执行中！】");
                            return [2];
                        }
                        if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("【执行失败，当前演习执行中！】");
                            return [2];
                        }
                        if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("【执行失败，当前战役执行中！】");
                            return [2];
                        }
                        fleetStatus = Player.FleetVo.FirstOrDefault(function (c) { return c.id == Config.CurrentFleetID; }).status;
                        if (fleetStatus != 0) {
                            Logs.Print(fleetStatus == 2 ? "【驻扎舰队无法出击】" : "【该舰队无法出击】");
                            return [2];
                        }
                        if (Player.GetFleetShips().Count() == 0) {
                            Logs.Print("【执行失败，队伍不能为空！】");
                            return [2];
                        }
                        busyFleetShips = Player.GetFleetShips().AddRange(_This.QiXiShips).Where(function (c) { return Player.IsYuanZhangShip(c) || Player.IsMissionShip(c) || Player.IsZhuShouShip(c); });
                        if (busyFleetShips.Count() > 0) {
                            Logs.Print("【执行失败，当前舰队部分舰娘无法出征】");
                            return [2];
                        }
                        if ((MissionWorker.CurrentWork.ChallengeID == "9962" || MissionWorker.CurrentWork.ChallengeID == "9963" || MissionWorker.CurrentWork.ChallengeID == "9965" || MissionWorker.CurrentWork.ChallengeID == "9966") && Player.GetFleetShips().Where(function (c) { return List.From(["驱逐", "潜艇", "炮潜", "重炮", "导驱", "补给", "轻母", "重巡", "轻巡", "航巡", "雷巡"]).Contains(DBEnum.ENUM_ShipType[Player.GetShipType(c)]); }).Count() != Player.GetFleetShips().Count()) {
                            Logs.Print("【中小型船只限制】");
                            return [2];
                        }
                        Logs.Print("执行任务-> " + _This.CurrentWork.WorkName, DBEnum.ENUM_NotificationType.任务开始);
                        MissionWorker.State = DBEnum.WorkState.Working;
                        _This.MissionProgressNow = init.MissionProgressNow;
                        _This.MissionProgressTotal = init.MissionProgressTotal;
                        _This.IsRepairing = false;
                        _This.OnStart.ForEach(function (f) { f(); });
                        _This.ThreadSemaphore = 1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 13, , 21]);
                        _This.JinTuErrorNumber = 0;
                        _This.IsayRepairing = false;
                        _This.IsayChanging = false;
                        _This.IsayUnEquip = false;
                        _This.IsFristChange = true;
                        i = _This.MissionProgressNow;
                        _a.label = 2;
                    case 2:
                        if (!(i < _This.MissionProgressTotal)) return [3, 6];
                        return [4, _This.WorkOnce(i)];
                    case 3:
                        workResult = _a.sent();
                        ;
                        if (workResult == false) {
                            return [3, 6];
                        }
                        _This.MissionProgressNow++;
                        _This.OnOneEnd.ForEach(function (f) { f(); });
                        if (!(_This.MissionProgressNow < _This.MissionProgressTotal)) return [3, 5];
                        return [4, Net.NetComm.DealyRandom(Config.MoreSetting.MissionWorkSpeed ? (5000 + Config.PlayerConfig.SkipFightSeconds * 100) : (7000 + Config.PlayerConfig.SkipFightSeconds * 100))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 2];
                    case 6:
                        Logs.Print("任务结束", DBEnum.ENUM_NotificationType.任务结束);
                        if (!_This.IsPveEvent) return [3, 8];
                        return [4, Net.Conditioning.GetPeventTask()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4, Net.Conditioning.GameReset()];
                    case 9:
                        _a.sent();
                        if (!_This.IsPveEvent) return [3, 12];
                        return [4, Net.Conditioning.GuardConfig()];
                    case 10:
                        _a.sent();
                        return [4, Net.Conditioning.GuardGetThreeUserData()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        _This.IsRepairing = false;
                        _This.State = DBEnum.WorkState.Ready;
                        _This.OnTotalEnd.ForEach(function (f) { f(); });
                        _This.LastEndTimeSpan = NetDate.GetTimeSpan();
                        return [3, 21];
                    case 13:
                        ex_1 = _a.sent();
                        if (!(ex_1 == "WorkerAbort")) return [3, 20];
                        _This.ThreadSemaphore = 1;
                        if (!_This.IsPveEvent) return [3, 15];
                        return [4, Net.Conditioning.GetPeventTask()];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [4, Net.Conditioning.GameReset()];
                    case 16:
                        _a.sent();
                        if (!_This.IsPveEvent) return [3, 19];
                        return [4, Net.Conditioning.GuardConfig()];
                    case 17:
                        _a.sent();
                        return [4, Net.Conditioning.GuardGetThreeUserData()];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        _This.MissionProgressNow = 0;
                        _This.MissionProgressTotal = 0;
                        _This.IsRepairing = false;
                        _This.State = DBEnum.WorkState.Ready;
                        _This.OnTotalEnd.ForEach(function (f) { f(); });
                        Logs.Print("停止成功");
                        _a.label = 20;
                    case 20:
                        _This.LastEndTimeSpan = NetDate.GetTimeSpan();
                        return [3, 21];
                    case 21: return [2];
                }
            });
        });
    };
    MissionWorker.WorkOnce = function (WorkIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var isBroken, i, result, ex_2, ErrorCodeNo, logLength, context, stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logs.Print("执行第" + (WorkIndex + 1) + "次任务");
                        isBroken = 0;
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 200000)) return [3, 14];
                        if (isBroken == 1)
                            return [2, false];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 9]);
                        return [4, Net.NetComm.DealyRandom(Config.MoreSetting.MissionWorkSpeed ? 1000 : 2000)];
                    case 3:
                        _a.sent();
                        return [4, MissionWorker.Dowork()];
                    case 4:
                        result = _a.sent();
                        if (result == true) {
                            return [3, 14];
                        }
                        return [3, 9];
                    case 5:
                        ex_2 = _a.sent();
                        if (!(ex_2 == "WorkerAbort")) return [3, 6];
                        isBroken = 1;
                        throw "WorkerAbort";
                    case 6:
                        ErrorCodeNo = new Date().getTime();
                        if (api.systemType.toLowerCase() == "web" || (api.systemType.toLowerCase() == "android" && Config.OpenActions.indexOf("AndroidPostWorkError") >= 0) || (api.systemType.toLowerCase() == "ios" && Config.OpenActions.indexOf("IOSPostWorkError") >= 0)) {
                            logLength = $("#PartialMission .mainLog #LogsInfo p").length;
                            context = List.From($("#PartialMission .mainLog #LogsInfo p:gt(" + Math.max(0, logLength - 5) + ")").toArray()).Select(function (c) { return $(c).html(); }).JoinToString("|");
                            context = Encrypt.Base64Encrypt(context).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                            stack = Encrypt.Base64Encrypt(ex_2.stack).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                            NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/PostClientError", {
                                Tag: "WorkError",
                                CodeNo: ErrorCodeNo,
                                Drive: api.systemType.toLowerCase(),
                                AppVersion: api.appVersion,
                                LoginArea: Config.LoginUser.LoginArea,
                                LoginName: Config.LoginUser.LoginName,
                                ServerName: Config.LoginUser.ServerName,
                                Message: ex_2.message,
                                StackTrace: stack,
                                Context: context
                            });
                        }
                        if (api.systemType.toLowerCase() == "web" || (api.systemType.toLowerCase() == "android" && Config.OpenActions.indexOf("AndroidPrintWorkError") >= 0) || (api.systemType.toLowerCase() == "ios" && Config.OpenActions.indexOf("IOSPrintWorkError") >= 0)) {
                            Logs.Print("异常 - 编号【" + ErrorCodeNo + "】");
                        }
                        ;
                        return [4, Sleep(3000)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3, 9];
                    case 9:
                        if (!(this.JinTuErrorNumber > 10)) return [3, 12];
                        return [4, Sleep(1000)];
                    case 10:
                        _a.sent();
                        return [4, Net.Login.InitUserInfo()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (i == 200000) {
                            Logs.Print("任务执行异常!正在退出...");
                            MissionWorker.Stop();
                            return [2, false];
                        }
                        _a.label = 13;
                    case 13:
                        i++;
                        return [3, 1];
                    case 14: return [2, true];
                }
            });
        });
    };
    MissionWorker.Dowork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _This, relinkResult, currentShip, replaceShip, changeResult, firstChangeResult, ckResult, eqResult, qixiRepairType, fleelShipids, TeamShips, pveLevel, supplyResult, supplyResult, challengeResult, paths, currentPath, isFail, i, nodeNo, thisNode, fightResut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        return [4, Common.CheckTodayInitReflash()];
                    case 1:
                        _a.sent();
                        if (_This.MissionProgressNow > _This.MissionProgressTotal) {
                            _This.Stop();
                            return [2, false];
                        }
                        if (!(_This.NeedRelink == true)) return [3, 7];
                        console.log("relink");
                        return [4, NetErrorRelinker.Relink()];
                    case 2:
                        relinkResult = _a.sent();
                        if (relinkResult == false) {
                            Logs.Print("角色不在线");
                            _This.Stop();
                            return [2, false];
                        }
                        if (!(_This.NeedRelink == true && _This.IsPveEvent)) return [3, 6];
                        return [4, Net.Conditioning.GuardConfig()];
                    case 3:
                        _a.sent();
                        return [4, Net.Conditioning.GuardGetThreeUserData()];
                    case 4:
                        _a.sent();
                        return [4, Net.Conditioning.GetPeventTask()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _This.NeedRelink = false;
                        return [3, 9];
                    case 7: return [4, Net.Conditioning.GameReset()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4, Net.NetComm.DealyRandom(Config.MoreSetting.MissionWorkSpeed ? 2000 : 3000)];
                    case 10:
                        _a.sent();
                        return [4, Common.CheckAward()];
                    case 11:
                        _a.sent();
                        return [4, Common.CheckYuanZheng()];
                    case 12:
                        _a.sent();
                        return [4, AutoJianZao.CheckShipBuildDock()];
                    case 13:
                        _a.sent();
                        return [4, AutoJianZao.CheckAutoJianZao()];
                    case 14:
                        _a.sent();
                        return [4, AutoKaiFa.CheckEquipBuildDock()];
                    case 15:
                        _a.sent();
                        return [4, AutoKaiFa.CheckAutoKaiFa()];
                    case 16:
                        _a.sent();
                        return [4, Common.CheckShipAreaFree()];
                    case 17:
                        _a.sent();
                        if (Player.UserShipVo.Count() >= Player.User.shipnumtop) {
                            Logs.Print("船位已满，请手动清理!");
                            _This.Stop();
                            return [2, false];
                        }
                        return [4, MainTimer.CheckRepairDock()];
                    case 18:
                        _a.sent();
                        if (!(_This.CurrentWork.CustiomPVEID == "99")) return [3, 24];
                        return [4, Player.GetFleetShips().ForEachAsync(function (c, i) { return __awaiter(_this, void 0, void 0, function () {
                                var changeResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(i > 0)) return [3, 2];
                                            return [4, Net.Conditioning.RemoveBoat(Config.CurrentFleetID, 1)];
                                        case 1:
                                            changeResult = _a.sent();
                                            if (changeResult.ErrorCode == 0) {
                                                Logs.Print("\u9ED1\u94A2 - \u79FB\u9664" + Player.GetShipName(c));
                                            }
                                            else {
                                                Logs.Print("\u9ED1\u94A2 - \u79FB\u9664\u5931\u8D25");
                                                return [2, false];
                                            }
                                            _a.label = 2;
                                        case 2: return [2];
                                    }
                                });
                            }); })];
                    case 19:
                        _a.sent();
                        currentShip = Player.GetFleetShips()[0];
                        if (!((currentShip.battlepropsmax.hp / currentShip.battleprops.hp) > 4 || (currentShip.battleprops.oil == 0 || (currentShip.battlepropsmax.oil / currentShip.battleprops.oil) > 5 || currentShip.battleprops.ammo == 0 || (currentShip.battlepropsmax.ammo / currentShip.battleprops.ammo) > 5))) return [3, 23];
                        replaceShip = Player.UserShipVo.FirstOrDefault(function (c) { return Player.IsBusyShip(c) == false && c.islocked == 0 && c.level == 1 && Player.GetShipType(c) == DBEnum.ENUM_ShipType.驱逐 && c.battlepropsmax.hp == c.battleprops.hp && c.battleprops.oil == c.battlepropsmax.oil; });
                        if (!(replaceShip == null)) return [3, 20];
                        Logs.Print("\u9ED1\u94A2 - \u65E0\u53EF\u66FF\u6362\u7684\u9A71\u9010");
                        _This.Stop();
                        return [2, false];
                    case 20: return [4, Net.Conditioning.ChangeBoat(Config.CurrentFleetID, 0, replaceShip.id)];
                    case 21:
                        changeResult = _a.sent();
                        _a.label = 22;
                    case 22:
                        Logs.Print("\u9ED1\u94A2 - \u66FF\u6362\u4E3A" + Player.GetShipName(replaceShip));
                        _a.label = 23;
                    case 23: return [3, 38];
                    case 24: return [4, AutoBath.CheckAutoInDock()];
                    case 25:
                        _a.sent();
                        if (!(_This.IsFristChange == true)) return [3, 29];
                        return [4, Common.CheckAutoChangeShipFirst(_This.CurrentWork)];
                    case 26:
                        firstChangeResult = _a.sent();
                        if (!(firstChangeResult == false)) return [3, 28];
                        if (_This.IsayChanging == false) {
                            _This.IsayChanging = true;
                            Logs.Print("指定的舰船不能出击，请检查船坞.");
                        }
                        return [4, Net.NetComm.DealyRandom(15000)];
                    case 27:
                        _a.sent();
                        return [2, false];
                    case 28:
                        _This.IsayChanging = false;
                        _a.label = 29;
                    case 29:
                        _This.IsFristChange = false;
                        return [4, Common.CheckShipsRepair_New(Player.GetFleetShips(), _This.RepairTypes)];
                    case 30:
                        _a.sent();
                        return [4, Common.CheckAutoChangeShipNew(_This.CurrentWork)];
                    case 31:
                        ckResult = _a.sent();
                        if (!(ckResult == false)) return [3, 33];
                        if (_This.IsayChanging == false) {
                            _This.IsayChanging = true;
                            Logs.Print("没有能正常出击的组合，正在等待修理...");
                        }
                        return [4, Net.NetComm.DealyRandom(15000)];
                    case 32:
                        _a.sent();
                        return [2, false];
                    case 33:
                        _This.IsayChanging = false;
                        return [4, Common.CheckAutoChangeEquip(_This.CurrentWork)];
                    case 34:
                        eqResult = _a.sent();
                        if (!(eqResult == false)) return [3, 36];
                        if (_This.IsayUnEquip == false) {
                            _This.IsayUnEquip = true;
                            Logs.Print("当前没有可用的装备，正在等待...");
                        }
                        return [4, Net.NetComm.DealyRandom(15000)];
                    case 35:
                        _a.sent();
                        return [2, false];
                    case 36:
                        _This.IsayUnEquip = false;
                        if (!(_This.IsPveEvent && _This.QiXiShips.Count() > 0)) return [3, 38];
                        qixiRepairType = NJson.Parse(SysLocalStorage.Get("QiXiRepairTypes"))[["9962", "9963", "9964", "9965", "9966", "9967"].indexOf(MissionWorker.CurrentWork.ChallengeID)];
                        return [4, Common.CheckShipsRepair_New(_This.QiXiShips, List.From([qixiRepairType, qixiRepairType, qixiRepairType, qixiRepairType, qixiRepairType, qixiRepairType]))];
                    case 37:
                        _a.sent();
                        _a.label = 38;
                    case 38:
                        fleelShipids = Player.GetFleetShips().Select(function (c) { return c.id; });
                        if (_This.IsPveEvent) {
                            fleelShipids.AddRange(_This.QiXiShips.Select(function (c) { return c.id; }));
                        }
                        if (!(AutoBath.RepairShips.Where(function (c) { return fleelShipids.Contains(c.ShipID); }).Count() > 0)) return [3, 41];
                        return [4, AutoBath.CheckAutoInDock()];
                    case 39:
                        _a.sent();
                        if (_This.IsayRepairing == false) {
                            _This.IsayRepairing = true;
                            Logs.Print("部分舰娘排队修理中，正在等待...");
                        }
                        return [4, Net.NetComm.DealyRandom(15000)];
                    case 40:
                        _a.sent();
                        return [2, false];
                    case 41:
                        _This.IsayRepairing = false;
                        if (Player.GetFleetShips().Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4 || isNaN(c.battlepropsmax.hp * 1 / c.battleprops.hp) == true; }).Count() > 0) {
                            Logs.Print("大破无法出击!");
                            _This.Stop();
                            return [2, false];
                        }
                        if (_This.IsPveEvent && _This.QiXiShips.Count() > 0 && _This.QiXiShips.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4 || isNaN(c.battlepropsmax.hp * 1 / c.battleprops.hp) == true; }).Count() > 0) {
                            Logs.Print("奇袭舰队大破无法出击!");
                            _This.Stop();
                            return [2, false];
                        }
                        if (!(_This.CurrentWork.CustiomPVEID != "99")) return [3, 45];
                        TeamShips = Player.GetFleetShips();
                        if (_This.IsPveEvent) {
                            if (_This.PVEEvent == null) {
                                Logs.Print("未能获取到编号，请检查是否已经打到该地图，或重启再试。");
                                _This.Stop();
                                return [2, false];
                            }
                            TeamShips = TeamShips.AddRange(_This.QiXiShips);
                            if (TeamShips.Select(function (c) { return c.id; }).Distinct().Count() != TeamShips.Count()) {
                                Logs.Print("奇袭舰队与出击舰队部分舰船相同");
                                _This.Stop();
                                return [2, false];
                            }
                        }
                        if (TeamShips.Sum(function (c) { return c.battlepropsmax.oil - c.battleprops.oil; }) > Player.User.oil || TeamShips.Sum(function (c) { return c.battlepropsmax.ammo - c.battleprops.ammo; }) > Player.User.ammo || TeamShips.Sum(function (c) { return c.battlepropsmax.aluminium - c.battleprops.aluminium; }) > Player.User.aluminium) {
                            Logs.Print("资源不足!");
                            _This.Stop();
                            return [2, false];
                        }
                        pveLevel = Player.PveLevel.FirstOrDefault(function (c) { return c.pvelevelid == _This.CurrentWork.ChallengeID; });
                        if (!(pveLevel != null && pveLevel.support_status == "1")) return [3, 43];
                        return [4, Net.Conditioning.SupplyBoats(TeamShips.Select(function (c) { return c.id; }), pveLevel.pvelevelid)];
                    case 42:
                        supplyResult = _a.sent();
                        if (supplyResult.ErrorCode != 0) {
                            Logs.Print(supplyResult.ErrorMessage);
                            return [2, false];
                        }
                        return [3, 45];
                    case 43:
                        if (!((_This.QiXiShips.Count() > 0 && List.From(["9962", "9965"]).Contains(_This.CurrentWork.ChallengeID)) || TeamShips.Where(function (c) { return c.battleprops.oil < c.battlepropsmax.oil || c.battleprops.ammo < c.battlepropsmax.ammo || c.battleprops.aluminium < c.battlepropsmax.aluminium; }).Count() > 0)) return [3, 45];
                        Logs.Print("补给");
                        return [4, Net.Conditioning.SupplyBoats(TeamShips.Select(function (c) { return c.id; }), (pveLevel != null && pveLevel.support_status == "1") ? pveLevel.pvelevelid : "0")];
                    case 44:
                        supplyResult = _a.sent();
                        if (supplyResult.ErrorCode != 0) {
                            Logs.Print(supplyResult.ErrorMessage);
                            return [2, false];
                        }
                        _a.label = 45;
                    case 45:
                        if (Config.MoreSetting.StopOnDayGetShipLimit == true && MissionWorker.IsStopOnDayGetShipLimit == true) {
                            Logs.Print("今日捞船已满，禁止出击");
                            _This.Stop();
                            return [2, false];
                        }
                        if (Config.MoreSetting.StopOnLowQuickRepair == true && Player.PackageVo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).FirstOrNew()["num"] <= Config.MoreSetting.StopOnLowQuickRepairNumber) {
                            Logs.Print("快修已达到设定上限");
                            _This.Stop();
                            return [2, false];
                        }
                        if (Config.MoreSetting.StopOnMaxLevel == true && Player.GetFleetShips(Config.CurrentFleetID).Where(function (c) { return c.level == 110; }).Count() > 0) {
                            Logs.Print("当前舰队舰娘已满级");
                            _This.Stop();
                            return [2, false];
                        }
                        if (Config.MoreSetting.StopOnMaxLevel == true && _This.QiXiShips.Where(function (c) { return c.level == 110; }).Count() > 0) {
                            Logs.Print("奇袭舰队舰娘已满级");
                            _This.Stop();
                            return [2, false];
                        }
                        if (!(Config.MoreSetting.AutoLiaoLi == true && Player.TodayEat == false)) return [3, 47];
                        return [4, _This.EatLiaoLi()];
                    case 46:
                        _a.sent();
                        _a.label = 47;
                    case 47:
                        Logs.Print("进图");
                        return [4, Net.Fight.Cha11enge(_This.CurrentWork.ChallengeID)];
                    case 48:
                        challengeResult = _a.sent();
                        if (challengeResult.ErrorCode != 0) {
                            _This.JinTuErrorNumber++;
                            Logs.Print("进图失败！" + challengeResult.ErrorMessage);
                            if (challengeResult.ErrorMessage == "正在修理，不能出征" || challengeResult.ErrorMessage == "网络异常") {
                                _This.NeedRelink = true;
                            }
                            return [2, false];
                        }
                        _This.JinTuErrorNumber = 0;
                        paths = _This.CurrentWork.Paths.Select(function (c) { return { Path: c, Str: c.Nodes.Select(function (d) { return d.NodeNo; }).JoinToString(",") }; });
                        currentPath = new List();
                        isFail = false;
                        i = 0;
                        _a.label = 49;
                    case 49:
                        if (!(i < 10)) return [3, 54];
                        return [4, _This.WayFinding()];
                    case 50:
                        nodeNo = _a.sent();
                        if (nodeNo == null) {
                            Logs.Print("寻路失败！....SL（可能是加速过快或勾了任务提速）");
                            isFail = true;
                            return [3, 54];
                        }
                        Logs.Print("判定-> " + _This.GetNodeName(nodeNo));
                        currentPath.Add(nodeNo);
                        if (paths.Where(function (c) { return c.Str.indexOf(currentPath.JoinToString(",")) == 0; }).Count() == 0) {
                            Logs.Print("错误点" + _This.GetNodeName(nodeNo) + "....SL");
                            isFail = true;
                            return [3, 54];
                        }
                        thisNode = paths.FirstOrDefault(function (c) { return c.Str.indexOf(currentPath.JoinToString(",")) == 0; }).Path.Nodes.FirstOrDefault(function (c) { return c.NodeNo == nodeNo; });
                        _This.LastActionNode = thisNode;
                        _This.PathNodeIn.ForEach(function (f) { f(thisNode); });
                        return [4, _This.NodeFight(thisNode, paths.FirstOrDefault(function (c) { return c.Str == currentPath.JoinToString(","); }) != null && paths.FirstOrDefault(function (c) { return c.Str == currentPath.JoinToString(","); }).Path.Nodes.FirstOrDefault(function (c) { return c.NodeNo == nodeNo; }) != null)];
                    case 51:
                        fightResut = _a.sent();
                        _This.PathNodeOut.ForEach(function (f) { f(thisNode); });
                        if (fightResut == false) {
                            isFail = true;
                            return [3, 54];
                        }
                        if (paths.Where(function (c) { return c.Str == currentPath.JoinToString(","); }).Count() > 0) {
                            Logs.Print("--------作战结束----------");
                            return [3, 54];
                        }
                        return [4, Net.NetComm.DealyRandom(Config.MoreSetting.MissionWorkSpeed ? (2000 + i * 500) : (4000 + i * 500))];
                    case 52:
                        _a.sent();
                        _a.label = 53;
                    case 53:
                        i++;
                        return [3, 49];
                    case 54: return [2, !isFail];
                }
            });
        });
    };
    MissionWorker.GetNodeName = function (NodeNo) {
        var nodeNo = NodeNo.ToNumber();
        var names = ["-", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        return names[nodeNo - 1];
    };
    MissionWorker.WayFinding = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pathResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Net.Fight.NewNext()];
                    case 1:
                        pathResult = _a.sent();
                        if (pathResult.ErrorCode != 0) {
                            return [2, null];
                        }
                        else {
                            return [2, pathResult.node.toString().substring(MissionWorker.CurrentWork.ChallengeID.length)];
                        }
                        return [2];
                }
            });
        });
    };
    MissionWorker.NodeFight = function (node, isLastNode) {
        return __awaiter(this, void 0, void 0, function () {
            var _This, fightResult, teamShips, damageShips, DealtResult, SkipResult, fightResult, teamShips, damageShips, DealtResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        if (!(node.Action == 0)) return [3, 3];
                        return [4, Net.NetComm.DealyRandom(Config.MoreSetting.MissionWorkSpeed ? (Config.PlayerConfig.SkipFightSeconds * 50) : (Config.PlayerConfig.SkipFightSeconds * 100))];
                    case 1:
                        _a.sent();
                        if (Player.GetFleetShips().Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4 || isNaN(c.battlepropsmax.hp * 1 / c.battleprops.hp); }).Count() > 0) {
                            Logs.Print("大破回港");
                            return [2, false];
                        }
                        return [4, _This.Fight(node)];
                    case 2:
                        fightResult = _a.sent();
                        teamShips = Player.GetFleetShips();
                        damageShips = teamShips.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4 || isNaN(c.battlepropsmax.hp * 1 / c.battleprops.hp); });
                        if (fightResult == true && isLastNode == true && damageShips.Count() > 0) {
                            return [2, true];
                        }
                        if (damageShips.Count() > 0) {
                            return [2, false];
                        }
                        return [2, fightResult];
                    case 3:
                        if (!(node.Action == 1)) return [3, 6];
                        return [4, Net.NetComm.DealyRandom(4000 + Config.PlayerConfig.SkipFightSeconds * 50)];
                    case 4:
                        _a.sent();
                        Logs.Print("进入资源点...");
                        return [4, Net.Fight.Dealto(_This.CurrentWork.ChallengeID + node.NodeNo, 1)];
                    case 5:
                        DealtResult = _a.sent();
                        return [2, true];
                    case 6:
                        if (!(node.Action == 2 || node.Action == 3)) return [3, 12];
                        return [4, Net.Fight.SkipWar()];
                    case 7:
                        SkipResult = _a.sent();
                        if (SkipResult.ErrorCode != 0) {
                            Logs.Print("迂回有误..." + SkipResult.ErrorMessage);
                            return [2, false];
                        }
                        if (!(SkipResult.issuccess == 1)) return [3, 8];
                        Logs.Print("迂回成功");
                        return [2, true];
                    case 8:
                        Logs.Print("迂回失败");
                        if (!(node.Action == 2)) return [3, 11];
                        if (Player.GetFleetShips().Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4 || isNaN(c.battlepropsmax.hp * 1 / c.battleprops.hp); }).Count() > 0) {
                            Logs.Print("大破回港");
                            return [2, false];
                        }
                        return [4, Net.NetComm.DealyRandom(Config.PlayerConfig.SkipFightSeconds * 50)];
                    case 9:
                        _a.sent();
                        return [4, _This.Fight(node)];
                    case 10:
                        fightResult = _a.sent();
                        teamShips = Player.GetFleetShips();
                        damageShips = teamShips.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4 || isNaN(c.battlepropsmax.hp * 1 / c.battleprops.hp); });
                        if (fightResult == true && isLastNode == true && damageShips.Count() > 0) {
                            return [2, true];
                        }
                        if (damageShips.Count() > 0) {
                            return [2, false];
                        }
                        return [2, fightResult];
                    case 11: return [2, false];
                    case 12:
                        if (!(node.Action == 4)) return [3, 14];
                        Logs.Print("待机点...");
                        return [4, Net.Fight.Dealto(_This.CurrentWork.ChallengeID + node.NodeNo, 1)];
                    case 13:
                        DealtResult = _a.sent();
                        return [2, true];
                    case 14: return [2, false];
                }
            });
        });
    };
    MissionWorker.Fight = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _This, SpyResult, JPTitle, qianTingCount, buGeiCount, DealtResult, mustNightNodes, isFightNight, TotalWarDealyTime, DealtoAnimateDealy, NightAnimateDealy, GetWarResult, resultlevel, mvpIndex, resultLevelText, selfShips;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        Logs.Print("进入战斗流程");
                        return [4, Net.NetComm.DealyRandom(Config.MoreSetting.MissionWorkSpeed ? 800 : 1600)];
                    case 1:
                        _a.sent();
                        Logs.Print("索敌...");
                        return [4, Net.Fight.Spy()];
                    case 2:
                        SpyResult = _a.sent();
                        if (SpyResult == null || SpyResult.enemyvo == null || SpyResult.enemyvo.enemyships == null || SpyResult.enemyvo.enemyships.Count() == 0) {
                            Logs.Print("索敌失败！");
                            return [2, false];
                        }
                        JPTitle = function (title) {
                            if (Config.LoginUser.LoginArea != "JP") {
                                return title.replace("补给", "运输");
                            }
                            else {
                                return title.replace("运输", "給油艦").replace("航母", "空母").replace("轻母", "軽母").replace("装母", "装母").replace("战列", "戦艦").replace("航战", "航戦").replace("战巡", "巡戦").replace("重巡", "重巡").replace("航巡", "航巡").replace("雷巡", "雷巡").replace("轻巡", "軽巡").replace("重炮", "砲艦").replace("驱逐", "駆逐").replace("潜母", "潜母").replace("潜艇", "潜水").replace("炮潜", "砲潜").replace("补给", "給油").replace("导驱", "導駆").replace("防驱", "防駆");
                            }
                        };
                        if (node.SLFilter != null && node.SLFilter.Count() > 0) {
                            if (SpyResult.enemyvo.enemyships.Where(function (c) { return node.SLFilter.Where(function (d) { return c.title.indexOf(JPTitle(d)) >= 0; }).Count() > 0; }).Count() > 0) {
                                Logs.Print("..不打" + node.SLFilter.JoinToString(",") + "...");
                                return [2, false];
                            }
                        }
                        if (node.OnlyFight != null && node.OnlyFight.Count() > 0) {
                            if (SpyResult.enemyvo.enemyships.Where(function (c) { return node.OnlyFight.Where(function (d) { return c.title.indexOf(JPTitle(d)) >= 0; }).Count() > 0; }).Count() == 0) {
                                Logs.Print("..只打" + node.OnlyFight.JoinToString(",") + "...");
                                return [2, false];
                            }
                        }
                        if (SpyResult != null && SpyResult.enemyvo != null) {
                            _This.OnSpyEnemy.ForEach(function (f) { f(SpyResult.enemyvo, node); });
                        }
                        Logs.Print("进入战斗画面");
                        qianTingCount = SpyResult.enemyvo.enemyships.Where(function (c) { return c.title.indexOf(JPTitle("潜艇")) >= 0; }).Count();
                        buGeiCount = SpyResult.enemyvo.enemyships.Where(function (c) { return c.title.indexOf(JPTitle("运输")) >= 0; }).Count();
                        return [4, Net.NetComm.DealyRandom(Config.MoreSetting.MissionWorkSpeed ? Math.min(1000, Config.PlayerConfig.SkipFightSeconds * 50) : (Math.min(1000, Config.PlayerConfig.SkipFightSeconds * 50) + 2000))];
                    case 3:
                        _a.sent();
                        return [4, Net.Fight.Dealto(_This.CurrentWork.ChallengeID + node.NodeNo, Player.GetFleetShips().Count() <= 3 ? 1 : ((Config.MoreSetting.QianTingDanHeng == true && qianTingCount > 0) ? 5 : node.Formation))];
                    case 4:
                        DealtResult = _a.sent();
                        if (DealtResult.ErrorCode != 0) {
                            Logs.Print("出击失败x0 " + DealtResult.ErrorMessage + "（可能是加速过快）");
                            if (Config.PlayerConfig.SkipFight == true && Config.PlayerConfig.SkipFightSeconds <= 5) {
                                Config.PlayerConfig.SkipFightSeconds = 15;
                                Logs.Print("检测到加速过快导致异常，自动切换为中.");
                            }
                            if (DealtResult.ErrorMessage == "网络异常") {
                                _This.NeedRelink = true;
                            }
                            return [2, false];
                        }
                        mustNightNodes = List.From(["70513"]);
                        if (_This.IsPveEvent && _This.PVEEvent && _This.QiXiShips.Count() > 0) {
                            mustNightNodes.AddRange(List.From(["996202", "996315", "996316", "996317", "996407", "996418", "996502", "996615", "996616", "996617", "996707", "996718"]));
                        }
                        node.FightNight = mustNightNodes.Contains(_This.CurrentWork.ChallengeID + "" + node.NodeNo) ? 1 : node.FightNight;
                        isFightNight = node.FightNight == 1 && DealtResult.warreport.candonightwar == 1;
                        TotalWarDealyTime = Config.PlayerConfig.SkipFight == true ? (Config.PlayerConfig.SkipFightSeconds * (isFightNight == true ? 1000 : 500)) : 50000;
                        if (!isFightNight) return [3, 7];
                        DealtoAnimateDealy = Math.floor(TotalWarDealyTime * 2 / 3);
                        NightAnimateDealy = Math.floor(TotalWarDealyTime * 1 / 3);
                        return [4, Net.NetComm.DealyRandom(DealtoAnimateDealy)];
                    case 5:
                        _a.sent();
                        _This.OnDealtoEnemy.ForEach(function (f) { f(DealtResult); });
                        return [4, Net.NetComm.DealyRandom(NightAnimateDealy)];
                    case 6:
                        _a.sent();
                        return [3, 9];
                    case 7: return [4, Net.NetComm.DealyRandom(TotalWarDealyTime)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4, Net.Fight.GetWarResult(isFightNight)];
                    case 10:
                        GetWarResult = _a.sent();
                        if (!(GetWarResult.ErrorCode != 0)) return [3, 13];
                        Logs.Print("出击失败x1 " + GetWarResult.ErrorMessage + "（可能是加速过快）");
                        if (!(GetWarResult.ErrorCode == -89)) return [3, 12];
                        console.log("initUserInfo");
                        return [4, Net.Login.InitUserInfo()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (Config.PlayerConfig.SkipFight == true && Config.PlayerConfig.SkipFightSeconds <= 5) {
                            Config.PlayerConfig.SkipFightSeconds = 15;
                            Logs.Print("检测到加速过快导致异常，自动切换为中.");
                        }
                        return [2, false];
                    case 13:
                        _This.OnWarEndEnemy.ForEach(function (f) { f(GetWarResult); });
                        if (!(GetWarResult.ErrorCode == 0)) return [3, 16];
                        resultlevel = GetWarResult.warresult.resultlevel;
                        if (_This.CurrentWork.ChallengeID != "105" && (resultlevel == 1 || resultlevel == 2) && (NetDate.GetTimeSpan() - DateTime.ParseTime(NetDate.GetTimeSpan()).Date.GetTimeSpan()) > (1000 * 60) && _This.IsStopOnDayGetShipLimit == false && (GetWarResult.newshipvo == undefined || GetWarResult.newshipvo == null || GetWarResult.newshipvo.Count() == 0)) {
                            Logs.Print("今日打捞已达上限");
                            _This.IsStopOnDayGetShipLimit = true;
                        }
                        mvpIndex = GetWarResult.warresult.selfshipresults.Where(function (c) { return c.ismvp == 1; }).Count() == 0 ? 0 : GetWarResult.warresult.selfshipresults.IndexOf(GetWarResult.warresult.selfshipresults.FirstOrDefault(function (c) { return c.ismvp == 1; }));
                        resultLevelText = (resultlevel == 0 ? "-" : (resultlevel == 1 ? "SS" : (resultlevel == 2 ? "S" : (resultlevel == 3 ? "A" : (resultlevel == 4 ? "B" : (resultlevel == 5 ? "C" : (resultlevel == 6 ? "D" : "未知")))))));
                        selfShips = Player.GetFleetShips();
                        if (MissionWorker.IsPveEvent && _This.PVEEvent && _This.QiXiShips.Count() > 0 && List.From(["996202", "996315", "996317", "996418", "996502", "996615", "996617", "996718"]).Contains(_This.CurrentWork.ChallengeID + "" + node.NodeNo)) {
                            selfShips = _This.QiXiShips;
                        }
                        Logs.Print("战斗结束 " + resultLevelText + " MVP." + Player.GetShipName(selfShips[mvpIndex]));
                        if (buGeiCount > 0 && resultlevel > 0 && resultlevel <= 4) {
                            Player.Spoils++;
                            Config.PlayerStatistics.DayGetSpoilsCount++;
                            Logs.Print("捞到战利品 " + Player.Spoils);
                        }
                        if (!(GetWarResult.newshipvo != null)) return [3, 15];
                        return [4, GetWarResult.newshipvo.ForEachAsync(function (newship) { return __awaiter(_this, void 0, void 0, function () {
                                var lockCIDS, IsNewShipStop, newLogShipSource;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            Config.PlayerStatistics.DayGetShipCount++;
                                            lockCIDS = Config.PlayerConfig.ForcelockCIDS;
                                            IsNewShipStop = false;
                                            if ((Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0 && Config.MoreSetting.StopOnGetNewShip) || (lockCIDS.Contains(newship.shipcid) && Config.MoreSetting.StopOnGetForceShip == true)) {
                                                IsNewShipStop = true;
                                            }
                                            newLogShipSource = _This.CurrentWork.ChallengeID + "|" + _This.GetNodeName(node.NodeNo) + "|" + newship.shipcid + "|" + NetDate.GetTimeSpan() + "|" + resultLevelText + "|" + (Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0 || lockCIDS.Contains(newship.shipcid) ? 1 : 0);
                                            Config.PVEShipSources += Config.PVEShipSources == "" ? (newLogShipSource) : ("," + newLogShipSource);
                                            SysLocalStorage.Set("PVEShipSources_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName, Config.PVEShipSources);
                                            if (!lockCIDS.Contains(newship.shipcid)) return [3, 4];
                                            if (!Config.PlayerConfig.AutoLockShip) return [3, 2];
                                            Logs.Print("强制锁船！ " + Player.GetShipName(newship) + " 加锁", DBEnum.ENUM_NotificationType.捞到指定船);
                                            return [4, Net.Dock.LockBoat(newship.id)];
                                        case 1:
                                            _a.sent();
                                            return [3, 3];
                                        case 2:
                                            Logs.Print("捞到强制锁船！ " + Player.GetShipName(newship) + " 不加锁", DBEnum.ENUM_NotificationType.捞到指定船);
                                            _a.label = 3;
                                        case 3: return [3, 9];
                                        case 4:
                                            if (!(Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0)) return [3, 8];
                                            if (!Config.PlayerConfig.AutoLockShip) return [3, 6];
                                            Logs.Print("捞到新船！ " + Player.GetShipName(newship) + " 加锁", DBEnum.ENUM_NotificationType.捞到新船);
                                            return [4, Net.Dock.LockBoat(newship.id)];
                                        case 5:
                                            _a.sent();
                                            return [3, 7];
                                        case 6:
                                            Logs.Print("捞到新船！ " + Player.GetShipName(newship) + " 不加锁", DBEnum.ENUM_NotificationType.捞到新船);
                                            _a.label = 7;
                                        case 7: return [3, 9];
                                        case 8:
                                            Logs.Print("获得 " + Player.GetShipName(newship), DBEnum.ENUM_NotificationType.任务出船);
                                            _a.label = 9;
                                        case 9:
                                            if (Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0) {
                                                Player.UnLockShip.Add(newship.shipcid);
                                            }
                                            if (IsNewShipStop == true) {
                                                MissionWorker.Stop();
                                            }
                                            return [2];
                                    }
                                });
                            }); })];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [2, true];
                    case 16:
                        Logs.Print(GetWarResult.ErrorMessage);
                        return [2, false];
                }
            });
        });
    };
    MissionWorker.EatLiaoLi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _This, getInfoResult, foodcid, CanCook_1, CanSetShief_1, CanCookShip, readyShips, chiefShip, changeChiefResult, setCookResult, eatResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        Player.TodayEat = true;
                        return [4, Net.Live.GetUserInfo()];
                    case 1:
                        getInfoResult = _a.sent();
                        if (!(getInfoResult.ErrorCode == 0)) return [3, 6];
                        if (!(getInfoResult.eattimes == 0)) return [3, 6];
                        foodcid = "10000472";
                        CanCook_1 = function (shipid) {
                            var ship = Player.UserShipVo.FirstOrDefault(function (c) { return c.id == shipid; });
                            var ini = Player.GetIniShip(ship);
                            var food = Config.Cookbooks.FirstOrDefault(function (c) { return c.CID == foodcid; });
                            if (ini == null || (food.Country != 99 && ini.Country != food.Country) || ship == null || ship.cookbook == undefined || ship.cookbook == null || ship.cookbook.Length == undefined || ship.cookbook[0] != foodcid) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        };
                        CanSetShief_1 = function (shipid) {
                            var ship = Player.UserShipVo.FirstOrDefault(function (c) { return c.id == shipid; });
                            var ini = Player.GetIniShip(ship);
                            var food = Config.Cookbooks.FirstOrDefault(function (c) { return c.CID == foodcid; });
                            if (ini == null || (food.Country != 99 && ini.Country != food.Country) || ship == null || ship.cookbook == undefined || ship.cookbook == null || ship.cookbook.Length == undefined) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        };
                        CanCookShip = function (ship) {
                            return CanCook_1((ship == null || ship == undefined) ? -1 : ship.id);
                        };
                        readyShips = Player.UserShipVo.Where(function (c) { return c.islocked == 1 && Player.GetIniShip(c) != null; });
                        chiefShip = readyShips.FirstOrDefault(function (c) { return c.id.toString() == getInfoResult.chief; });
                        if (!(CanCookShip(chiefShip) == false)) return [3, 4];
                        chiefShip = null;
                        if (getInfoResult.cookbookproficiency && getInfoResult.cookbookproficiency.Where(function (c) { return c.cid == foodcid; }).Count() > 0) {
                            chiefShip = readyShips.Where(function (c) { return c.id.toString() == getInfoResult.cookbookproficiency.Where(function (c) { return c.cid == foodcid; }).OrderByDescending(function (c) { return c.cid; }).FirstOrDefault().boat_id.toString(); }).FirstOrDefault();
                        }
                        chiefShip = chiefShip == null ? readyShips.Where(function (c) { return CanSetShief_1(c.id); }).OrderByDescending(function (c) { return c.level; }).FirstOrDefault() : chiefShip;
                        if (chiefShip == null) {
                            Logs.Print("没有能做该料理的厨师");
                            return [2];
                        }
                        console.log("chiefShip2", chiefShip);
                        return [4, Net.Live.SetChief(chiefShip.id)];
                    case 2:
                        changeChiefResult = _a.sent();
                        if (changeChiefResult.ErrorCode != 0 || changeChiefResult.status != 1) {
                            Logs.Print("设置厨师失败");
                            return [2];
                        }
                        getInfoResult.chief = chiefShip.id.toString();
                        if (!(CanCook_1(chiefShip.id) == false)) return [3, 4];
                        return [4, Net.Live.SetCookbook(chiefShip.id, foodcid)];
                    case 3:
                        setCookResult = _a.sent();
                        console.log(["SetCookbook", setCookResult]);
                        if (setCookResult.ErrorCode != 0) {
                            Logs.Print("设置料理失败");
                            return [2];
                        }
                        _a.label = 4;
                    case 4: return [4, Net.Live.Eat(foodcid)];
                    case 5:
                        eatResult = _a.sent();
                        console.log(eatResult);
                        if (eatResult.ErrorCode == 0) {
                            getInfoResult.eattimes++;
                            Logs.Print("料理成功 截止到 " + DateTime.ParseTime(eatResult.buff.endtime).ToString("HH:mm:ss").ReplaceAll("/", "-"));
                        }
                        else {
                            Logs.Print("料理失败 - " + eatResult.ErrorMessage);
                        }
                        _a.label = 6;
                    case 6: return [4, Sleep(3000)];
                    case 7:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MissionWorker.CheckThreadSemaphore = function () {
        if (this.ThreadSemaphore == 0 && this.State == DBEnum.WorkState.Working) {
            throw "WorkerAbort";
        }
    };
    MissionWorker.Stop = function () {
        var _This = this;
        _This.OnStoped.ForEach(function (f) { f(); });
        Logs.Print("正在停止任务...");
        _This.ThreadSemaphore = 0;
    };
    MissionWorker.InitWorks = function () {
        this.Works = new List();
        this.Works.Add({
            CustiomPVEID: "1",
            WorkName: "【打一次1-1】",
            Remark: "",
            RepairLevel: DBEnum.RepairLevel.修大中破,
            ChallengeID: "101",
            Paths: List.From([{
                    Nodes: List.From([{
                            NodeNo: "02", Name: "A", Formation: DBEnum.Formation.复纵阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }])
                }])
        });
        this.Works.Add({
            CustiomPVEID: "2",
            WorkName: "【偷铝.4-3】",
            Remark: "建议使用2技能的俾斯麦",
            RepairLevel: DBEnum.RepairLevel.修大中破,
            ChallengeID: "403",
            Paths: List.From([{
                    Nodes: List.From([{
                            NodeNo: "03", Name: "B", Formation: DBEnum.Formation.单纵阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }, {
                            NodeNo: "05", Name: "D", Formation: DBEnum.Formation.单纵阵, Action: DBEnum.WorkNodeAction.资源点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }])
                }])
        });
        this.Works.Add({
            CustiomPVEID: "3",
            WorkName: "【偷弹.3-1】",
            Remark: "全高速",
            RepairLevel: DBEnum.RepairLevel.修大中破,
            ChallengeID: "301",
            Paths: List.From([{
                    Nodes: List.From([{
                            NodeNo: "02", Name: "A", Formation: DBEnum.Formation.单纵阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }, {
                            NodeNo: "04", Name: "C", Formation: DBEnum.Formation.单纵阵, Action: DBEnum.WorkNodeAction.资源点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }])
                }])
        });
        this.Works.Add({
            CustiomPVEID: "12",
            WorkName: "【2-1.捞胖次】",
            Remark: "4船捞，无胖次SL",
            RepairLevel: DBEnum.RepairLevel.修大中破,
            ChallengeID: "201",
            Paths: List.From([{
                    Nodes: List.From([{
                            NodeNo: "03", Name: "B", Formation: DBEnum.Formation.单纵阵, Action: DBEnum.WorkNodeAction.待机点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }, {
                            NodeNo: "05", Name: "D", Formation: DBEnum.Formation.单纵阵, Action: DBEnum.WorkNodeAction.待机点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }, {
                            NodeNo: "07", Name: "F", Formation: DBEnum.Formation.复纵阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 0, OnlyFight: List.From(["运输"]), SLFilter: new List()
                        }])
                }])
        });
        this.Works.Add({
            CustiomPVEID: "21",
            WorkName: "【6-1.打A点】",
            Remark: "必须有低速，其他配置请使用自定义",
            RepairLevel: DBEnum.RepairLevel.修大中破,
            ChallengeID: "601",
            Paths: List.From([{
                    Nodes: List.From([{
                            NodeNo: "02", Name: "A", Formation: DBEnum.Formation.单横阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 0, OnlyFight: new List(), SLFilter: new List()
                        }])
                }])
        });
        this.Works.Add({
            CustiomPVEID: "22",
            WorkName: "【6-1.只打5潜艇】",
            Remark: "必须有低速，其他配置请使用自定义",
            RepairLevel: DBEnum.RepairLevel.修大中破,
            ChallengeID: "601",
            Paths: List.From([{
                    Nodes: List.From([{
                            NodeNo: "02", Name: "A", Formation: DBEnum.Formation.单横阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 0, OnlyFight: new List(), SLFilter: List.From(["雷巡", "航母"])
                        }])
                }])
        });
        this.Works.Add({
            CustiomPVEID: "23",
            WorkName: "【6-1.不打航母】",
            Remark: "必须有低速，其他配置请使用自定义",
            RepairLevel: DBEnum.RepairLevel.修大中破,
            ChallengeID: "601",
            Paths: List.From([{
                    Nodes: List.From([{
                            NodeNo: "02", Name: "A", Formation: DBEnum.Formation.单横阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 0, OnlyFight: new List(), SLFilter: List.From(["航母"])
                        }])
                }])
        });
        if (Config.MoreSetting.DarkSteel == true) {
            this.Works.Add({
                CustiomPVEID: "99",
                WorkName: "黑暗炼钢",
                Remark: "不明白的请不要执行该任务",
                RepairLevel: DBEnum.RepairLevel.修大中破,
                ChallengeID: "101",
                Paths: List.From([{
                        Nodes: List.From([{
                                NodeNo: "02", Name: "A", Formation: DBEnum.Formation.单纵阵, Action: DBEnum.WorkNodeAction.战斗点, FightNight: 1, OnlyFight: new List(), SLFilter: new List()
                            }])
                    }])
            });
        }
        MissionWorker.Works.RemoveAll(function (c) { return Config.MoreSetting.HideDefaultMissions.Contains(c.CustiomPVEID); });
    };
    MissionWorker.Works = null;
    MissionWorker.State = DBEnum.WorkState.Ready;
    MissionWorker.MissionProgressNow = 0;
    MissionWorker.MissionProgressTotal = 0;
    MissionWorker.IsRepairing = false;
    MissionWorker.CurrentWork = null;
    MissionWorker.OnCheck = new List();
    MissionWorker.OnStart = new List();
    MissionWorker.OnStoped = new List();
    MissionWorker.OnOneEnd = new List();
    MissionWorker.OnTotalEnd = new List();
    MissionWorker.PathNodeIn = new List();
    MissionWorker.PathNodeOut = new List();
    MissionWorker.OnSpyEnemy = new List();
    MissionWorker.OnDealtoEnemy = new List();
    MissionWorker.OnWarEndEnemy = new List();
    MissionWorker.LastActionNode = null;
    MissionWorker.NeedRelink = false;
    MissionWorker.LastEndTimeSpan = 0;
    MissionWorker.IsStopOnDayGetShipLimit = false;
    MissionWorker.JinTuErrorNumber = 0;
    MissionWorker.IsayRepairing = false;
    MissionWorker.IsayChanging = false;
    MissionWorker.IsayUnEquip = false;
    MissionWorker.IsFristChange = true;
    MissionWorker.ThreadSemaphore = 0;
    return MissionWorker;
}());
var YanXiWorker = (function () {
    function YanXiWorker() {
    }
    YanXiWorker.CheckThreadSemaphore = function () {
        if (this.ThreadSemaphore == 0 && YanXiWorker.State == DBEnum.WorkState.Working) {
            throw "WorkerAbort";
        }
    };
    YanXiWorker.State = DBEnum.WorkState.Ready;
    YanXiWorker.ThreadSemaphore = 0;
    YanXiWorker.RunPVPYanYi = null;
    return YanXiWorker;
}());
var ZhanYiWorker = (function () {
    function ZhanYiWorker() {
    }
    ZhanYiWorker.CheckThreadSemaphore = function () {
        if (this.ThreadSemaphore == 0 && ZhanYiWorker.State == DBEnum.WorkState.Working) {
            throw "WorkerAbort";
        }
    };
    ZhanYiWorker.State = DBEnum.WorkState.Ready;
    ZhanYiWorker.ThreadSemaphore = 0;
    ZhanYiWorker.RunZhanYi = null;
    return ZhanYiWorker;
}());
var QueueWorker = (function () {
    function QueueWorker() {
    }
    Object.defineProperty(QueueWorker, "CurrentQueue", {
        get: function () {
            return Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == QueueWorker.CurrentQueueID; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueWorker, "CurrentNode", {
        get: function () {
            return this.CurrentQueue.Nodes.FirstOrDefault(function (c) { return c.IsCurrent; });
        },
        enumerable: true,
        configurable: true
    });
    QueueWorker.GetCustomPVE = function (workID) {
        return MissionWorker.Works.FirstOrDefault(function (m) { return workID.SplitOutEmpty("_")[1] == m.CustiomPVEID; });
    };
    QueueWorker.Init = function () {
        var _This = this;
        MissionWorker.OnStart.Add(function () {
            _This.OnMissionStart.ForEach(function (f) { f(); });
        });
        MissionWorker.OnOneEnd.Add(function () {
            if (_This.State == DBEnum.WorkState.Working && MissionWorker.CurrentWork.CustiomPVEID == _This.GetCustomPVE(_This.CurrentNode.WorkID).CustiomPVEID) {
                _This.CurrentNode.SurplusWorkNumber--;
                _This.OnOneEnd.ForEach(function (f) { f(); });
            }
        });
        MissionWorker.OnTotalEnd.Add(function () {
            if (_This.State == DBEnum.WorkState.Working) {
                if (_This.CurrentNode.SurplusWorkNumber <= 0) {
                    if (_This.CurrentQueue.Nodes.Where(function (c) { return c.IsForbidden == false; }).LastOrDefault().WorkID == _This.CurrentNode.WorkID) {
                        Logs.Print("任务队列 - 执行完成");
                        _This.State = DBEnum.WorkState.Ready;
                        _This.CurrentQueue.Nodes.ForEach(function (c) {
                            c.IsCurrent = false;
                            c.SurplusWorkNumber = c.TotalWorkNumber;
                        });
                        _This.State = DBEnum.WorkState.Ready;
                        _This.OnEnd.ForEach(function (f) { f(); });
                    }
                    else {
                        _This.RunWork();
                    }
                }
                else {
                    Logs.Print("任务队列 - 执行结束 中途停止");
                    _This.State = DBEnum.WorkState.Ready;
                    _This.OnEnd.ForEach(function (f) { f(); });
                }
            }
        });
        MissionWorker.OnStoped.Add(function () {
        });
    };
    QueueWorker.RunWork = function () {
        var _This = this;
        var aliveNodes = _This.CurrentQueue.Nodes.Where(function (c) { return c.IsForbidden == false; });
        if (aliveNodes.Where(function (c) { return c.IsCurrent; }).Count() == 0) {
            _This.CurrentQueue.Nodes.ForEach(function (c) {
                c.IsCurrent = false;
            });
            aliveNodes[0].IsCurrent = true;
        }
        else if (_This.CurrentNode.SurplusWorkNumber > 0) {
        }
        else {
            var index = aliveNodes.Select(function (c) { return c.WorkID; }).IndexOf(_This.CurrentNode.WorkID);
            var nextIndex = index == (aliveNodes.Length - 1) ? 0 : (index + 1);
            var nextWork = aliveNodes[nextIndex];
            _This.CurrentNode.IsCurrent = false;
            _This.CurrentQueue.Nodes.ForEach(function (c) {
                c.IsCurrent = false;
            });
            nextWork.IsCurrent = true;
        }
        MissionWorker.CurrentWork = _This.GetCustomPVE(_This.CurrentNode.WorkID);
        Config.CurrentFleetID = _This.CurrentNode.FleetID;
        MissionWorker.Start({ MissionProgressNow: _This.CurrentNode.TotalWorkNumber - _This.CurrentNode.SurplusWorkNumber, MissionProgressTotal: _This.CurrentNode.TotalWorkNumber });
    };
    QueueWorker.CheckRun = function (queueID) {
        var _This = this;
        if (MissionWorker.State != DBEnum.WorkState.Ready) {
            return "任务队列 - 启用失败\n请先停止任务";
        }
        if (YanXiWorker.State != DBEnum.WorkState.Ready) {
            return "任务队列 - 启用失败\n请先停止演习";
        }
        if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
            return "任务队列 - 启用失败\n请先停止战役";
        }
        if (QueueWorker.State != DBEnum.WorkState.Ready) {
            return "任务队列 - 启用失败\n请先停止队列";
        }
        var CurrentQueue = Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == queueID; });
        if (CurrentQueue == null) {
            return "任务队列 - 启用失败\n队列不存在";
        }
        if (CurrentQueue.Nodes.Count() == 0) {
            return "任务队列 - 启用失败\n队列中无任务";
        }
        var freeWorks = CurrentQueue.Nodes.Where(function (c) { return c.IsForbidden == false; });
        if (freeWorks.Count() == 0) {
            return "任务队列 - 启用失败\n队列中无激活的任务";
        }
        if (CurrentQueue.Nodes.Where(function (c) { return MissionWorker.Works.Where(function (m) { return c.WorkID.SplitOutEmpty("_")[1] == m.CustiomPVEID; }).Count() == 0; }).Count() > 0) {
            return "任务队列 - 启用失败\n部分任务不存在";
        }
        var currentWork = freeWorks.Where(function (c) { return c.IsCurrent == true; }).Count() == 0 ? freeWorks[0] : freeWorks.FirstOrDefault(function (c) { return c.IsCurrent == true; });
        var nextAllwork = freeWorks.Where(function (c) { return CurrentQueue.Nodes.IndexOf(c) > CurrentQueue.Nodes.IndexOf(currentWork); });
        if (currentWork.SurplusWorkNumber <= 0 && nextAllwork.Count() == 0) {
            return "任务队列 - 当前队列已执行完毕，请重置";
        }
        if (currentWork.IsForbidden == true && nextAllwork.Where(function (c) { return c.IsForbidden == false; }).Count() == 0) {
            return "任务队列 - 没有需要执行任务";
        }
        return "";
    };
    QueueWorker.Run = function (queueID) {
        return __awaiter(this, void 0, void 0, function () {
            var _This, checkResult;
            return __generator(this, function (_a) {
                _This = this;
                checkResult = _This.CheckRun(queueID);
                if (checkResult != "") {
                    Logs.Print(checkResult);
                    return [2];
                }
                _This.CurrentQueueID = queueID;
                _This.State = DBEnum.WorkState.Working;
                _This.OnQueueStart.ForEach(function (f) { return f(); });
                _This.RunWork();
                return [2];
            });
        });
    };
    QueueWorker.CheckStop = function () {
        if (MissionWorker.State == DBEnum.WorkState.Ready) {
            return "当前没有任务执行";
        }
        else if (QueueWorker.State == DBEnum.WorkState.Ready) {
            return "当前没有队列执行";
        }
        else if (this.IsStoping == true) {
            return "当前没有队列执行";
        }
        else {
            return "";
        }
    };
    QueueWorker.Stop = function () {
        var _This = this;
        var checkResult = _This.CheckStop();
        if (checkResult != "") {
            Logs.Print(checkResult);
            return;
        }
        _This.IsStoping = true;
        _This.OnStoped.ForEach(function (f) { f(); });
        Logs.Print("正在停止队列...");
        MissionWorker.Stop();
        _This.IsStoping = false;
    };
    QueueWorker.State = DBEnum.WorkState.Ready;
    QueueWorker.CurrentQueueID = "";
    QueueWorker.OnQueueStart = new List();
    QueueWorker.OnMissionStart = new List();
    QueueWorker.OnStoped = new List();
    QueueWorker.OnOneEnd = new List();
    QueueWorker.OnEnd = new List();
    QueueWorker.IsStoping = false;
    return QueueWorker;
}());
//# sourceMappingURL=Woker.js.map