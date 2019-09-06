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
var Common = (function () {
    function Common() {
    }
    Common.CheckShipAreaFree = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var awardShips, i, autoStrengthenSetting, needStrengthenShips, skipShipIds_1, autoDismantleSetting, listShips, replaceShip, dismantleShips, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        awardShips = Player.UserShipVo.Where(function (c) { return Player.IsAwardShip(c); }).Where(function (c) { return c.islocked == 0; });
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < awardShips.Count())) return [3, 5];
                        return [4, Net.Dock.LockBoat(awardShips[i].id)];
                    case 2:
                        _a.sent();
                        return [4, Sleep(2000)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 1];
                    case 5:
                        autoStrengthenSetting = Config.MoreSetting.AutoStrengthenSetting == undefined ? new IniModal.AutoStrengthenSetting() : Config.MoreSetting.AutoStrengthenSetting;
                        if (!((Player.User.shipnumtop - Player.UserShipVo.Count()) <= autoStrengthenSetting.DockFreeNumber && Config.PlayerConfig.AutoStrengthen == true && Config.PlayerConfig.AutoStrengthenShipIDS.Count() > 0)) return [3, 7];
                        needStrengthenShips = Player.UserShipVo.Where(function (c) { return c.shipcid != 10030911 && Config.PlayerConfig.AutoStrengthenShipIDS.Contains(c.id); });
                        needStrengthenShips = needStrengthenShips.Where(function (ship) {
                            var initShip = Player.GetIniShip(ship);
                            if (initShip == null) {
                                return false;
                            }
                            else {
                                if ((autoStrengthenSetting.SkillLevelUp == true && ship.nextskillid > 0) || ship.strengthenattribute.atk < initShip.StrengthenTop.ATK || ship.strengthenattribute.torpedo < initShip.StrengthenTop.Torpedo || ship.strengthenattribute.def < initShip.StrengthenTop.Def || ship.strengthenattribute.air_def < initShip.StrengthenTop.Air_Def) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        });
                        if (autoStrengthenSetting.OrderByStrengthenShip == DBEnum.OrderByStrengthenShip.高技能等级先强化) {
                            needStrengthenShips = needStrengthenShips.OrderByDescending(function (c) { return c.skilllevel; });
                        }
                        if (autoStrengthenSetting.OrderByStrengthenShip == DBEnum.OrderByStrengthenShip.高舰船等级先强化) {
                            needStrengthenShips = needStrengthenShips.OrderByDescending(function (c) { return c.level; });
                        }
                        return [4, needStrengthenShips.ForEachAsync(function (ship) { return __awaiter(_this, void 0, void 0, function () {
                                var initShip, result, subAtk, subDef, subTorpedo, subAirDef, IsFitOverAtt, IsFitHasExpAtt, foodShips, replaceShip, selectedFoodShips, selectFoodShip, removeFoodShip, i, fitFoodShip, prvAttr, result_1, nextAttr;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            initShip = Player.GetIniShip(ship);
                                            if (!Player.IsRepairShip(ship)) return [3, 1];
                                            Logs.Print("自动强化 - " + initShip.Name + " 修理中放弃强化");
                                            return [3, 10];
                                        case 1:
                                            if (!Player.IsYuanZhangShip(ship)) return [3, 2];
                                            Logs.Print("自动强化 - " + initShip.Name + " 远征中放弃强化");
                                            return [3, 10];
                                        case 2:
                                            if (!Player.IsZhuShouShip(ship)) return [3, 3];
                                            Logs.Print("自动强化 - " + initShip.Name + " 驻守中放弃强化");
                                            return [3, 10];
                                        case 3:
                                            if (!(ship.status != 0)) return [3, 4];
                                            Logs.Print("自动强化 - " + initShip.Name + " 其他状态不能强化");
                                            return [3, 10];
                                        case 4:
                                            if (!(ship.nextskillid > 0 && ship.strengthenattribute.air_def == initShip.StrengthenTop.Air_Def && ship.strengthenattribute.atk == initShip.StrengthenTop.ATK && ship.strengthenattribute.def == initShip.StrengthenTop.Def && ship.strengthenattribute.torpedo == initShip.StrengthenTop.Torpedo)) return [3, 7];
                                            Logs.Print("\u81EA\u52A8\u5F3A\u5316 - " + initShip.Name + " \u6280\u80FD\u53EF\u5347\u7EA7\uFF0C\u5C1D\u8BD5\u5347\u7EA7");
                                            return [4, Net.NetComm.DealyRandom(1500)];
                                        case 5:
                                            _a.sent();
                                            return [4, Net.Transform.SkillLevelUp(ship.id)];
                                        case 6:
                                            result = _a.sent();
                                            if (result.ErrorCode == 0) {
                                                Logs.Print("自动强化 - 技能提升成功");
                                            }
                                            else {
                                                Logs.Print("自动强化 - 技能提升失败");
                                            }
                                            _a.label = 7;
                                        case 7:
                                            if (!(ship.strengthenattribute.air_def < initShip.StrengthenTop.Air_Def || ship.strengthenattribute.atk < initShip.StrengthenTop.ATK || ship.strengthenattribute.def < initShip.StrengthenTop.Def || ship.strengthenattribute.torpedo < initShip.StrengthenTop.Torpedo)) return [3, 10];
                                            subAtk = initShip.StrengthenTop.ATK - ship.strengthenattribute.atk;
                                            subDef = initShip.StrengthenTop.Def - ship.strengthenattribute.def;
                                            subTorpedo = initShip.StrengthenTop.Torpedo - ship.strengthenattribute.torpedo;
                                            subAirDef = initShip.StrengthenTop.Air_Def - ship.strengthenattribute.air_def;
                                            IsFitOverAtt = function (shipGroup) {
                                                if (subAtk > 0 && (shipGroup.Ini.StrengthenSupplyExp.ATK - subAtk) > autoStrengthenSetting.OverAtk) {
                                                    return false;
                                                }
                                                if (subDef > 0 && (shipGroup.Ini.StrengthenSupplyExp.Def - subDef) > autoStrengthenSetting.OverDef) {
                                                    return false;
                                                }
                                                if (subTorpedo > 0 && (shipGroup.Ini.StrengthenSupplyExp.Torpedo - subTorpedo) > autoStrengthenSetting.OverTorpedo) {
                                                    return false;
                                                }
                                                if (subAirDef > 0 && (shipGroup.Ini.StrengthenSupplyExp.Air_Def - subAirDef) > autoStrengthenSetting.OverAirDef) {
                                                    return false;
                                                }
                                                return true;
                                            };
                                            IsFitHasExpAtt = function (shipGroup, hasAtts) {
                                                if (hasAtts.indexOf(1) >= 0 && shipGroup.Ini.StrengthenSupplyExp.ATK == 0) {
                                                    return false;
                                                }
                                                if (hasAtts.indexOf(2) >= 0 && shipGroup.Ini.StrengthenSupplyExp.Torpedo == 0) {
                                                    return false;
                                                }
                                                if (hasAtts.indexOf(3) >= 0 && shipGroup.Ini.StrengthenSupplyExp.Def == 0) {
                                                    return false;
                                                }
                                                if (hasAtts.indexOf(4) >= 0 && shipGroup.Ini.StrengthenSupplyExp.Air_Def == 0) {
                                                    return false;
                                                }
                                                return true;
                                            };
                                            foodShips = Player.GetIniShipGroup(Player.UserShipVo.Where(function (c) { return (Config.MoreSetting.KeepMustShip == false || Player.IsMustShip(c) == false) && c.islocked == 0 && c.fleetid == 0 && c.level <= 5 && c.status == 0 && Player.IsBusyShip(c) == false; })).Where(function (c) { return !Player.IsAwardShip(c.Ship); }).Where(function (c) { return c.Ini != null; }).OrderByDescending(function (c) { return c.Ship.id; });
                                            if (MissionWorker.CurrentWork != null && MissionWorker.CurrentWork.CustiomPVEID == "99") {
                                                replaceShip = Player.UserShipVo.FirstOrDefault(function (c) { return Player.IsBusyShip(c) == false && c.islocked == 0 && c.level == 1 && Player.GetShipType(c) == DBEnum.ENUM_ShipType.驱逐 && c.battlepropsmax.hp == c.battleprops.hp && c.battleprops.oil == c.battlepropsmax.oil; });
                                                if (replaceShip != null) {
                                                    foodShips = foodShips.Where(function (c) { return c.Ship.id != replaceShip.id; });
                                                }
                                            }
                                            selectedFoodShips = new List();
                                            selectFoodShip = function (shipGroup) {
                                                selectedFoodShips.Add(shipGroup);
                                                subAtk -= shipGroup.Ini.StrengthenSupplyExp.ATK;
                                                subTorpedo -= shipGroup.Ini.StrengthenSupplyExp.Torpedo;
                                                subDef -= shipGroup.Ini.StrengthenSupplyExp.Def;
                                                subAirDef -= shipGroup.Ini.StrengthenSupplyExp.Air_Def;
                                                foodShips.Remove(shipGroup);
                                            };
                                            removeFoodShip = function (shipGroup) {
                                                selectedFoodShips.Remove(shipGroup);
                                                subAtk += shipGroup.Ini.StrengthenSupplyExp.ATK;
                                                subTorpedo += shipGroup.Ini.StrengthenSupplyExp.Torpedo;
                                                subDef += shipGroup.Ini.StrengthenSupplyExp.Def;
                                                subAirDef += shipGroup.Ini.StrengthenSupplyExp.Air_Def;
                                                foodShips.Add(shipGroup);
                                            };
                                            for (i = 0; i < (20 - selectedFoodShips.Count()); i++) {
                                                if (autoStrengthenSetting.UseQinXunFirst == true && subAtk > 0 && subDef > 0 && subTorpedo > 0 && subAirDef > 0) {
                                                    fitFoodShip = foodShips.FirstOrDefault(function (c) { return IsFitOverAtt(c) == true && IsFitHasExpAtt(c, [1, 2, 3, 4]) && c.Ini.Type == DBEnum.ENUM_ShipType.轻巡; });
                                                    if (fitFoodShip != null) {
                                                        selectFoodShip(fitFoodShip);
                                                    }
                                                }
                                            }
                                            autoStrengthenSetting.CheckAttrOrder.ForEach(function (cOrder) {
                                                for (var i = 0; i < (20 - selectedFoodShips.Count()); i++) {
                                                    var fitFoodShip = null;
                                                    if (cOrder == 1 && subAtk > 0) {
                                                        fitFoodShip = foodShips.Where(function (c) { return IsFitOverAtt(c) == true && IsFitHasExpAtt(c, [cOrder]) && autoStrengthenSetting.AllowAtkTypes.Contains(c.Ini.Type); }).OrderBy(function (c) { return autoStrengthenSetting.AllowAtkTypes.IndexOf(c.Ini.Type); }).ThenByDescending(function (c) { return c.Ini.StrengthenSupplyExp.ATK; }).FirstOrDefault();
                                                    }
                                                    if (cOrder == 2 && subTorpedo > 0) {
                                                        fitFoodShip = foodShips.Where(function (c) { return IsFitOverAtt(c) == true && IsFitHasExpAtt(c, [cOrder]) && autoStrengthenSetting.AllowTorpedoTypes.Contains(c.Ini.Type); }).OrderBy(function (c) { return autoStrengthenSetting.AllowTorpedoTypes.IndexOf(c.Ini.Type); }).ThenByDescending(function (c) { return c.Ini.StrengthenSupplyExp.Torpedo; }).FirstOrDefault();
                                                    }
                                                    if (cOrder == 3 && subDef > 0) {
                                                        fitFoodShip = foodShips.Where(function (c) { return IsFitOverAtt(c) == true && IsFitHasExpAtt(c, [cOrder]) && autoStrengthenSetting.AllowDefTypes.Contains(c.Ini.Type); }).OrderBy(function (c) { return autoStrengthenSetting.AllowDefTypes.IndexOf(c.Ini.Type); }).ThenByDescending(function (c) { return c.Ini.StrengthenSupplyExp.Def; }).FirstOrDefault();
                                                    }
                                                    if (cOrder == 4 && subAirDef > 0) {
                                                        fitFoodShip = foodShips.Where(function (c) { return IsFitOverAtt(c) == true && IsFitHasExpAtt(c, [cOrder]) && autoStrengthenSetting.AllowAirDefTypes.Contains(c.Ini.Type); }).OrderBy(function (c) { return autoStrengthenSetting.AllowAirDefTypes.IndexOf(c.Ini.Type); }).ThenByDescending(function (c) { return c.Ini.StrengthenSupplyExp.Air_Def; }).FirstOrDefault();
                                                    }
                                                    if (fitFoodShip != null) {
                                                        selectFoodShip(fitFoodShip);
                                                        continue;
                                                    }
                                                }
                                            });
                                            selectedFoodShips.ForEach(function (foodShip) {
                                                if ((subAtk + foodShip.Ini.StrengthenSupplyExp.ATK) <= Math.max(0, subAtk) && (subTorpedo + foodShip.Ini.StrengthenSupplyExp.Torpedo) <= Math.max(0, subTorpedo) && (subDef + foodShip.Ini.StrengthenSupplyExp.Def) <= Math.max(0, subDef) && (subAirDef + foodShip.Ini.StrengthenSupplyExp.Air_Def) <= Math.max(0, subAirDef)) {
                                                    removeFoodShip(foodShip);
                                                }
                                            });
                                            if (!(selectedFoodShips.Count() > 0)) return [3, 10];
                                            prvAttr = "[" + ship.strengthenattribute.atk + ", " + ship.strengthenattribute.torpedo + ", " + ship.strengthenattribute.def + ", " + ship.strengthenattribute.air_def + "]";
                                            return [4, Net.NetComm.DealyRandom(1500)];
                                        case 8:
                                            _a.sent();
                                            return [4, Net.Transform.Strengthen(ship.id, selectedFoodShips.Select(function (c) { return c.Ship.id; }))];
                                        case 9:
                                            result_1 = _a.sent();
                                            if (result_1.ErrorCode == 0) {
                                                Logs.Print("\u81EA\u52A8\u5F3A\u5316 - \u5F3A\u5316\u6210\u529F,\u6D88\u8017" + selectedFoodShips.Count() + "\u72D7\u7CAE");
                                                nextAttr = "[" + ship.strengthenattribute.atk + ", " + ship.strengthenattribute.torpedo + ", " + ship.strengthenattribute.def + ", " + ship.strengthenattribute.air_def + "]";
                                                Logs.Print("\u81EA\u52A8\u5F3A\u5316 - " + initShip.Name + " " + prvAttr + " -> " + nextAttr);
                                            }
                                            else {
                                                Logs.Print("自动强化 - 强化失败");
                                            }
                                            _a.label = 10;
                                        case 10: return [2];
                                    }
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!(Player.UserShipVo.Count() >= Player.User.shipnumtop && Config.PlayerConfig.AutoDismantleShip == true)) return [3, 10];
                        Logs.Print("船位已满，尝试自动分解...");
                        skipShipIds_1 = new List();
                        Player.FleetVo.ForEach(function (item) {
                            skipShipIds_1.AddRange(item.ships);
                        });
                        autoDismantleSetting = Config.PlayerConfig.AutoDismantleSetting;
                        listShips = Player.UserShipVo.Where(function (c) { return (!skipShipIds_1.Contains(c.id)) && (Config.MoreSetting.KeepMustShip == false || Player.IsMustShip(c) == false) && c.islocked == 0 && c.fleetid == 0 && c.level <= 5 && c.status == 0 && Player.IsBusyShip(c) == false; }).Where(function (c) { return !Player.IsAwardShip(c); });
                        listShips = listShips.Where(function (c) { return autoDismantleSetting.AllowTypes.Contains(Player.GetIniShip(c) == null ? 0 : Player.GetIniShip(c).Type) == true; });
                        listShips = listShips.OrderBy(function (c) { return autoDismantleSetting.AllowTypes.IndexOf(Player.GetIniShip(c).Type); }).ThenByDescending(function (c) { return c.id; });
                        if (MissionWorker.CurrentWork != null && MissionWorker.CurrentWork.CustiomPVEID == "99") {
                            replaceShip = Player.UserShipVo.FirstOrDefault(function (c) { return Player.IsBusyShip(c) == false && c.islocked == 0 && c.level == 1 && Player.GetShipType(c) == DBEnum.ENUM_ShipType.驱逐 && c.battlepropsmax.hp == c.battleprops.hp && c.battleprops.oil == c.battlepropsmax.oil; });
                            if (listShips.Contains(replaceShip)) {
                                listShips.Remove(replaceShip);
                            }
                        }
                        Logs.Print("可分解的舰船为" + listShips.Count() + "艘");
                        dismantleShips = listShips.Take(autoDismantleSetting.DisNumber);
                        if (!(dismantleShips.Count() > 0)) return [3, 9];
                        Logs.Print("分解" + dismantleShips.Count() + "艘..");
                        return [4, Net.Dock.DismantleBoat(dismantleShips.Select(function (c) { return c.id; }), autoDismantleSetting.UnloadEquip)];
                    case 8:
                        result = _a.sent();
                        if (result.ErrorCode == 0) {
                            Logs.Print("分解成功");
                            Logs.Print("\u81EA\u52A8\u5206\u89E3 - " + dismantleShips.Select(function (c) { return Player.GetShipName(c); }).JoinToString(","));
                        }
                        else {
                            Logs.Print("分解失败！" + result.ErrorMessage);
                        }
                        return [3, 10];
                    case 9:
                        Logs.Print("分解数量为零");
                        _a.label = 10;
                    case 10: return [2];
                }
            });
        });
    };
    Common.CheckYuanZheng = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pastTime, level, getResult, teamShips, suplayResut, startResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.ExploreError == false || (this.ExploreError == true && this.ExploreErrorReLinkTime.SmallThen(DateTime.Now)))) return [3, 7];
                        this.ExploreError = false;
                        pastTime = NetDate.GetTimeSpanSecound() - 45;
                        level = Player.PveExploreVo.levels.FirstOrDefault(function (c) { return c.endtime < pastTime; });
                        if (!(level != null)) return [3, 7];
                        Logs.Print("收远征 - 【" + DBEnum.FleetName[level.fleetid] + "】", DBEnum.ENUM_NotificationType.远征完成);
                        return [4, Net.Explore.GetResult(level.fleetid, level.exploreid)];
                    case 1:
                        getResult = _a.sent();
                        if (!(getResult.ErrorCode != 0)) return [3, 2];
                        this.ExploreError = true;
                        this.ExploreErrorReLinkTime = DateTime.Now.AddMinutes(10);
                        Logs.Print("远征收取失败！" + getResult.ErrorMessage);
                        return [2];
                    case 2:
                        Logs.Print(getResult.bigsuccess == 1 ? "大成功" : "成功");
                        if (!(level.fleetid > 4)) return [3, 6];
                        teamShips = Player.GetFleetShips(level.fleetid);
                        if (!(teamShips.Where(function (c) { return c.battleprops.oil < c.battlepropsmax.oil || c.battleprops.ammo < c.battlepropsmax.ammo || c.battleprops.aluminium < c.battlepropsmax.aluminium; }).Count() > 0)) return [3, 4];
                        Logs.Print("补给");
                        return [4, Net.Conditioning.SupplyBoats(teamShips.Select(function (c) { return c.id; }), "0")];
                    case 3:
                        suplayResut = _a.sent();
                        if (suplayResut.ErrorCode != 0) {
                            Logs.Print("补给失败");
                        }
                        _a.label = 4;
                    case 4: return [4, Net.Explore.Start(level.fleetid, level.exploreid)];
                    case 5:
                        startResult = _a.sent();
                        if (startResult.ErrorCode != 0) {
                            Logs.Print("进入远征失败！");
                            return [2];
                        }
                        else {
                            Logs.Print("进入远征 - 【" + DBEnum.FleetName[level.fleetid] + "】");
                        }
                        return [3, 7];
                    case 6:
                        Logs.Print("5~8舰队才能进入远征，请手动调整");
                        _a.label = 7;
                    case 7: return [2];
                }
            });
        });
    };
    Common.CheckShipsRepair = function (ships, repairLevel) {
        return __awaiter(this, void 0, void 0, function () {
            var damageShips, repairResult_1, damageShips, repairResult_2, damageShips, repairResult_3, damageShips, dockShipids, repairShip, freeDocks, repairDock, repairResult_4, damageShips, dockShipids, repairShip, freeDocks, repairDock, repairResult, damageShips, dockShipids, repairShip, freeDocks, repairDock, repairResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(repairLevel > 0)) return [3, 50];
                        if (!(repairLevel == 1)) return [3, 3];
                        damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp / c.battleprops.hp) > 4; });
                        if (!(damageShips.Count() > 0)) return [3, 3];
                        if (!(damageShips.Count() > Player.PackageVo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).FirstOrNew()["num"])) return [3, 1];
                        Logs.Print("快修不足！");
                        return [2, false];
                    case 1:
                        Logs.Print("修理大破->" + damageShips.Select(function (c) { return ships.IndexOf(c) + 1; }).JoinToString(",") + "号");
                        return [4, Net.Conditioning.QuickRepairShip(damageShips)];
                    case 2:
                        repairResult_1 = _a.sent();
                        if (repairResult_1.ErrorCode != 0) {
                            Logs.Print("修理失败！");
                            return [2, false];
                        }
                        _a.label = 3;
                    case 3:
                        if (!(repairLevel == 2)) return [3, 6];
                        damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 2; });
                        if (!(damageShips.Count() > 0)) return [3, 6];
                        if (!(damageShips.Count() > Player.PackageVo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).FirstOrNew()["num"])) return [3, 4];
                        Logs.Print("快修不足！");
                        return [2, false];
                    case 4:
                        Logs.Print("修理大中破->" + damageShips.Select(function (c) { return ships.IndexOf(c) + 1; }).JoinToString(",") + "号");
                        return [4, Net.Conditioning.QuickRepairShip(damageShips)];
                    case 5:
                        repairResult_2 = _a.sent();
                        if (repairResult_2.ErrorCode != 0) {
                            Logs.Print("修理失败！");
                            return [2, false];
                        }
                        _a.label = 6;
                    case 6:
                        if (!(repairLevel == 3)) return [3, 9];
                        damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp > c.battleprops.hp); });
                        if (!(damageShips.Count() > 0)) return [3, 9];
                        if (!(damageShips.Count() > Player.PackageVo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).FirstOrNew()["num"])) return [3, 7];
                        Logs.Print("快修不足！");
                        return [2, false];
                    case 7:
                        Logs.Print("修理大中破->" + damageShips.Select(function (c) { return ships.IndexOf(c) + 1; }).JoinToString(",") + "号");
                        return [4, Net.Conditioning.QuickRepairShip(damageShips)];
                    case 8:
                        repairResult_3 = _a.sent();
                        if (repairResult_3.ErrorCode != 0) {
                            Logs.Print("修理失败！");
                            return [2, false];
                        }
                        _a.label = 9;
                    case 9:
                        if (!(repairLevel == 13)) return [3, 22];
                        if (ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; }).Count() > 0 || ships.Where(function (c) { return Player.IsRepairShip(c); }).Count() > 0) {
                            Logs.Print("澡堂 - 等待洗澡");
                        }
                        _a.label = 10;
                    case 10:
                        if (!(ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; }).Count() > 0 || ships.Where(function (c) { return Player.IsRepairShip(c); }).Count() > 0)) return [3, 22];
                        return [4, Net.NetComm.DealyRandom(1500)];
                    case 11:
                        _a.sent();
                        damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; });
                        if (!(damageShips.Count() > 0)) return [3, 18];
                        dockShipids = Player.RepairDockVo.Select(function (c) { return c.shipid; });
                        repairShip = damageShips.FirstOrDefault(function (c) { return dockShipids.Contains(c.id) == false; });
                        if (!(repairShip != null)) return [3, 18];
                        freeDocks = Player.RepairDockVo.Where(function (c) { return c.locked == 0 && (c.shipid == 0 || c.shipid == undefined); });
                        if (!(freeDocks.Count() > 0)) return [3, 18];
                        repairDock = freeDocks[0];
                        return [4, Net.Conditioning.DockRepairShip(repairDock.id, repairShip.id)];
                    case 12:
                        repairResult_4 = _a.sent();
                        if (!(repairResult_4.ErrorCode == 0)) return [3, 13];
                        Logs.Print("澡堂 - " + Player.GetShipName(repairShip) + " 泡澡");
                        return [3, 18];
                    case 13:
                        Logs.Print("澡堂 - " + Player.GetShipName(repairShip) + " 泡澡失败");
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/getPveData/"), "", Config.LoginCookie)];
                    case 14:
                        _a.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pevent/getPveData/"), "", Config.LoginCookie)];
                    case 15:
                        _a.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/shop/canBuy/1/"), "", Config.LoginCookie)];
                    case 16:
                        _a.sent();
                        return [4, Net.Conditioning.GameReset()];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18:
                        if (!(ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; }).Count() > 0)) return [3, 20];
                        return [4, Net.NetComm.DealyRandom(7000)];
                    case 19:
                        _a.sent();
                        _a.label = 20;
                    case 20: return [4, Common.CheckYuanZheng()];
                    case 21:
                        _a.sent();
                        return [3, 10];
                    case 22:
                        if (!(repairLevel == 14)) return [3, 36];
                        if (ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 2; }).Count() > 0 || ships.Where(function (c) { return Player.IsRepairShip(c); }).Count() > 0) {
                            Logs.Print("澡堂 - 等待洗澡");
                        }
                        _a.label = 23;
                    case 23:
                        if (!(ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 2; }).Count() > 0 || ships.Where(function (c) { return Player.IsRepairShip(c); }).Count() > 0)) return [3, 36];
                        return [4, Net.NetComm.DealyRandom(1500)];
                    case 24:
                        _a.sent();
                        damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 2; });
                        if (!(damageShips.Count() > 0)) return [3, 31];
                        dockShipids = Player.RepairDockVo.Select(function (c) { return c.shipid; });
                        repairShip = damageShips.FirstOrDefault(function (c) { return dockShipids.Contains(c.id) == false; });
                        if (!(repairShip != null)) return [3, 31];
                        freeDocks = Player.RepairDockVo.Where(function (c) { return c.locked == 0 && (c.shipid == 0 || c.shipid == undefined); });
                        if (!(freeDocks.Count() > 0)) return [3, 31];
                        repairDock = freeDocks[0];
                        return [4, Net.Conditioning.DockRepairShip(repairDock.id, repairShip.id)];
                    case 25:
                        repairResult = _a.sent();
                        if (!(repairResult.ErrorCode == 0)) return [3, 26];
                        Logs.Print("澡堂 - " + Player.GetShipName(repairShip) + " 泡澡");
                        return [3, 31];
                    case 26:
                        Logs.Print("澡堂 - " + Player.GetShipName(repairShip) + " 泡澡失败");
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/getPveData/"), "", Config.LoginCookie)];
                    case 27:
                        _a.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pevent/getPveData/"), "", Config.LoginCookie)];
                    case 28:
                        _a.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/shop/canBuy/1/"), "", Config.LoginCookie)];
                    case 29:
                        _a.sent();
                        return [4, Net.Conditioning.GameReset()];
                    case 30:
                        _a.sent();
                        _a.label = 31;
                    case 31:
                        if (!(ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 2; }).Count() > 0)) return [3, 33];
                        return [4, Net.NetComm.DealyRandom(7000)];
                    case 32:
                        _a.sent();
                        _a.label = 33;
                    case 33: return [4, Net.NetComm.DealyRandom(1500)];
                    case 34:
                        _a.sent();
                        return [4, Common.CheckYuanZheng()];
                    case 35:
                        _a.sent();
                        return [3, 23];
                    case 36:
                        if (!(repairLevel == 15)) return [3, 50];
                        if (ships.Where(function (c) { return (c.battlepropsmax.hp > c.battleprops.hp); }).Count() > 0 || ships.Where(function (c) { return Player.IsRepairShip(c); }).Count() > 0) {
                            Logs.Print("澡堂 - 等待洗澡");
                        }
                        _a.label = 37;
                    case 37:
                        if (!(ships.Where(function (c) { return (c.battlepropsmax.hp > c.battleprops.hp); }).Count() > 0 || ships.Where(function (c) { return Player.IsRepairShip(c); }).Count() > 0)) return [3, 50];
                        return [4, Net.NetComm.DealyRandom(1500)];
                    case 38:
                        _a.sent();
                        damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp > c.battleprops.hp); });
                        if (!(damageShips.Count() > 0)) return [3, 45];
                        dockShipids = Player.RepairDockVo.Select(function (c) { return c.shipid; });
                        repairShip = damageShips.FirstOrDefault(function (c) { return dockShipids.Contains(c.id) == false; });
                        if (!(repairShip != null)) return [3, 45];
                        freeDocks = Player.RepairDockVo.Where(function (c) { return c.locked == 0 && (c.shipid == 0 || c.shipid == undefined); });
                        if (!(freeDocks.Count() > 0)) return [3, 45];
                        repairDock = freeDocks[0];
                        return [4, Net.Conditioning.DockRepairShip(repairDock.id, repairShip.id)];
                    case 39:
                        repairResult = _a.sent();
                        if (!(repairResult.ErrorCode == 0)) return [3, 40];
                        Logs.Print("澡堂 - " + Player.GetShipName(repairShip) + " 泡澡");
                        return [3, 45];
                    case 40:
                        Logs.Print("澡堂 - " + Player.GetShipName(repairShip) + " 泡澡失败");
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/getPveData/"), "", Config.LoginCookie)];
                    case 41:
                        _a.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pevent/getPveData/"), "", Config.LoginCookie)];
                    case 42:
                        _a.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/shop/canBuy/1/"), "", Config.LoginCookie)];
                    case 43:
                        _a.sent();
                        return [4, Net.Conditioning.GameReset()];
                    case 44:
                        _a.sent();
                        _a.label = 45;
                    case 45:
                        if (!(ships.Where(function (c) { return (c.battlepropsmax.hp > c.battleprops.hp); }).Count() > 0)) return [3, 47];
                        return [4, Net.NetComm.DealyRandom(7000)];
                    case 46:
                        _a.sent();
                        _a.label = 47;
                    case 47: return [4, Net.NetComm.DealyRandom(1500)];
                    case 48:
                        _a.sent();
                        return [4, Common.CheckYuanZheng()];
                    case 49:
                        _a.sent();
                        return [3, 37];
                    case 50: return [2, true];
                }
            });
        });
    };
    Common.CheckShipsRepair_New = function (allShips, repairTypes) {
        return __awaiter(this, void 0, void 0, function () {
            var quickRepairShips, bathRepairShips, repairResult, moreMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        quickRepairShips = new List();
                        bathRepairShips = new List();
                        allShips.ForEach(function (ship, shipIndex) {
                            var repairType = repairTypes[shipIndex];
                            if (repairType == 1 && ((ship.battlepropsmax.hp / ship.battleprops.hp) > 4)) {
                                quickRepairShips.Add(ship);
                            }
                            if (repairType == 2 && ((ship.battlepropsmax.hp / ship.battleprops.hp) > 2)) {
                                quickRepairShips.Add(ship);
                            }
                            if (repairType == 3 && ((ship.battlepropsmax.hp / ship.battleprops.hp) > 1)) {
                                quickRepairShips.Add(ship);
                            }
                            if (repairType == 13 && ((ship.battlepropsmax.hp / ship.battleprops.hp) > 4)) {
                                bathRepairShips.Add(ship);
                            }
                            if (repairType == 14 && ((ship.battlepropsmax.hp / ship.battleprops.hp) > 2)) {
                                bathRepairShips.Add(ship);
                            }
                            if (repairType == 15 && ((ship.battlepropsmax.hp / ship.battleprops.hp) > 1)) {
                                bathRepairShips.Add(ship);
                            }
                        });
                        if (!(quickRepairShips.Count() > 0)) return [3, 3];
                        if (!(quickRepairShips.Count() > Player.PackageVo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).FirstOrNew()["num"])) return [3, 1];
                        Logs.Print("快修不足！");
                        return [2, false];
                    case 1:
                        Logs.Print("快速修理->" + quickRepairShips.Select(function (c) { return Player.GetShipName(c); }).JoinToString(","));
                        return [4, Net.Conditioning.QuickRepairShip(quickRepairShips)];
                    case 2:
                        repairResult = _a.sent();
                        if (repairResult.ErrorCode != 0) {
                            moreMsg = (repairResult.ErrorCode == -102 || repairResult.ErrorCode == -105 || repairResult.ErrorCode == -106 || repairResult.ErrorCode == -107 || repairResult.ErrorCode == -108) ? "资源不足" : "";
                            Logs.Print("修理失败！" + moreMsg);
                            return [2, false];
                        }
                        _a.label = 3;
                    case 3:
                        if (bathRepairShips.Count() > 0) {
                            bathRepairShips.ForEach(function (c) {
                                if (AutoBath.RepairShips.Where(function (d) { return d.ShipID == c.id; }).Count() == 0) {
                                    var ship = Player.GetShip(c.id);
                                    AutoBath.RepairShips.Add({ ShipID: c.id, IsRepairing: Player.IsRepairShip(ship), OrderIndex: -1 });
                                }
                            });
                        }
                        return [2, true];
                }
            });
        });
    };
    Common.CheckAutoChangeShipFirst = function (custiomPVE) {
        return __awaiter(this, void 0, void 0, function () {
            var fleetShips, CurrentFleetID, expSetting, YuanZhengShipids, ZhuShouShipids, IsUnFitShip, IsSameTeam, realAssignShips, fitCombinations, cIndex, readyShipIds, cIndex, readyShipIds, fitReadyShipid, i, ship, i, oldShipid, newShipid, changeFleetResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fleetShips = Player.GetFleetShips();
                        CurrentFleetID = Config.CurrentFleetID;
                        expSetting = Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == custiomPVE.CustiomPVEID; });
                        if (expSetting == null || expSetting.CanChangeShips == false || expSetting.AssignShips.Where(function (c) { return c.Count() > 0; }).Count() == 0) {
                            return [2, true];
                        }
                        YuanZhengShipids = Player.UserShipVo.Where(function (c) { return c.fleetid > 4; }).Select(function (c) { return c.id; });
                        ZhuShouShipids = new List();
                        Player.FleetVo.Where(function (c) { return c.status == 2; }).Select(function (c) { return c.id; }).ForEach(function (f) {
                            ZhuShouShipids.AddRange(Player.GetFleetShips(f).Select(function (c) { return c.id; }));
                        });
                        IsUnFitShip = function (shipid, index) {
                            var ship = Player.GetShip(shipid);
                            if (ship == null) {
                                return true;
                            }
                            if (YuanZhengShipids.Contains(shipid) || ZhuShouShipids.Contains(shipid)) {
                                return true;
                            }
                            return false;
                        };
                        IsSameTeam = function (shipids) {
                            if (shipids.Count() != shipids.Distinct().Count()) {
                                return true;
                            }
                            var ships = shipids.Select(function (c) { return Player.GetShip(c); });
                            return ships.Where(function (c) { return ships.Where(function (d) { return d.id != c.id && Player.IsSameShip(c, d) == true; }).Count() > 0; }).Count() > 0;
                        };
                        realAssignShips = new List();
                        expSetting.AssignShips.ForEach(function (fl, fIndex) {
                            if (fl.Count() > 0) {
                                var rshipids = fl.Where(function (v, i) { return IsUnFitShip(v, fIndex) == false; });
                                realAssignShips.Add(rshipids);
                            }
                        });
                        fitCombinations = new List();
                        for (cIndex = 0; cIndex < realAssignShips.Count(); cIndex++) {
                            readyShipIds = realAssignShips[cIndex];
                            if (fleetShips.Count() > cIndex && readyShipIds.Contains(fleetShips[cIndex].id)) {
                                fitCombinations.Add(fleetShips[cIndex].id);
                            }
                            else {
                                fitCombinations.Add(0);
                            }
                        }
                        for (cIndex = 0; cIndex < realAssignShips.Count(); cIndex++) {
                            readyShipIds = realAssignShips[cIndex];
                            if (fitCombinations[cIndex] == 0) {
                                fitReadyShipid = readyShipIds.FirstOrDefault(function (c) { return IsSameTeam(NJson.DeepCopy(fitCombinations.Where(function (c) { return c != 0; })).Add(c)) == false; });
                                if (fitReadyShipid != null) {
                                    fitCombinations[cIndex] = fitReadyShipid;
                                }
                                else {
                                    return [2, false];
                                }
                            }
                        }
                        ;
                        if (fitCombinations.JoinToString(",") == fleetShips.Select(function (c) { return c.id; }).JoinToString(",")) {
                            return [2, true];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < fitCombinations.Count())) return [3, 5];
                        ship = Player.GetShip(fitCombinations[i]);
                        if (!(ship.fleetid > 0 && ship.fleetid != CurrentFleetID)) return [3, 4];
                        return [4, Net.NetComm.DealyRandom(3000)];
                    case 2:
                        _a.sent();
                        Logs.Print("\u5C06" + Player.GetShipName(ship) + "\u4ECE\u8230\u961F" + ship.fleetid + "\u4E2D\u79FB\u9664");
                        return [4, Net.Conditioning.RemoveBoat(ship.fleetid, Player.GetFleetShips(ship.fleetid).IndexOf(ship))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 1];
                    case 5: return [4, Net.NetComm.DealyRandom(3000)];
                    case 6:
                        _a.sent();
                        for (i = 0; i <= Math.max(fleetShips.Count(), fitCombinations.Count()); i++) {
                            oldShipid = fleetShips.Count() > i ? fleetShips[i].id : 0;
                            newShipid = fitCombinations.Count() > i ? fitCombinations[i] : 0;
                            if (oldShipid != 0 && newShipid != 0) {
                                if (oldShipid != newShipid) {
                                    Logs.Print("\u81EA\u52A8\u6362\u8239 \u3010" + (i + 1) + "\u3011" + Player.GetShipName(Player.GetShip(oldShipid)) + " \u66FF\u6362\u4E3A " + Player.GetShipName(Player.GetShip(newShipid)));
                                }
                            }
                            else if (oldShipid == 0 && newShipid != 0) {
                                Logs.Print("\u81EA\u52A8\u6362\u8239 \u3010" + (i + 1) + "\u3011\u52A0\u5165 " + Player.GetShipName(Player.GetShip(newShipid)));
                            }
                            else if (newShipid == 0 && oldShipid != 0) {
                                Logs.Print("\u81EA\u52A8\u6362\u8239 \u3010" + (i + 1) + "\u3011\u79FB\u9664 " + Player.GetShipName(Player.GetShip(oldShipid)));
                            }
                        }
                        return [4, Net.Conditioning.InstantFleet(CurrentFleetID, fitCombinations)];
                    case 7:
                        changeFleetResult = _a.sent();
                        if (!(changeFleetResult.ErrorCode != 0)) return [3, 9];
                        Logs.Print("替换失败");
                        return [4, Net.NetComm.DealyRandom(3000)];
                    case 8:
                        _a.sent();
                        return [2, false];
                    case 9: return [2, true];
                }
            });
        });
    };
    Common.CheckAutoChangeShipNew = function (custiomPVE) {
        return __awaiter(this, void 0, void 0, function () {
            var fleetShips, CurrentFleetID, expSetting, RepairShipids, YuanZhengShipids, ZhuShouShipids, IsUnFitShip, IsSameTeam, realAssignShips, fitCombinations, cIndex, readyShipIds, cIndex, readyShipIds, fitReadyShipid, i, ship, i, oldShipid, newShipid, changeFleetResult, donwShipids, i, ship, removeEquips, j, z, unloadResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fleetShips = Player.GetFleetShips();
                        CurrentFleetID = Config.CurrentFleetID;
                        expSetting = Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == custiomPVE.CustiomPVEID; });
                        if (expSetting == null || expSetting.CanChangeShips == false || expSetting.AssignShips.Where(function (c) { return c.Count() > 0; }).Count() == 0) {
                            return [2, true];
                        }
                        RepairShipids = Player.RepairDockVo.Where(function (c) { return c.locked == 0 && c.shipid > 0; }).Select(function (c) { return c.shipid; });
                        YuanZhengShipids = Player.UserShipVo.Where(function (c) { return c.fleetid > 4; }).Select(function (c) { return c.id; });
                        ZhuShouShipids = new List();
                        Player.FleetVo.Where(function (c) { return c.status == 2; }).Select(function (c) { return c.id; }).ForEach(function (f) {
                            ZhuShouShipids.AddRange(Player.GetFleetShips(f).Select(function (c) { return c.id; }));
                        });
                        IsUnFitShip = function (shipid, index) {
                            var ship = Player.GetShip(shipid);
                            if (ship == null) {
                                return true;
                            }
                            if (RepairShipids.Contains(shipid) || YuanZhengShipids.Contains(shipid) || ZhuShouShipids.Contains(shipid)) {
                                return true;
                            }
                            if (expSetting.IsBathChange == true) {
                                var repairLevel = expSetting.CanChangeRepairLevel == true ? expSetting.RepairTypes[index] : custiomPVE.RepairLevel;
                                if (repairLevel == 13 && (ship.battlepropsmax.hp / ship.battleprops.hp) > 4) {
                                    return true;
                                }
                                if (repairLevel == 14 && (ship.battlepropsmax.hp / ship.battleprops.hp) > 2) {
                                    return true;
                                }
                                if (repairLevel == 15 && (ship.battlepropsmax.hp / ship.battleprops.hp) > 1) {
                                    return true;
                                }
                            }
                            if (expSetting.IsLevelChange == true && ship.level >= 110) {
                                return true;
                            }
                            return false;
                        };
                        IsSameTeam = function (shipids) {
                            if (shipids.Count() != shipids.Distinct().Count()) {
                                return true;
                            }
                            var ships = shipids.Select(function (c) { return Player.GetShip(c); });
                            return ships.Where(function (c) { return ships.Where(function (d) { return d.id != c.id && Player.IsSameShip(c, d) == true; }).Count() > 0; }).Count() > 0;
                        };
                        realAssignShips = new List();
                        expSetting.AssignShips.ForEach(function (fl, fIndex) {
                            if (fl.Count() > 0) {
                                var rshipids = fl.Where(function (v, i) { return IsUnFitShip(v, fIndex) == false; });
                                realAssignShips.Add(rshipids);
                            }
                        });
                        fitCombinations = new List();
                        for (cIndex = 0; cIndex < realAssignShips.Count(); cIndex++) {
                            readyShipIds = realAssignShips[cIndex];
                            if (fleetShips.Count() > cIndex && readyShipIds.Contains(fleetShips[cIndex].id)) {
                                fitCombinations.Add(fleetShips[cIndex].id);
                            }
                            else {
                                fitCombinations.Add(0);
                            }
                        }
                        for (cIndex = 0; cIndex < realAssignShips.Count(); cIndex++) {
                            readyShipIds = realAssignShips[cIndex];
                            if (fitCombinations[cIndex] == 0) {
                                fitReadyShipid = readyShipIds.FirstOrDefault(function (c) { return IsSameTeam(NJson.DeepCopy(fitCombinations.Where(function (c) { return c != 0; })).Add(c)) == false; });
                                if (fitReadyShipid != null) {
                                    fitCombinations[cIndex] = fitReadyShipid;
                                }
                                else {
                                    return [2, false];
                                }
                            }
                        }
                        ;
                        if (fitCombinations.JoinToString(",") == fleetShips.Select(function (c) { return c.id; }).JoinToString(",")) {
                            return [2, true];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < fitCombinations.Count())) return [3, 5];
                        ship = Player.GetShip(fitCombinations[i]);
                        if (!(ship.fleetid > 0 && ship.fleetid != CurrentFleetID)) return [3, 4];
                        return [4, Net.NetComm.DealyRandom(3000)];
                    case 2:
                        _a.sent();
                        Logs.Print("\u5C06" + Player.GetShipName(ship) + "\u4ECE\u8230\u961F" + ship.fleetid + "\u4E2D\u79FB\u9664");
                        return [4, Net.Conditioning.RemoveBoat(ship.fleetid, Player.GetFleetShips(ship.fleetid).IndexOf(ship))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 1];
                    case 5: return [4, Net.NetComm.DealyRandom(3000)];
                    case 6:
                        _a.sent();
                        for (i = 0; i <= Math.max(fleetShips.Count(), fitCombinations.Count()); i++) {
                            oldShipid = fleetShips.Count() > i ? fleetShips[i].id : 0;
                            newShipid = fitCombinations.Count() > i ? fitCombinations[i] : 0;
                            if (oldShipid != 0 && newShipid != 0) {
                                if (oldShipid != newShipid) {
                                    Logs.Print("\u81EA\u52A8\u6362\u8239 \u3010" + (i + 1) + "\u3011" + Player.GetShipName(Player.GetShip(oldShipid)) + " \u66FF\u6362\u4E3A " + Player.GetShipName(Player.GetShip(newShipid)));
                                }
                            }
                            else if (oldShipid == 0 && newShipid != 0) {
                                Logs.Print("\u81EA\u52A8\u6362\u8239 \u3010" + (i + 1) + "\u3011\u52A0\u5165 " + Player.GetShipName(Player.GetShip(newShipid)));
                            }
                            else if (newShipid == 0 && oldShipid != 0) {
                                Logs.Print("\u81EA\u52A8\u6362\u8239 \u3010" + (i + 1) + "\u3011\u79FB\u9664 " + Player.GetShipName(Player.GetShip(oldShipid)));
                            }
                        }
                        return [4, Net.Conditioning.InstantFleet(CurrentFleetID, fitCombinations)];
                    case 7:
                        changeFleetResult = _a.sent();
                        if (!(changeFleetResult.ErrorCode != 0)) return [3, 9];
                        Logs.Print("替换失败");
                        return [4, Net.NetComm.DealyRandom(3000)];
                    case 8:
                        _a.sent();
                        return [2, false];
                    case 9:
                        donwShipids = fleetShips.Select(function (c) { return c.id; }).Where(function (c) { return fitCombinations.Contains(c) == false; });
                        donwShipids.Select(function (c) { return Player.GetShip(c); }).Where(function (ship) { return (ship.battlepropsmax.hp / ship.battleprops.hp) > 1 && Player.IsRepairShip(ship) == false && Player.IsYuanZhangShip(ship) == false && Player.IsZhuShouShip(ship) == false && AutoBath.RepairShips.Select(function (c) { return c.ShipID; }).Contains(ship.id) == false; }).ForEach(function (ship) {
                            AutoBath.RepairShips.Add({ ShipID: ship.id, OrderIndex: 0, IsRepairing: false });
                        });
                        if (!(expSetting.CanChangeEquip == true && expSetting.IsUnloadEquip == true)) return [3, 19];
                        i = 0;
                        _a.label = 10;
                    case 10:
                        if (!(i < donwShipids.Count())) return [3, 19];
                        ship = Player.GetShip(donwShipids[i]);
                        removeEquips = ship.equipmentarr.Select(function (c) { return Player.GetIniEquipment(c); });
                        j = 0;
                        _a.label = 11;
                    case 11:
                        if (!(j < removeEquips.Count())) return [3, 18];
                        if (!(removeEquips[j] != null)) return [3, 17];
                        return [4, Net.NetComm.DealyRandom(1000)];
                    case 12:
                        _a.sent();
                        z = 0;
                        _a.label = 13;
                    case 13:
                        if (!(z < 10)) return [3, 17];
                        return [4, Net.Conditioning.RemoveEquipment(ship.id, j)];
                    case 14:
                        unloadResult = _a.sent();
                        if (unloadResult.ErrorCode != 0 && z == 9) {
                            Logs.Print(unloadResult.ErrorMessage);
                        }
                        else {
                            Logs.Print(Player.GetShipName(ship) + "\u5378\u4E0B " + removeEquips[j].Title);
                            return [3, 17];
                        }
                        return [4, Net.NetComm.DealyRandom(3000)];
                    case 15:
                        _a.sent();
                        _a.label = 16;
                    case 16:
                        z++;
                        return [3, 13];
                    case 17:
                        j++;
                        return [3, 11];
                    case 18:
                        i++;
                        return [3, 10];
                    case 19: return [2, true];
                }
            });
        });
    };
    Common.CheckAutoChangeEquip = function (custiomPVE) {
        return __awaiter(this, void 0, void 0, function () {
            var fleetShips, CurrentFleetID, expSetting, i, equips, ship, oldEquips, j, changeResult, newEquips;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fleetShips = Player.GetFleetShips();
                        CurrentFleetID = Config.CurrentFleetID;
                        expSetting = Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == custiomPVE.CustiomPVEID; });
                        if (expSetting == null || expSetting.CanChangeShips == false) {
                            return [2, true];
                        }
                        if (!(expSetting.CanChangeEquip == true)) return [3, 9];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < fleetShips.Count())) return [3, 9];
                        equips = expSetting.AutoSetEquips[i];
                        if (!(equips.Count() > 0)) return [3, 8];
                        ship = fleetShips[i];
                        oldEquips = ship.equipmentarr.JoinToString(",");
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < ship.equipmentarr.Count())) return [3, 7];
                        if (!(equips.Count() > j && Player.IsUnFitEquip(ship, equips[j]) == false && ship.equipmentarr[j] != equips[j])) return [3, 6];
                        if (!(Player.EquipmentVO.Where(function (c) { return c.equipmentcid == equips[j]; }).Count() == 0 || Player.EquipmentVO.FirstOrDefault(function (c) { return c.equipmentcid == equips[j]; }).num <= 0)) return [3, 3];
                        Logs.Print("指定装备 " + Player.GetEquipmentName(Player.GetEquipment(equips[j])) + " 数量不足");
                        return [2, false];
                    case 3: return [4, Net.NetComm.DealyRandom(2000)];
                    case 4:
                        _a.sent();
                        return [4, Net.Conditioning.ChangeEquipment(ship.id, equips[j], j)];
                    case 5:
                        changeResult = _a.sent();
                        _a.label = 6;
                    case 6:
                        j++;
                        return [3, 2];
                    case 7:
                        newEquips = ship.equipmentarr.JoinToString(",");
                        if (oldEquips != newEquips) {
                            Logs.Print(Player.GetShipName(ship) + " \u88C5\u5907\u66FF\u6362\u4E3A [" + ship.equipmentarr.Select(function (c) { var ini = Player.GetIniEquipment(c); return ini == null ? "-" : ini.Title; }).JoinToString(",") + "]");
                        }
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3, 1];
                    case 9: return [2, true];
                }
            });
        });
    };
    Common.CheckAward = function () {
        return __awaiter(this, void 0, void 0, function () {
            var canGainAwards, task, getTaskResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canGainAwards = Player.TaskVo.Where(function (c) { return c.issuccess == false && c.condition.Count() > 0 && c.condition.Where(function (d) { return d.finishedamount < d.totalamount; }).Count() == 0; });
                        if (!(canGainAwards.Count() > 0)) return [3, 2];
                        task = canGainAwards[0];
                        if (!(task.getawardtime == 0)) return [3, 2];
                        return [4, Net.Award.GetAward(task.taskcid)];
                    case 1:
                        getTaskResult = _a.sent();
                        if (getTaskResult.ErrorCode == 0) {
                            task.issuccess = true;
                            task.getawardtime = NetDate.GetTimeSpan();
                            Logs.Print("完成任务 - " + task.title);
                        }
                        else {
                            Logs.Print("任务失败 - " + task.title);
                        }
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    Common.CheckTodayInitReflash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastUpdateTime, now, resetTime, lastUpdateTime, now, resetTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastUpdateTime = DateTime.ParseTime(Net.Login.LastInitTime);
                        now = DateTime.ParseTime(NetDate.GetTimeSpan());
                        resetTime = now.Date.AddMinutes(3);
                        if (!(now.BigThen(resetTime) && lastUpdateTime.SmallThen(resetTime))) return [3, 3];
                        Logs.Print("重置登陆奖励中...");
                        return [4, Net.Login.InitUserInfo()];
                    case 1:
                        _a.sent();
                        return [4, Net.NetComm.DealyRandom(1000)];
                    case 2:
                        _a.sent();
                        Player.TodayEat = false;
                        _a.label = 3;
                    case 3:
                        lastUpdateTime = DateTime.ParseTime(Net.Login.LastInitTime);
                        now = DateTime.ParseTime(NetDate.GetTimeSpan());
                        resetTime = now.Date.AddMinutes(4 * 60 + 5);
                        if (!(now.BigThen(resetTime) && lastUpdateTime.SmallThen(resetTime))) return [3, 6];
                        Logs.Print("重置任务中...");
                        return [4, Net.Login.InitUserInfo()];
                    case 4:
                        _a.sent();
                        return [4, Net.NetComm.DealyRandom(1000)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    Common.ExploreError = false;
    Common.ExploreErrorReLinkTime = null;
    return Common;
}());
//# sourceMappingURL=Common.js.map