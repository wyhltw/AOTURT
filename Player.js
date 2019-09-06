var Player = (function () {
    function Player() {
    }
    Player.GetFleetShips = function (fleetid) {
        if (fleetid === void 0) { fleetid = 0; }
        var _This = this;
        var shipids = Player.FleetVo.FirstOrDefault(function (c) { return c.id == (fleetid == 0 ? Config.CurrentFleetID : fleetid); }).ships;
        var result = new List();
        shipids.ForEach(function (item) {
            result.Add(_This.UserShipVo.FirstOrDefault(function (c) { return c.id == item; }));
        });
        return result;
    };
    Player.GetShip = function (id) {
        return Player.UserShipVo.FirstOrDefault(function (c) { return c.id == id; });
    };
    Player.IsMustShip = function (ship) {
        var mustShip = Player.UserShipVo.Where(function (c) { return (c.shipcid == ship.shipcid || (c.shipcid == ship.shipcid + 1000000)); }).OrderByDescending(function (c) { return c.islocked; }).ThenByDescending(function (c) { return c.level; }).FirstOrDefault();
        return mustShip.id == ship.id;
    };
    Player.IsSameShip = function (ship1, ship2) {
        if (ship1 == null || ship2 == null) {
            return false;
        }
        if (ship1.shipcid == ship2.shipcid) {
            return true;
        }
        if ((ship1.shipcid + 1000000) == ship2.shipcid) {
            return true;
        }
        if ((ship2.shipcid + 1000000) == ship1.shipcid) {
            return true;
        }
        return false;
    };
    Player.IsAwardShip = function (ship) {
        var awardShipCIDS = Config.AwardShipCID.SplitOutEmpty(",").Select(function (c) { return c.toString(); });
        return awardShipCIDS.IndexOf(ship.shipcid.toString()) >= 0;
    };
    Player.IsUnFitEquip = function (ship, eqcid) {
        var ini = Player.GetIniEquipment(eqcid);
        if (ini == null)
            return true;
        if (ini.ShipCID.Count() > 0 && !ini.ShipCID.Contains(ship.shipcid.toString()))
            return true;
        if (ini.ShipType.Contains(Player.GetShipType(ship)) == false)
            return true;
        return false;
    };
    Player.GetShipName = function (ship) {
        var iniShip = Config.IniShips.FirstOrDefault(function (c) { return c.CID == ship.shipcid; });
        return iniShip == null ? ship.id.toString() : iniShip.Name;
    };
    Player.GetShipType = function (ship) {
        var iniShip = Config.IniShips.FirstOrDefault(function (c) { return c.CID == ship.shipcid; });
        try {
            return iniShip.Type;
        }
        catch (Exception) {
            return DBEnum.ENUM_ShipType.未知;
        }
    };
    Player.GetEquipment = function (cid) {
        return Player.EquipmentVO.FirstOrDefault(function (c) { return c.equipmentcid == cid; });
    };
    Player.GetEquipmentType = function (equip) {
        var iniShip = Config.IniShipEquipments.FirstOrDefault(function (c) { return c.CID == equip.equipmentcid; });
        try {
            return iniShip.Type;
        }
        catch (Exception) {
            return DBEnum.ENUM_EquipmentType.未知;
        }
    };
    Player.GetEquipmentName = function (equip) {
        var iniShip = Config.IniShipEquipments.FirstOrDefault(function (c) { return c.CID == equip.equipmentcid; });
        try {
            return iniShip.Title;
        }
        catch (Exception) {
            return "未知";
        }
    };
    Player.GetShipStateContext = function (ship) {
        return Player.IsRepairShip(ship) ? "修理中" : (Player.IsYuanZhangShip(ship) ? "远征中" : (Player.IsMissionShip(ship) ? "任务中" : (Player.IsZhuShouShip(ship) ? "驻守中" : "")));
    };
    Player.IsBusyShip = function (ship) {
        return Player.IsRepairShip(ship) || Player.IsYuanZhangShip(ship) || Player.IsMissionShip(ship) || Player.IsZhuShouShip(ship);
    };
    Player.IsUnModifyShip = function (ship) {
        return (!Player.IsYuanZhangShip(ship)) && (!Player.IsMissionShip(ship)) && (!Player.IsZhuShouShip(ship));
    };
    Player.IsRepairShip = function (ship) {
        var reapirShipids = Player.RepairDockVo.Where(function (c) { return c.locked == 0 && c.shipid > 0; }).Select(function (c) { return c.shipid; });
        return reapirShipids.Contains(ship.id);
    };
    Player.IsYuanZhangShip = function (ship) {
        var isYuanZhangShipids = new List();
        var yuanzhengFleets = Player.PveExploreVo.levels.Select(function (c) { return c.fleetid; });
        yuanzhengFleets.ForEach(function (f) {
            isYuanZhangShipids.AddRange(Player.GetFleetShips(f).Select(function (c) { return c.id; }));
        });
        return isYuanZhangShipids.Contains(ship.id);
    };
    Player.IsMissionShip = function (ship) {
        var isMissionShipids = new List();
        if (MissionWorker.State != DBEnum.WorkState.Ready) {
            isMissionShipids.AddRange(Player.GetFleetShips().Select(function (c) { return c.id; }));
        }
        return isMissionShipids.Contains(ship.id);
    };
    Player.IsZhuShouShip = function (ship) {
        var isZhuShouShipids = new List();
        var zhushouFleets = Player.FleetVo.Where(function (c) { return c.status == 2; }).Select(function (c) { return c.id; });
        zhushouFleets.ForEach(function (f) {
            isZhuShouShipids.AddRange(Player.GetFleetShips(f).Select(function (c) { return c.id; }));
        });
        return isZhuShouShipids.Contains(ship.id);
    };
    Player.GetIniShip = function (ship) {
        return ship ? Config.IniShips.FirstOrDefault(function (c) { return c.CID == ship.shipcid; }) : null;
    };
    Player.GetIniShipGroup = function (ships) {
        var _this = this;
        return ships.Select(function (c) { return ({ Ship: c, Ini: _this.GetIniShip(c) }); });
    };
    Player.GetIniEquipment = function (cid) {
        return Config.IniShipEquipments.FirstOrDefault(function (c) { return c.CID == cid; });
    };
    Player.GetTacticName = function (tacticid) {
        var ini = Config.ShipTactics.FirstOrDefault(function (c) { return c.TacticsID == tacticid; });
        return ini == null ? "" : ini.Title;
    };
    Player.UpdateShipVo = function (resultShipVo) {
        var _this = this;
        if (resultShipVo != null && resultShipVo != undefined) {
            resultShipVo.ForEach(function (ship) {
                var oShip = Player.UserShipVo.FirstOrDefault(function (c) { return c.id == ship.id; });
                _this.CopyToAll(ship, oShip);
            });
        }
    };
    Player.UpdateEquipmentVo = function (resultEquipVo) {
        var _this = this;
        if (resultEquipVo != null && resultEquipVo != undefined) {
            resultEquipVo.ForEach(function (equip) {
                var oEquip = Player.EquipmentVO.FirstOrDefault(function (c) { return c.equipmentcid == equip.equipmentcid; });
                if (oEquip == null) {
                    Player.EquipmentVO.Add(equip);
                }
                else {
                    _this.CopyToAll(equip, oEquip);
                }
            });
        }
    };
    Player.UpdateFleetVo = function (resultFleetVo) {
        var _this = this;
        if (resultFleetVo != null && resultFleetVo != undefined) {
            resultFleetVo.ForEach(function (fleet) {
                var oFleet = Player.FleetVo.FirstOrDefault(function (c) { return c.id == fleet.id; });
                _this.CopyToAll(fleet, oFleet);
            });
        }
    };
    Player.UpdateUserVo = function (resultUserResourceVo) {
        if (resultUserResourceVo != null && resultUserResourceVo != undefined) {
            this.CopyToAll(resultUserResourceVo, Player.User);
        }
    };
    Player.UpdatePackageVo = function (resultPackageVo) {
        var _this = this;
        if (resultPackageVo != null && resultPackageVo != undefined) {
            resultPackageVo.ForEach(function (pag) {
                var oPackage = Player.PackageVo.FirstOrDefault(function (c) { return c.itemcid == pag.itemcid; });
                if (oPackage == null) {
                    Player.PackageVo.Add(pag);
                }
                else {
                    _this.CopyToAll(pag, oPackage);
                }
            });
        }
    };
    Player.UpdatePveExplore = function (resultPveExplore) {
        if (resultPveExplore != null && resultPveExplore != undefined) {
            this.CopyToAll(resultPveExplore, Player.PveExploreVo);
        }
    };
    Player.UpdateCampaignInfo = function (resultCampaignInfo) {
        if (resultCampaignInfo != null && resultCampaignInfo != undefined) {
            this.CopyToAll(resultCampaignInfo, Player.CampaignInfo);
        }
    };
    Player.UpdateRepairDockVo = function (resultRepairDockVo) {
        if (resultRepairDockVo != null && resultRepairDockVo != undefined) {
            resultRepairDockVo.ForEach(function (resultDock) {
                var oDock = Player.RepairDockVo.FirstOrDefault(function (c) { return c.id == resultDock.id; });
                if (oDock == null) {
                    Player.RepairDockVo.Add(resultDock);
                }
                else {
                    Player.RepairDockVo.Replace(oDock, resultDock);
                }
            });
        }
    };
    Player.UpdateTaskVo = function (resultTaskVo) {
        if (resultTaskVo != null && resultTaskVo != undefined) {
            resultTaskVo.ForEach(function (task) {
                var oTask = Player.TaskVo.FirstOrDefault(function (c) { return c.taskcid == task.taskcid; });
                if (oTask == null) {
                    Player.TaskVo.Add(task);
                }
                else {
                    Player.TaskVo.Replace(oTask, task);
                }
            });
        }
    };
    Player.UpdateTactics = function (resultTactics) {
        if (resultTactics != null && resultTactics != undefined) {
            resultTactics.ForEach(function (rt) {
                var oDock = Player.Tactics.FirstOrDefault(function (c) { return c.boat_id == rt.boat_id && c.tactics_id == rt.tactics_id; });
                if (oDock == null) {
                    Player.Tactics.Add(rt);
                }
                else {
                    Player.Tactics.Replace(oDock, rt);
                }
            });
        }
    };
    Player.GetPackageNumber = function (packagetype) {
        var item = Player.PackageVo.FirstOrDefault(function (c) { return c.itemcid == packagetype; });
        return item == null ? 0 : item.num;
    };
    Player.GetRepairTime = function (ship) {
        var ini = Player.GetIniShip(ship);
        var random = (ini == null ? 1 : ini.RepairTime) * 5;
        var level = ship.level;
        var damage = (ship.battlepropsmax.hp - ship.battleprops.hp);
        var marridPV = ship.married == 1 ? 0.7 : 1;
        if (ship.level <= 11) {
            return Math.ceil((30 + level * random * damage) * marridPV);
        }
        else {
            return Math.ceil((30 + level * random * damage + random * damage * ((Math.floor(10 * Math.sqrt(level - 11)) / 5) + 10)) * marridPV);
        }
    };
    Player.CopyToAll = function (source, target) {
        if (source == null || target == null) {
            return;
        }
        for (var key in source) {
            if (typeof (source[key]) != "function") {
                if (typeof (target[key]) == "number" && typeof (source[key]) == "string") {
                    target[key] = parseFloat(source[key]);
                }
                else if (typeof (target[key]) == "string" && typeof (source[key]) == "number") {
                    target[key] = source[key].toString();
                }
                else if (source[key] != undefined) {
                    target[key] = source[key];
                }
            }
        }
    };
    Player.GetCombinationsNumber = function (list) {
        var com = Player.Combinations(NJson.ObjListToArray(list));
        var newlist = new List();
        if (com) {
            com.forEach(function (c) {
                var nl = new List();
                if (typeof (c) == "number") {
                    nl.Add(c);
                }
                else {
                    c.SplitOutEmpty(",,").ForEach(function (d) {
                        nl.Add(d.ToNumber());
                    });
                }
                newlist.Add(nl);
            });
        }
        return newlist;
    };
    Player.GetCombinationsString = function (list) {
        var com = Player.Combinations(NJson.ObjListToArray(list));
        var newlist = new List();
        if (com) {
            com.forEach(function (c) {
                var nl = new List();
                c.SplitOutEmpty(",,").ForEach(function (d) {
                    nl.Add(d);
                });
                newlist.Add(nl);
            });
        }
        return newlist;
    };
    Player.Combinations = function (arr) {
        var len = arr.length;
        if (len >= 2) {
            var len1 = arr[0].length;
            var len2 = arr[1].length;
            var lenBoth = len1 * len2;
            var items = new Array(lenBoth);
            var index = 0;
            for (var i = 0; i < len1; i++) {
                for (var j = 0; j < len2; j++) {
                    items[index] = arr[0][i] + ",," + arr[1][j];
                    index++;
                }
            }
            var newArr = new Array(len - 1);
            for (var i = 2; i < arr.length; i++) {
                newArr[i - 1] = arr[i];
            }
            newArr[0] = items;
            return Player.Combinations(newArr);
        }
        else {
            return arr[0];
        }
    };
    Player.Spoils = 0;
    Player.CanGainDayReward = -1;
    Player.TodayEat = false;
    return Player;
}());
var ShipGroup = (function () {
    function ShipGroup() {
    }
    return ShipGroup;
}());
//# sourceMappingURL=player.js.map