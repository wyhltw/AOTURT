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
var ModalShower = (function () {
    function ModalShower() {
    }
    ModalShower.GetShipPic = function (ini, skincid) {
        if (skincid > 0) {
            var skin = Config.SkinDict.FirstOrDefault(function (c) { return c.SkinCID == skincid; });
            if (skin != null) {
                return "../Content/ShipImg/M_NORMAL_" + skin.Icon + ".png";
            }
        }
        if (ini == null)
            return "";
        var httpImg_ship = Config.ShipImg_Normal.FirstOrDefault(function (c) { return c.Key == ini.CID.toString(); });
        if (httpImg_ship != null) {
            return httpImg_ship.Value;
        }
        return "../Content/ShipImg/M_NORMAL_" + ini.PicId + ".png";
    };
    ;
    ModalShower.GetHeadPic = function (ini, skincid) {
        if (skincid > 0) {
            var skin = Config.SkinDict.FirstOrDefault(function (c) { return c.SkinCID == skincid; });
            if (skin != null) {
                return "../Content/ShipHeader/S_NORMAL_" + skin.Icon + ".png";
            }
        }
        if (ini == null)
            return "";
        var httpImg_ship = Config.ShipImg_Small.FirstOrDefault(function (c) { return c.Key == ini.CID.toString(); });
        if (httpImg_ship != null) {
            return httpImg_ship.Value;
        }
        return "../Content/ShipHeader/S_NORMAL_" + ini.PicId + ".png";
    };
    ;
    ModalShower.GetEmemyPic = function (ini) {
        if (ini == null)
            return "";
        var httpImg_ship = Config.ShipImg_Small.FirstOrDefault(function (c) { return c.Key == ini.CID.toString(); });
        if (httpImg_ship != null) {
            return httpImg_ship.Value;
        }
        return "../Content/ShipHeader/S_NORMAL_" + ini.PicId + ".png";
    };
    ;
    ModalShower.GetTypePic = function (ini) {
        if (ini == null)
            return "";
        return "../Content/ShipTypeName/" + ini.Type + ".png";
    };
    ;
    ModalShower.GetTypePicFromID = function (typeid) {
        return "../Content/ShipTypeName/" + typeid + ".png";
    };
    ;
    ModalShower.GetShipBackPic = function (ini) {
        if (ini == null)
            return "";
        return "../Content/images/ship_star_bg" + ((ini.Star >= 1 && ini.Star <= 6) ? ini.Star : 1) + "_136x248.png";
    };
    ;
    ModalShower.GetHeadBackPic = function (ini) {
        if (ini == null)
            return "";
        return "../Content/images/headship_star_bg" + ((ini.Star >= 1 && ini.Star <= 6) ? ini.Star : 1) + ".jpg";
    };
    ;
    ModalShower.GetHeadBackPicFromLevel = function (level) {
        return "../Content/images/headship_star_bg" + ((level >= 1 && level <= 6) ? level : 1) + ".jpg";
    };
    ;
    ModalShower.GetEquipPic = function (ini) {
        if (ini == null)
            return "";
        var httpImg_ship = Config.EquipImg_Large.FirstOrDefault(function (c) { return c.Key == ini.CID.toString(); });
        if (httpImg_ship != null) {
            return httpImg_ship.Value;
        }
        return "../Content/EquipImg/equip_large_" + ini.PicId + ".png";
    };
    ;
    ModalShower.GetEquipBackPic = function (ini) {
        if (ini == null)
            return "";
        return "../Content/images/eq_star_bg" + ((ini.Star >= 1 && ini.Star <= 6) ? ini.Star : 1) + "_40x40.png";
    };
    ;
    ModalShower.GetTacticPic = function (tacticsid) {
        var ini = Config.ShipTactics.FirstOrDefault(function (c) { return c.TacticsID == tacticsid; });
        if (ini == null)
            return "";
        return "../Content/Tactics/" + tacticsid + ".png";
    };
    ModalShower.SlideShipPickerQuick = function (filter, OnCheck, OnPick, fleetShipsIds, maxSelectCount, minSelectCount, mustRange) {
        if (mustRange === void 0) { mustRange = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _This, $SlideShipPicker, SelectedShipIds, ChangePicker, ReloadSelect, listShips, TempEntityData, $SlideShipPickerrShips, $firstGroup, $nextGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        if (_This.SlideShipPickerQuickLocker == true)
                            return [2];
                        _This.SlideShipPickerQuickLocker = true;
                        $SlideShipPicker = $(doT.template($("#SlideShipPickerTemp").html())());
                        $SlideShipPicker.find(".modelheader [data-dismiss]").click(function () {
                            $SlideShipPicker.find(".shiplist .shipcell").slice(30).remove();
                            $SlideShipPicker.removeClass("slideInRight").addClass("slideOutRight");
                            setTimeout(function () {
                                $SlideShipPicker.remove();
                            }, 500);
                        });
                        $SlideShipPicker.find("#SerachText").keyup(function () {
                            var value = $(this).val();
                            if (value && !/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                                $SlideShipPicker.find(".shipcell[data-searchdata*=" + value + "]").show();
                                $SlideShipPicker.find(".shipcell:not([data-searchdata*=" + value + "])").hide();
                            }
                            else if (!/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                                $SlideShipPicker.find(".shipcell").show();
                            }
                            if ($SlideShipPicker.hasClass("range") == false) {
                            }
                        });
                        SelectedShipIds = new List();
                        ChangePicker = function (isRangePicker) {
                            $SlideShipPicker.toggleClass("range");
                            setTimeout(function () {
                                if (isRangePicker) {
                                    SelectedShipIds = NJson.DeepCopy(fleetShipsIds);
                                }
                                else {
                                    SelectedShipIds = new List();
                                }
                                ReloadSelect();
                            }, 30);
                        };
                        ReloadSelect = function () {
                            $SlideShipPicker.find(".select").remove();
                            SelectedShipIds.ForEach(function (c, index) {
                                var $Select = $("<div class=\"select\"><div class=\"cover\"></div><div class=\"selectIndex\">" + (index + 1) + "</div></div>");
                                var $cell = $SlideShipPicker.find(".shipcell[data-id=" + c + "] .bd").append($Select);
                            });
                        };
                        $SlideShipPicker.find(".changeRange").addClass("disabled").click(function () {
                            if ($(this).hasClass("disabled"))
                                return;
                            ChangePicker(true);
                        });
                        $SlideShipPicker.find(".cancel").click(function () {
                            ChangePicker(false);
                        });
                        $SlideShipPicker.find(".submit").click(function () {
                            if (SelectedShipIds.Length < minSelectCount) {
                                MessageBox.Show("最少选择" + minSelectCount + "艘");
                                return;
                            }
                            if (OnCheck(SelectedShipIds, true)) {
                                $SlideShipPicker.removeClass("slideInRight").addClass("slideOutRight");
                                setTimeout(function () {
                                    $SlideShipPicker.remove();
                                }, 500);
                                OnPick(SelectedShipIds, true);
                            }
                        });
                        $("body").append($SlideShipPicker);
                        PageScroll.BindScroll($("#slideShipPicker"), "滑动关闭舰船PICK窗体", function (ev) {
                        }, function (ev) {
                            return false;
                        }, function (ev) {
                        }, function (ev) {
                            var windowWidth = $(window).width();
                            if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                                $("#slideShipPicker").find(".modelheader [data-dismiss]").triggerHandler("click");
                            }
                        });
                        return [4, Sleep(500)];
                    case 1:
                        _a.sent();
                        listShips = new List();
                        fleetShipsIds = fleetShipsIds == null ? new List() : fleetShipsIds;
                        listShips.AddRange(Player.UserShipVo.Where(function (c) { return fleetShipsIds.Contains(c.id); }));
                        listShips.AddRange(Player.UserShipVo.Where(filter).Where(function (c) { return fleetShipsIds.Contains(c.id) == false; }));
                        listShips = listShips.Distinct();
                        return [4, Sleep(100)];
                    case 2:
                        _a.sent();
                        TempEntityData = listShips.Select(function (ship) {
                            var iniShip = Player.GetIniShip(ship);
                            return {
                                FleetShipIndex: fleetShipsIds.IndexOf(ship.id),
                                ID: ship.id,
                                Name: iniShip == null ? "未知" : iniShip.Name,
                                Level: ship.level,
                                Type: iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type],
                                TypeNum: iniShip == null ? 0 : iniShip.Type,
                                CID: ship.shipcid,
                                State: Player.GetShipStateContext(ship),
                                IsLocked: ship.islocked,
                                Married: ship.married,
                                HPNow: ship.battleprops.hp,
                                HPMax: ship.battlepropsmax.hp,
                                HPPercent: Math.floor(ship.battleprops.hp * 100 / ship.battlepropsmax.hp),
                                FleetID: ship.fleetid,
                                Star: iniShip == null ? 0 : iniShip.Star,
                                PicID: iniShip == null ? "" : iniShip.PicId,
                                ShipImg: _This.GetShipPic(iniShip, ship.skin_cid),
                                ShipBackImg: _This.GetShipBackPic(iniShip),
                                Create_time: ship.create_time,
                                SearchData: (iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type]) + "_" + (iniShip == null ? "未知" : iniShip.Name)
                            };
                        }).OrderBy(function (c) { return c.FleetShipIndex == -1 ? 999 : c.FleetShipIndex; }).ThenByDescending(function (c) { return c.Level; }).ThenBy(function (c) { return c.Type; }).ThenBy(function (c) { return c.CID; }).ThenBy(function (c) { return !c.IsLocked; });
                        return [4, Sleep(100)];
                    case 3:
                        _a.sent();
                        $SlideShipPickerrShips = $(doT.template($("#SlideShipPickerShipsTemp").html())({ LowEffect: SysLocalStorage.Get("LowEffect"), Ships: NJson.ObjListToArray(NJson.DeepCopy(TempEntityData)) }));
                        $SlideShipPickerrShips = $SlideShipPickerrShips.filter(".shipcell");
                        $SlideShipPickerrShips.children(".bd").click(function () {
                            var shipid = $(this).parent().attr("data-id").ToNumber();
                            if ($SlideShipPicker.hasClass("range")) {
                                if (SelectedShipIds.Contains(shipid)) {
                                    SelectedShipIds.Remove(shipid);
                                }
                                else if (SelectedShipIds.Count() < maxSelectCount) {
                                    SelectedShipIds.Add(shipid);
                                }
                                ReloadSelect();
                            }
                            else {
                                if (OnCheck(List.From([shipid]), false)) {
                                    $SlideShipPicker.removeClass("slideInRight").addClass("slideOutRight");
                                    setTimeout(function () {
                                        $SlideShipPicker.remove();
                                    }, 500);
                                    OnPick(List.From([shipid]), false);
                                }
                            }
                        });
                        $SlideShipPickerrShips.children(".name,.level").click(function () {
                            var shipid = $(this).parent().attr("data-id").ToNumber();
                            var $modal = ModalShower.ShowShipDetail(shipid);
                            $modal.css("z-index", "1082");
                            $modal.next().css("z-index", "1081");
                        });
                        $SlideShipPickerrShips.find(".bd img").error(function () {
                            $(this).remove();
                        });
                        $SlideShipPickerrShips.find(".bd .img").each(function (i, dom) {
                            var $bdimg = $(dom);
                            var bimg = $bdimg.attr("data-bimg");
                            if (bimg) {
                                var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                                $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                            }
                        });
                        $SlideShipPicker.find(".shiplist").html("");
                        $firstGroup = $SlideShipPickerrShips.slice(0, 30);
                        $nextGroup = $SlideShipPickerrShips.slice(30);
                        return [4, Sleep(100)];
                    case 4:
                        _a.sent();
                        $("#slideShipPicker").find(".shiplist").append($firstGroup.addClass("animated fadeIn"));
                        $SlideShipPicker.find(".changeRange").removeClass("disabled");
                        if (minSelectCount > 1 || mustRange == true) {
                            $SlideShipPicker.find(".changeRange").triggerHandler("click");
                        }
                        return [4, Sleep(500)];
                    case 5:
                        _a.sent();
                        $("#slideShipPicker").find(".shiplist").append($nextGroup);
                        $firstGroup.removeClass("animated fadeIn");
                        _This.SlideShipPickerQuickLocker = false;
                        return [2];
                }
            });
        });
    };
    ModalShower.ShowShipDetail = function (shipid) {
        return Dailog.CreatDialog({
            Title: Player.GetShipName(Player.GetShip(shipid)),
            FormNodes: List.From([]),
            AnimateIn: "slideInRight",
            AnimateOut: "slideOutRight",
            OnBuild: function ($modal) {
                $modal.find(".modal-footer").remove();
                $modal.find(".modal-dialog").css("animation-duration", "0.7s");
                $modal.addClass("modal_areaPanel_shipdocks");
                $modal.find(".modal-title").attr("data-cid", Player.GetShip(shipid).shipcid.toString());
                var reloadDetial = function () {
                    var ship = Player.GetShip(shipid);
                    $modal.find(".modal-title").html(Player.GetShipName(Player.GetShip(shipid)));
                    if (ship.islocked == 1) {
                        $('<i class="fa fa-lock"></i>').css({ "font-size": "6vw", "padding-left": "2vw" }).appendTo($modal.find(".modal-title"));
                    }
                    else {
                        $('<i class="fa fa-unlock-alt"></i>').css({ "font-size": "6vw", "padding-left": "2vw" }).appendTo($modal.find(".modal-title"));
                    }
                    var isLocking = false;
                    $modal.find(".modal-title i").click(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (isLocking == true) {
                                            return [2];
                                        }
                                        if (!(ship.islocked == 1)) return [3, 1];
                                        MessageBox.Confirm("确定解锁？</br>解锁后可能会被误分解！", function () {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var result;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            isLocking = true;
                                                            return [4, Net.Dock.LockBoat(shipid)];
                                                        case 1:
                                                            result = _a.sent();
                                                            if (result.ErrorCode != 0) {
                                                                MessageBox.Show(result.ErrorMessage);
                                                            }
                                                            isLocking = false;
                                                            reloadDetial();
                                                            return [2];
                                                    }
                                                });
                                            });
                                        });
                                        return [3, 3];
                                    case 1:
                                        isLocking = true;
                                        return [4, Net.Dock.LockBoat(shipid)];
                                    case 2:
                                        result = _a.sent();
                                        if (result.ErrorCode != 0) {
                                            MessageBox.Show(result.ErrorMessage);
                                        }
                                        isLocking = false;
                                        reloadDetial();
                                        _a.label = 3;
                                    case 3: return [2];
                                }
                            });
                        });
                    });
                    var shipTactics = List.From([ship.tactics[1].toString().ToNumber() > 0 ? ship.tactics[1].toString().ToNumber() : 0, ship.tactics[2].toString().ToNumber() > 0 ? ship.tactics[2].toString().ToNumber() : 0, ship.tactics[3].toString().ToNumber() > 0 ? ship.tactics[3].toString().ToNumber() : 0]);
                    var detialDOTData = {
                        ship: NJson.ObjListToArray(NJson.DeepCopy(ship)),
                        Equipment: ship.equipmentarr.Select(function (c) {
                            var eq = Player.GetIniEquipment(c);
                            return eq == null ? { CID: 0, Title: "", EquipImg: "", EquipBackImg: "" } : { CID: eq.CID, Title: eq.Title, EquipImg: ModalShower.GetEquipPic(eq), EquipBackImg: ModalShower.GetEquipBackPic(eq) };
                        }),
                        Tactics: shipTactics.Where(function (c) { return c > 0 && Config.ShipTactics.FirstOrDefault(function (d) { return d.TacticsID == c; }) != null; }).Where(function (tacticsid) { return Player.Tactics.FirstOrDefault(function (c) { return c.boat_id == ship.id && c.tactics_id == tacticsid; }) != null; }).Select(function (tacticsid) {
                            var tcs = Player.Tactics.FirstOrDefault(function (c) { return c.boat_id == ship.id && c.tactics_id == tacticsid; });
                            var ini = Config.ShipTactics.FirstOrDefault(function (c) { return c.TacticsID == tacticsid; });
                            return {
                                Img: ModalShower.GetTacticPic(ini.TacticsID),
                                Title: ini.Title,
                                Exp: tcs.exp,
                                MaxExp: ini.LevelExp.Count() > tcs.level ? ini.LevelExp[tcs.level] : "-",
                                Level: tcs.level,
                                IsLearning: tcs.status == 1
                            };
                        }),
                    };
                    var $Detail = $(doT.template($(".commonmodal").find("[data-tempid='shipDeitalTemp']").html())(NJson.ObjListToArray(detialDOTData)));
                    $modal.find(".modal-body").html("").append($Detail);
                    $Detail.find("[data-bimg]").each(function (i, dom) {
                        var $bdimg = $(dom);
                        var bimg = $bdimg.attr("data-bimg");
                        if (bimg) {
                            var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                            $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                        }
                    });
                    $Detail.find(".equipments [data-action^=modifyEquipment]").click(function () {
                        var $equipcell = $(this);
                        var EqIndex = $(this).attr("data-action").split("|")[1].ToNumber();
                        var OldEqCID = $(this).attr("data-action").split("|")[2].ToNumber();
                        if (Player.IsYuanZhangShip(ship) || Player.IsMissionShip(ship) || Player.IsZhuShouShip(ship)) {
                            MessageBox.Show("该舰船当前不能更改装备");
                            return;
                        }
                        var withOutEquipmentIds = Player.EquipmentVO.Where(function (c) {
                            if (c.num <= 0)
                                return true;
                            if (c.equipmentcid == OldEqCID)
                                return true;
                            return Player.IsUnFitEquip(ship, c.equipmentcid);
                        }).Select(function (c) { return c.equipmentcid; });
                        ModalShower.SlideEquipPicker(Player.EquipmentVO.Where(function (c) { return !(withOutEquipmentIds.Contains(c.equipmentcid)); }), function (equipcid) {
                            return __awaiter(this, void 0, void 0, function () {
                                var changeResult, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(equipcid == 0)) return [3, 2];
                                            return [4, Net.Conditioning.RemoveEquipment(ship.id, EqIndex)];
                                        case 1:
                                            _a = _b.sent();
                                            return [3, 4];
                                        case 2: return [4, Net.Conditioning.ChangeEquipment(ship.id, equipcid, EqIndex)];
                                        case 3:
                                            _a = _b.sent();
                                            _b.label = 4;
                                        case 4:
                                            changeResult = _a;
                                            if (changeResult.ErrorCode != 0) {
                                                MessageBox.Show(changeResult.ErrorMessage);
                                            }
                                            else {
                                                reloadDetial();
                                            }
                                            return [2];
                                    }
                                });
                            });
                        }, OldEqCID != 0);
                    });
                };
                reloadDetial();
                var height = $modal.find(".modal-content").outerHeight();
                var wHeigt = $(window).height();
                $modal.find(".modal-dialog").css("margin-top", (wHeigt - height) / 2);
            },
            OnSubmit: function (fromJsonObj, $modal) {
            }
        });
    };
    ModalShower.SlideEquipPicker = function (listEquips, OnPick, Unload) {
        if (Unload === void 0) { Unload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _This, TempEntityData, $SlideEquipPicker;
            return __generator(this, function (_a) {
                _This = this;
                if (_This.SlideEquipPickerLocker == true)
                    return [2];
                _This.SlideEquipPickerLocker = true;
                TempEntityData = listEquips.Select(function (equip) {
                    var iniEquip = Player.GetIniEquipment(equip.equipmentcid);
                    return {
                        CID: equip.equipmentcid,
                        Name: iniEquip == null ? "未知" : iniEquip.Title,
                        Type: iniEquip == null ? "未知" : DBEnum.ENUM_EquipmentType[iniEquip.Type],
                        TypeNum: iniEquip == null ? 0 : iniEquip.Type,
                        IsLocked: equip.locked,
                        Star: iniEquip == null ? 0 : iniEquip.Star,
                        PicID: iniEquip == null ? "" : iniEquip.PicId,
                        NowNumber: equip.num,
                        TotalNumber: equip.num + Player.UserShipVo.Select(function (c) { return c.equipmentarr.Where(function (d) { return d == equip.equipmentcid; }).Count(); }).Sum(function (c) { return c; }),
                        EquipImg: _This.GetEquipPic(iniEquip),
                        EquipBackImg: _This.GetEquipBackPic(iniEquip),
                        SearchData: (iniEquip == null ? "未知" : DBEnum.ENUM_EquipmentType[iniEquip.Type]) + "_" + (iniEquip == null ? "未知" : iniEquip.Title)
                    };
                }).OrderByDescending(function (c) { return c.TypeNum; }).ThenBy(function (c) { return c.Star; }).ThenBy(function (c) { return c.CID; });
                $SlideEquipPicker = $(doT.template($("#SlideEquipPickerTemp").html())());
                $SlideEquipPicker.find(".modelheader [data-dismiss]").click(function () {
                    $SlideEquipPicker.removeClass("slideInRight").addClass("slideOutRight");
                    setTimeout(function () {
                        $SlideEquipPicker.remove();
                    }, 500);
                });
                $SlideEquipPicker.find("#SerachText").keyup(function () {
                    var value = $(this).val();
                    if (value && !/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                        $SlideEquipPicker.find(".equipcell[data-searchdata*=" + value + "]").show();
                        $SlideEquipPicker.find(".equipcell:not([data-searchdata*=" + value + "])").hide();
                    }
                    else if (!/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                        $SlideEquipPicker.find(".equipcell").show();
                    }
                });
                $("body").append($SlideEquipPicker);
                PageScroll.BindScroll($("#slideEquipPicker"), "滑动关闭装备PICK窗体", function (ev) {
                }, function (ev) {
                    return false;
                }, function (ev) {
                }, function (ev) {
                    var windowWidth = $(window).width();
                    if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                        $("#slideEquipPicker").find(".modelheader [data-dismiss]").triggerHandler("click");
                    }
                });
                setTimeout(function () {
                    var $SlideEquipPickerEquips = $(doT.template($("#SlideEquipPickerEquipsTemp").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                    $SlideEquipPickerEquips = $SlideEquipPickerEquips.filter(".equipcell");
                    $SlideEquipPickerEquips.children(".bd").click(function () {
                        var equipcid = $(this).parent().attr("data-cid").ToNumber();
                        if (OnPick) {
                            OnPick(equipcid);
                        }
                        $SlideEquipPicker.removeClass("slideInRight").addClass("slideOutRight");
                        setTimeout(function () {
                            $SlideEquipPicker.remove();
                        }, 500);
                    });
                    $SlideEquipPickerEquips.filter(".unload").click(function () {
                        var equipcid = $(this).attr("data-cid").ToNumber();
                        if (OnPick) {
                            OnPick(equipcid);
                        }
                        $SlideEquipPicker.removeClass("slideInRight").addClass("slideOutRight");
                        setTimeout(function () {
                            $SlideEquipPicker.remove();
                        }, 500);
                    });
                    $SlideEquipPickerEquips.children(".name").click(function () {
                        var equipcid = $(this).parent().attr("data-cid").ToNumber();
                        var equipini = Player.GetIniEquipment(equipcid);
                        Dailog.CreatDialog({
                            Title: equipini.Title,
                            FormNodes: List.From([]),
                            AnimateIn: "fadeIn",
                            AnimateOut: "fadeOut",
                            OnBuild: function ($modal) {
                                $modal.find(".modal-dialog").css("animation-duration", "0.4s");
                                $modal.find(".modal-footer").remove();
                                $modal.addClass("modal_areaPanel_equipdocks");
                                $modal.css("z-index", "1091");
                                $modal.next().css("z-index", "1090");
                                var detialDOTData = {
                                    CID: equipini.CID,
                                    HP: equipini.HP,
                                    Atk: equipini.Atk,
                                    Def: equipini.Def,
                                    Torpedo: equipini.Torpedo,
                                    Antisub: equipini.Antisub,
                                    AirDef: equipini.AirDef,
                                    AircraftAtk: equipini.AircraftAtk,
                                    Radar: equipini.Radar,
                                    Hit: equipini.Hit,
                                    Miss: equipini.Miss,
                                    Luck: equipini.Luck,
                                    AluminiumUse: equipini.AluminiumUse,
                                    Range: equipini.Range,
                                };
                                var $Detail = $(doT.template($("#PartialAreas").find("[data-tempid='equipDeitalTemp']").html())(detialDOTData));
                                $modal.find(".modal-body").html("").append($Detail);
                                var height = $modal.find(".modal-content").outerHeight();
                                var wHeigt = $(window).height();
                                $modal.find(".modal-dialog").css("margin-top", (wHeigt - height) / 2);
                            },
                            OnSubmit: function (fromJsonObj, $modal) {
                            }
                        });
                    });
                    $SlideEquipPickerEquips.find(".bd img").error(function () {
                        $(this).remove();
                    });
                    $SlideEquipPickerEquips.find(".bd .img").each(function (i, dom) {
                        var $bdimg = $(dom);
                        var bimg = $bdimg.attr("data-bimg");
                        if (bimg) {
                            var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                            $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                        }
                    });
                    $("#slideEquipPicker").find(".equiplist").html("");
                    setTimeout(function () {
                        $("#slideEquipPicker").find(".equiplist").append($SlideEquipPickerEquips);
                        $SlideEquipPickerEquips.fadeIn(300);
                        if (Unload == false) {
                            $SlideEquipPickerEquips.filter(".unload").hide();
                        }
                    }, 30);
                }, 700);
                _This.SlideEquipPickerLocker = false;
                return [2];
            });
        });
    };
    ModalShower.SlideShipPickerQuickLocker = false;
    ModalShower.SlideEquipPickerLocker = false;
    return ModalShower;
}());
//# sourceMappingURL=ModalShower.js.map