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
var AutoJianZao = (function () {
    function AutoJianZao() {
    }
    AutoJianZao.PrintLog = function (msg, notifyType) {
        if (notifyType === void 0) { notifyType = null; }
        if ($("#PartialAreas .areaPanel_shipBuilder").find(".messageBox p").length > 500) {
            $("#PartialAreas .areaPanel_shipBuilder").find(".messageBox p").last().remove();
        }
        $("#PartialAreas .areaPanel_shipBuilder").find(".messageBox").prepend("<p>" + DateTime.ParseTime(NetDate.GetTimeSpan()).ToString("HH:mm:ss") + " " + msg + "</p>");
        Logs.Print(msg, notifyType);
    };
    AutoJianZao.GetBuildResult = function (dockId) {
        return __awaiter(this, void 0, void 0, function () {
            var _This, getResult, newship, lockCIDS;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        if (Player.UserShipVo.Count() >= Player.User.shipnumtop) {
                            if (_This.IsSayMaxNumber == false) {
                                _This.IsSayMaxNumber = true;
                                _This.PrintLog("建造 - 船位已满");
                            }
                            return [2];
                        }
                        _This.IsSayMaxNumber = false;
                        return [4, Net.Build.GetBoat(dockId)];
                    case 1:
                        getResult = _a.sent();
                        if (!(getResult.ErrorCode == 0)) return [3, 7];
                        _This.PrintLog("建造 - 【" + Player.GetShipName(getResult.shipvo) + "】", DBEnum.ENUM_NotificationType.建造结果);
                        newship = getResult.shipvo;
                        Player.UserShipVo.Add(newship);
                        lockCIDS = Config.PlayerConfig.ForcelockCIDS;
                        if (!lockCIDS.Contains(newship.shipcid)) return [3, 3];
                        _This.PrintLog("强制锁船！ " + Player.GetShipName(newship) + " 加锁");
                        return [4, Net.Dock.LockBoat(newship.id)];
                    case 2:
                        _a.sent();
                        return [3, 6];
                    case 3:
                        if (!(Player.UnLockShip.Where(function (c) { return c == newship.shipcid; }).Count() == 0)) return [3, 6];
                        if (!Config.PlayerConfig.AutoLockShip) return [3, 5];
                        _This.PrintLog("新船！ " + Player.GetShipName(newship) + " 加锁");
                        return [4, Net.Dock.LockBoat(newship.id)];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        _This.PrintLog("新船！ " + Player.GetShipName(newship) + " 不加锁");
                        _a.label = 6;
                    case 6:
                        if (_This.StopOnNames != null && _This.StopOnNames.Count() > 0) {
                            if (AutoJianZao.IsStart == true && _This.StopOnNames.Where(function (c) { return Player.GetShipName(getResult.shipvo).indexOf(c) >= 0; }).Count() > 0) {
                                _This.PrintLog("建造 - 自动停止 共建造" + AutoJianZao.NowNumber + "次", DBEnum.ENUM_NotificationType.建出停止);
                                AutoJianZao.Stop();
                            }
                        }
                        return [3, 8];
                    case 7:
                        _This.PrintLog("建造 - 获取失败");
                        _a.label = 8;
                    case 8: return [2];
                }
            });
        });
    };
    AutoJianZao.UseQuickBuild = function (dockId) {
        return __awaiter(this, void 0, void 0, function () {
            var _This, netResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        return [4, Net.Build.InstantBuild(dockId)];
                    case 1:
                        netResult = _a.sent();
                        if (!(netResult.ErrorCode != 0)) return [3, 2];
                        _This.PrintLog("建造 - 快建使用失败");
                        return [3, 4];
                    case 2:
                        _This.PrintLog("建造 - 快建使用成功");
                        return [4, this.GetBuildResult(dockId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    AutoJianZao.CheckAutoJianZao = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _This, freeDocks, freeDock, buildResult, endTime, subSecound, hour, mini, secound, str, kuanjiannum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        _This.IsGeting = true;
                        if (_This.IsStart == false)
                            return [2];
                        if (_This.TotalNumber <= _This.NowNumber)
                            return [2];
                        freeDocks = Player.ShipBuildDockVo.Where(function (c) { return c.locked == 0 && (c.shiptype == 0 || c.shiptype == undefined); });
                        if (!(freeDocks.Count() > 0)) return [3, 10];
                        if (!((Player.User.oil - _This.Oil) < 300 || (Player.User.ammo - _This.Ammo) < 300 || (Player.User.steel - _This.Steel) < 300 || (Player.User.aluminium - _This.Aluminium) < 300)) return [3, 1];
                        if (_This.IsLogEmptyResource == false) {
                            _This.IsLogEmptyResource = true;
                            Logs.Print("建造 - 资源储量过低");
                        }
                        return [3, 10];
                    case 1:
                        _This.IsLogEmptyResource = false;
                        return [4, Common.CheckShipAreaFree()];
                    case 2:
                        _a.sent();
                        return [4, Sleep(1000)];
                    case 3:
                        _a.sent();
                        freeDock = freeDocks[0];
                        return [4, Net.Build.BuildBoat(freeDock.id, _This.Oil, _This.Ammo, _This.Steel, _This.Aluminium)];
                    case 4:
                        buildResult = _a.sent();
                        return [4, Sleep(3000)];
                    case 5:
                        _a.sent();
                        if (!(buildResult.ErrorCode == 0)) return [3, 9];
                        _This.NowNumber++;
                        endTime = Player.ShipBuildDockVo.FirstOrDefault(function (c) { return c.id == freeDock.id; }).endtime;
                        subSecound = Math.max(endTime - NetDate.GetTimeSpanSecound(), 0);
                        hour = Math.floor(subSecound / 3600);
                        mini = Math.floor((subSecound - hour * 3600) / 60);
                        secound = subSecound - hour * 3600 - mini * 60;
                        str = (hour.toString().length == 1 ? "0" : "") + hour + ":" + (mini.toString().length == 1 ? "0" : "") + mini + ":" + (secound.toString().length == 1 ? "0" : "") + secound;
                        _This.PrintLog("建造 - 第 " + _This.NowNumber + " 次 " + str);
                        kuanjiannum = Player.GetPackageNumber(DBEnum.PackageType.快速建造);
                        if (!(kuanjiannum > 0 && _This.KuanJianMinute > 0 && subSecound > (_This.KuanJianMinute * 60))) return [3, 8];
                        return [4, Sleep(3000)];
                    case 6:
                        _a.sent();
                        return [4, _This.UseQuickBuild(freeDock.id)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (_This.NowNumber >= _This.TotalNumber) {
                            _This.PrintLog("建造 结束", DBEnum.ENUM_NotificationType.建造结束);
                            AutoJianZao.Stop();
                        }
                        return [3, 10];
                    case 9:
                        _This.PrintLog("建造 - 失败");
                        _a.label = 10;
                    case 10:
                        _This.IsGeting = false;
                        return [2];
                }
            });
        });
    };
    AutoJianZao.CheckShipBuildDock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pastTime, successDocks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
                            return [2];
                        if (Player.UserShipVo.Count() >= Player.User.shipnumtop) {
                            return [2];
                        }
                        pastTime = NetDate.GetTimeSpanSecound() - 30;
                        successDocks = Player.ShipBuildDockVo.Where(function (c) { return c.shiptype > 0 && c.endtime < pastTime; });
                        return [4, successDocks.ForEachAsync(function (dock) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, AutoJianZao.GetBuildResult(dock.id)];
                                        case 1:
                                            _a.sent();
                                            return [4, Sleep(3000)];
                                        case 2:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AutoJianZao.Start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _This;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        _This.IsStart = true;
                        return [4, _This.OnStart.ForEachAsync(function (c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, c()];
                                    case 1: return [2, _a.sent()];
                                }
                            }); }); })];
                    case 1:
                        _a.sent();
                        _This.timer = new Timer();
                        _This.timer.Interval = 11000;
                        _This.timer.Elapsed = function () { return __awaiter(_this, void 0, void 0, function () {
                            var ex_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _This.timer.Stop();
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 5, 6, 7]);
                                        if (!(NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)) return [3, 2];
                                        return [3, 4];
                                    case 2:
                                        if (!(MissionWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready)) return [3, 4];
                                        return [4, _This.CheckAutoJianZao()];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [3, 7];
                                    case 5:
                                        ex_1 = _a.sent();
                                        return [3, 7];
                                    case 6:
                                        if (_This.timer != null) {
                                            _This.timer.Start();
                                        }
                                        return [7];
                                    case 7: return [2];
                                }
                            });
                        }); };
                        _This.timer.Start();
                        return [2];
                }
            });
        });
    };
    AutoJianZao.Stop = function () {
        var _this = this;
        var _This = this;
        _This.OnEnd.ForEachAsync(function (c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, c()];
                case 1: return [2, _a.sent()];
            }
        }); }); });
        _This.IsStart = false;
        if (_This.timer != null) {
            _This.timer.Stop();
            _This.timer = null;
        }
    };
    AutoJianZao.Oil = 0;
    AutoJianZao.Ammo = 0;
    AutoJianZao.Steel = 0;
    AutoJianZao.Aluminium = 0;
    AutoJianZao.KuanJianMinute = 0;
    AutoJianZao.StopOnNames = new List();
    AutoJianZao.TotalNumber = 0;
    AutoJianZao.NowNumber = 0;
    AutoJianZao.OnStart = new List();
    AutoJianZao.OnEnd = new List();
    AutoJianZao.IsStart = false;
    AutoJianZao.IsGeting = false;
    AutoJianZao.IsSayMaxNumber = false;
    AutoJianZao.IsLogEmptyResource = false;
    return AutoJianZao;
}());
//# sourceMappingURL=AutoJianZao.js.map