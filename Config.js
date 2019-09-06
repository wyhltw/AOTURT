var Config = (function () {
    function Config() {
    }
    Object.defineProperty(Config, "NewGUID", {
        get: function () {
            var guid = "";
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
            }
            return guid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "HttpHeader", {
        get: function () {
            return Config.LoginUser.LoginArea == "JP" ? "https://" : "http://";
        },
        enumerable: true,
        configurable: true
    });
    Config.FormatURL = function (url) {
        var resultURL = url.replace("DataDomain", Config.DataDomain);
        resultURL += ("&t=" + NetDate.GetTimeSpan()) + ("&e=" + Config.NewGUID) + ("&version=" + Config.GameVersion) + ("&channel=" + Config.Channel) + "&gz=1" + ("&market=" + Config.Market);
        return resultURL;
    };
    Object.defineProperty(Config, "IsAPPPause", {
        get: function () {
            return SysLocalStorage.Get("AppBackgrounder") == "1";
        },
        enumerable: true,
        configurable: true
    });
    Config.OpenActions = "";
    Config.DebugActions = "";
    Config.DataDomain = "";
    Config.ServerHost = "";
    Config.GameVersion = "";
    Config.Channel = "";
    Config.Market = "";
    Config.LoginQuery = "";
    Config.PassportLoginDomain = "";
    Config.UserAgent = "";
    Config.CheckVersionURL = "";
    Config.LoginCookie = new List();
    Config.CurrentFleetID = 1;
    Config.CardNo = "";
    Config.IniShips = new List();
    Config.IniEmemyCard = new List();
    Config.IniShipEquipments = new List();
    Config.Cookbooks = new List();
    Config.ShipImg_Normal = new List();
    Config.ShipImg_Small = new List();
    Config.EquipImg_Large = new List();
    Config.ShipTactics = new List();
    Config.SkinDict = List.From([{ "SkinCID": 1000110151, "Icon": "11_1" }, { "SkinCID": 1000380151, "Icon": "38_1" }, { "SkinCID": 1000590251, "Icon": "59_2" }, { "SkinCID": 1000820151, "Icon": "82_1" }, { "SkinCID": 1001330151, "Icon": "133_1" }, { "SkinCID": 1000290151, "Icon": "29_1" }, { "SkinCID": 1001050151, "Icon": "105_1" }, { "SkinCID": 1001210151, "Icon": "121_1" }, { "SkinCID": 1000280151, "Icon": "28_1" }, { "SkinCID": 1000540151, "Icon": "54_1" }, { "SkinCID": 1000610151, "Icon": "61_1" }, { "SkinCID": 1000600151, "Icon": "60_1" }, { "SkinCID": 1001490151, "Icon": "149_1" }, { "SkinCID": 1001920151, "Icon": "192_1" }, { "SkinCID": 1001350151, "Icon": "135_1" }, { "SkinCID": 1002330151, "Icon": "233_1" }, { "SkinCID": 1001140151, "Icon": "114_1" }, { "SkinCID": 1001620151, "Icon": "162_1" }, { "SkinCID": 1001780151, "Icon": "178_1" }, { "SkinCID": 1001790151, "Icon": "179_1" }, { "SkinCID": 1001940151, "Icon": "194_1" }, { "SkinCID": 1001810151, "Icon": "181_1" }, { "SkinCID": 1000690151, "Icon": "69_1" }, { "SkinCID": 1000840151, "Icon": "84_1" }, { "SkinCID": 1000410151, "Icon": "41_1" }, { "SkinCID": 1000420151, "Icon": "42_1" }, { "SkinCID": 1001280151, "Icon": "128_1" }, { "SkinCID": 1002340151, "Icon": "234_1" }, { "SkinCID": 1000130151, "Icon": "13_1" }, { "SkinCID": 1001870151, "Icon": "187_1" }, { "SkinCID": 1000590151, "Icon": "59_1" }, { "SkinCID": 1001120151, "Icon": "112_1" }, { "SkinCID": 1001260151, "Icon": "126_1" }, { "SkinCID": 1001330251, "Icon": "133_2" }, { "SkinCID": 1000290251, "Icon": "29_2" }, { "SkinCID": 1002480151, "Icon": "248_1" }, { "SkinCID": 1000300151, "Icon": "30_1" }, { "SkinCID": 1000310151, "Icon": "31_1" }, { "SkinCID": 1001990151, "Icon": "199_1" }, { "SkinCID": 1000930151, "Icon": "93_1" }, { "SkinCID": 1000640251, "Icon": "64_2" }, { "SkinCID": 1000080151, "Icon": "8_1" }, { "SkinCID": 1001430151, "Icon": "143_1" }, { "SkinCID": 1000400151, "Icon": "40_1" }, { "SkinCID": 1000540251, "Icon": "54_2" }, { "SkinCID": 1000100151, "Icon": "10_1" }, { "SkinCID": 1000830151, "Icon": "83_1" }, { "SkinCID": 1000820251, "Icon": "82_2" }, { "SkinCID": 1001410151, "Icon": "141_1" }, { "SkinCID": 1001120251, "Icon": "112_2" }, { "SkinCID": 1002090251, "Icon": "209_2" }, { "SkinCID": 1001300151, "Icon": "130_1" }, { "SkinCID": 1001770151, "Icon": "177_1" }, { "SkinCID": 1000980151, "Icon": "98_1" }, { "SkinCID": 1002270151, "Icon": "227_1" }, { "SkinCID": 1001640151, "Icon": "164_1" }, { "SkinCID": 1000640151, "Icon": "64_1" }, { "SkinCID": 1000800151, "Icon": "80_1" }, { "SkinCID": 1002090151, "Icon": "209_1" }, { "SkinCID": 1002030151, "Icon": "203_1" }, { "SkinCID": 1001290151, "Icon": "129_1" }, { "SkinCID": 1000970251, "Icon": "97_2" }, { "SkinCID": 1000010151, "Icon": "1_1" }, { "SkinCID": 1000490151, "Icon": "49_1" }, { "SkinCID": 1000140151, "Icon": "14_1" }, { "SkinCID": 1000090151, "Icon": "9_1" }, { "SkinCID": 1000060151, "Icon": "6_1" }, { "SkinCID": 1000300251, "Icon": "30_2" }, { "SkinCID": 1000970151, "Icon": "97_1" }, { "SkinCID": 1001130151, "Icon": "113_1" }, { "SkinCID": 1001360151, "Icon": "136_1" }, { "SkinCID": 1001950151, "Icon": "195_1" }, { "SkinCID": 1002670151, "Icon": "267_1" }, { "SkinCID": 1000020151, "Icon": "2_1" }, { "SkinCID": 1001030151, "Icon": "103_1" }, { "SkinCID": 1001040151, "Icon": "104_1" }, { "SkinCID": 1001120351, "Icon": "112_3" }, { "SkinCID": 1001340151, "Icon": "134_1" }, { "SkinCID": 1000070151, "Icon": "7_1" }, { "SkinCID": 1001620251, "Icon": "162_2" }, { "SkinCID": 1002090351, "Icon": "209_3" }, { "SkinCID": 1002070151, "Icon": "207_1" }, { "SkinCID": 1003010151, "Icon": "301_1" }, { "SkinCID": 1002110151, "Icon": "211_1" }, { "SkinCID": 1001800151, "Icon": "180_1" }, { "SkinCID": 1000750151, "Icon": "75_1" }, { "SkinCID": 1000140251, "Icon": "14_2" }, { "SkinCID": 1000460151, "Icon": "46_1" }, { "SkinCID": 1002750151, "Icon": "275_1" }, { "SkinCID": 1002980151, "Icon": "298_1" }, { "SkinCID": 1000050151, "Icon": "5_1" }, { "SkinCID": 1000370151, "Icon": "37_1" }, { "SkinCID": 1001110151, "Icon": "111_1" }, { "SkinCID": 1001880151, "Icon": "188_1" }, { "SkinCID": 1002350151, "Icon": "235_1" }, { "SkinCID": 1003060151, "Icon": "306_1" }, { "SkinCID": 1003080151, "Icon": "308_1" }, { "SkinCID": 1000180151, "Icon": "18_1" }, { "SkinCID": 1002190151, "Icon": "219_1" }, { "SkinCID": 1002200151, "Icon": "220_1" }, { "SkinCID": 1002280151, "Icon": "228_1" }, { "SkinCID": 1000450151, "Icon": "45_1" }, { "SkinCID": 1000730151, "Icon": "73_1" }, { "SkinCID": 1001090151, "Icon": "109_1" }, { "SkinCID": 1001210251, "Icon": "121_2" }, { "SkinCID": 1002050151, "Icon": "205_1" }, { "SkinCID": 1002760151, "Icon": "276_1" }, { "SkinCID": 1003220151, "Icon": "322_1" }, { "SkinCID": 1003140151, "Icon": "314_1" }, { "SkinCID": 1001420151, "Icon": "142_1" }, { "SkinCID": 1000690251, "Icon": "69_2" }, { "SkinCID": 1002640151, "Icon": "264_1" }, { "SkinCID": 1003230151, "Icon": "323_1" }, { "SkinCID": 1000610251, "Icon": "61_2" }, { "SkinCID": 1000600251, "Icon": "60_2" }, { "SkinCID": 1003250151, "Icon": "325_1" }]);
    Config.PlayerConfig = null;
    Config.PlayerStatistics = null;
    Config.AwardShipCID = "";
    Config.MoreSetting = null;
    Config.PVEShipSources = "";
    Config.LastHTTPRequest = new List();
    return Config;
}());
var LoginUser = (function () {
    function LoginUser() {
        this.LoginArea = "";
        this.LoginName = "";
        this.Password = "";
        this.ServerName = "";
    }
    return LoginUser;
}());
var NetDate = (function () {
    function NetDate() {
    }
    NetDate.GetTimeSpan = function () {
        return new Date().getTime() - this.PastMilliSecond + this.AddMinutes * 60 * 1000;
    };
    NetDate.GetTimeSpanSecound = function () {
        return Math.floor(this.GetTimeSpan() / 1000);
    };
    NetDate.PastMilliSecond = 0;
    NetDate.AddMinutes = Math.ceil(SysLocalStorage.Get("AddMinutes") ? parseFloat(SysLocalStorage.Get("AddMinutes")) : 0);
    return NetDate;
}());
var Encrypt = (function () {
    function Encrypt() {
    }
    Encrypt.Base64Encrypt = function (value) {
        return Base64.encode(value);
    };
    Encrypt.Base64Decrypt = function (value) {
        return Base64.decode(value);
    };
    return Encrypt;
}());
var PVEShipSource = (function () {
    function PVEShipSource() {
        this.MapID = "";
        this.NodeName = "";
        this.ShipCID = 0;
        this.Time = 0;
        this.ResultLevel = "";
        this.Important = 0;
    }
    return PVEShipSource;
}());
var IniModal;
(function (IniModal) {
    var IniShip = (function () {
        function IniShip() {
            this.CID = 0;
            this.Name = "";
            this.CanEVo = 0;
            this.EvoToCid = 0;
            this.EvoClass = 0;
            this.NPC = 0;
            this.Type = 0;
            this.StrengthenTop = new Strengthen();
            this.StrengthenSupplyExp = new Strengthen();
            this.PicId = "";
            this.Star = 0;
            this.Country = 0;
            this.EquipmentType = new List();
            this.RepairTime = 0;
        }
        return IniShip;
    }());
    IniModal.IniShip = IniShip;
    var EmemyCard = (function () {
        function EmemyCard() {
            this.CID = 0;
            this.Star = 0;
            this.PicId = "";
        }
        return EmemyCard;
    }());
    IniModal.EmemyCard = EmemyCard;
    var Strengthen = (function () {
        function Strengthen() {
            this.ATK = 0;
            this.Torpedo = 0;
            this.Air_Def = 0;
            this.Def = 0;
        }
        return Strengthen;
    }());
    IniModal.Strengthen = Strengthen;
    var IniShipEquipment = (function () {
        function IniShipEquipment() {
            this.CID = 0;
            this.Title = "";
            this.Type = 0;
            this.HP = 0;
            this.Atk = 0;
            this.Def = 0;
            this.Torpedo = 0;
            this.Antisub = 0;
            this.AirDef = 0;
            this.AircraftAtk = 0;
            this.Radar = 0;
            this.Hit = 0;
            this.Range = 0;
            this.Miss = 0;
            this.Correction = 0;
            this.Luck = 0;
            this.Star = 0;
            this.PicId = "";
            this.ShipCID = new List();
            this.ShipType = new List();
            this.SpecialEffect = 0;
            this.AluminiumUse = 0;
        }
        return IniShipEquipment;
    }());
    IniModal.IniShipEquipment = IniShipEquipment;
    var CookBook = (function () {
        function CookBook() {
            this.CID = "";
            this.Icon = "";
            this.Title = "";
            this.Country = 0;
            this.Star = 0;
            this.Oil = 0;
            this.Ammo = 0;
            this.Steel = 0;
            this.Aluminium = 0;
            this.Desc = "";
            this.EffectTime = 0;
            this.EffectDesc = "";
        }
        return CookBook;
    }());
    IniModal.CookBook = CookBook;
    var ShipTactic = (function () {
        function ShipTactic() {
            this.TacticsID = 0;
            this.LevelExp = new List();
            this.Title = "";
            this.ShipTon = 0;
            this.NeedLevel = 0;
        }
        return ShipTactic;
    }());
    IniModal.ShipTactic = ShipTactic;
    var PlayerConfig = (function () {
        function PlayerConfig() {
            this.LoginName = "";
            this.ServerName = "";
            this.LastUpdateTime = 0;
            this.AutoAward = false;
            this.AutoDismantleShip = false;
            this.AutoRelink = false;
            this.AutoRelinkSecound = 900;
            this.AutoExplore = false;
            this.AutoLockShip = false;
            this.SkipFight = false;
            this.SkipFightSeconds = 0;
            this.RandomDealy = false;
            this.AutoStrengthen = false;
            this.CustomPVEMaps = new List();
            this.CustomPevQueues = new List();
            this.ForcelockCIDS = new List();
            this.AutoStrengthenShipIDS = new List();
            this.AutoChangeShips = new List();
            this.AutoDismantleSetting = new AutoDismantleSetting();
            this.PlayerHabit = new Habit();
            this.ScheduledTasks = new List();
        }
        return PlayerConfig;
    }());
    IniModal.PlayerConfig = PlayerConfig;
    var CustomPVEMap = (function () {
        function CustomPVEMap() {
            this.CustiomPVEID = "";
            this.ChallengeID = "";
            this.WorkName = "";
            this.Remark = "";
            this.RepairLevel = 0;
            this.Paths = new List();
        }
        return CustomPVEMap;
    }());
    IniModal.CustomPVEMap = CustomPVEMap;
    var Path = (function () {
        function Path() {
            this.Nodes = new List();
        }
        return Path;
    }());
    IniModal.Path = Path;
    var Node = (function () {
        function Node() {
            this.Name = "";
            this.NodeNo = "";
            this.Action = 0;
            this.FightNight = 0;
            this.Formation = 1;
            this.OnlyFight = new List();
            this.SLFilter = new List();
        }
        return Node;
    }());
    IniModal.Node = Node;
    var CustomPevQueue = (function () {
        function CustomPevQueue() {
            this.QueueID = "";
            this.QueueName = "";
            this.SuccessClear = false;
            this.Nodes = new List();
        }
        return CustomPevQueue;
    }());
    IniModal.CustomPevQueue = CustomPevQueue;
    var CustomPevQueueNode = (function () {
        function CustomPevQueueNode() {
            this.WorkID = "";
            this.FleetID = 0;
            this.IsForbidden = false;
            this.IsCurrent = false;
            this.SurplusWorkNumber = 0;
            this.TotalWorkNumber = 0;
            this.StopOnNewShip = false;
            this.QianTingDanHeng = false;
            this.IsAutoChangeShip = false;
        }
        return CustomPevQueueNode;
    }());
    IniModal.CustomPevQueueNode = CustomPevQueueNode;
    var ScheduledTask = (function () {
        function ScheduledTask() {
            this.TaskID = "";
            this.TaskType = "";
            this.MissionID = "";
            this.Mission_FleetID = 0;
            this.Mission_TotalWorkNumber = 0;
            this.Mission_StopOnNewShip = false;
            this.Mission_QianTingDanHeng = false;
            this.Mission_IsAutoChangeShip = false;
            this.YanXi_FleetID = 0;
            this.YanXi_Formation = 0;
            this.YanXi_FightNight = 0;
            this.YanXi_UnFightQianTing = false;
            this.ZhanYi_CampaignID = 0;
            this.ZhanYi_Formation = 0;
            this.ZhanYi_RepairLevel = 0;
            this.ZhanYi_FightNight = 0;
            this.QueueID = "";
            this.LastRunTimeSpan = 0;
            this.TntervalType = "";
            this.TntervalDayHour = 0;
            this.TntervalDayMinutes = 0;
            this.TntervalWeek = 0;
            this.IsActive = false;
        }
        return ScheduledTask;
    }());
    IniModal.ScheduledTask = ScheduledTask;
    var Habit = (function () {
        function Habit() {
            this.YanXi_FleetID = 0;
            this.YanXi_Formation = 0;
            this.YanXi_FightNight = 0;
            this.Friend_FleetID = 0;
            this.Friend_Formation = 0;
            this.Friend_FightNight = 0;
            this.ZhanYi_CampaignID = 0;
            this.ZhanYi_Formation = 0;
            this.ZhanYi_RepairLevel = 0;
            this.ZhanYi_FightNight = 0;
        }
        return Habit;
    }());
    IniModal.Habit = Habit;
    var AutoChangeShip = (function () {
        function AutoChangeShip() {
            this.ShipID = 0;
            this.PostionIndexs = new List();
        }
        return AutoChangeShip;
    }());
    IniModal.AutoChangeShip = AutoChangeShip;
    var AutoDismantleSetting = (function () {
        function AutoDismantleSetting() {
            this.AllowTypes = new List();
            this.DisNumber = 8;
            this.UnloadEquip = false;
        }
        return AutoDismantleSetting;
    }());
    IniModal.AutoDismantleSetting = AutoDismantleSetting;
    var PlayerStatistics = (function () {
        function PlayerStatistics() {
            this.LastUpdateTime = 0;
            this.DayGetShipCount = 0;
            this.DayGetSpoilsCount = 0;
            this.DayGetYuanZheng_Oil = 0;
            this.DayGetYuanZheng_Ammo = 0;
            this.DayGetYuanZheng_Steel = 0;
            this.DayGetYuanZheng_Aluminium = 0;
            this.DayGetYuanZheng_RepairNum = 0;
            this.DayGetYuanZheng_KuanJianNum = 0;
            this.DayGetYuanZheng_EquipTuZhiNum = 0;
            this.DayGetYuanZheng_ShipTuZhiNum = 0;
        }
        return PlayerStatistics;
    }());
    IniModal.PlayerStatistics = PlayerStatistics;
    var Dict = (function () {
        function Dict() {
            this.Key = "";
            this.Value = "";
        }
        return Dict;
    }());
    IniModal.Dict = Dict;
    var MoreSetting = (function () {
        function MoreSetting() {
            this.LastUpdateTime = 0;
            this.HideDefaultMissions = new List();
            this.KeepMustShip = false;
            this.StopOnDayGetShipLimit = false;
            this.StopOnLowQuickRepair = false;
            this.StopOnLowQuickRepairNumber = 100;
            this.StopOnMaxLevel = false;
            this.StopOnGetForceShip = false;
            this.StopOnGetNewShip = true;
            this.QianTingDanHeng = false;
            this.InitTodayReflash = true;
            this.DarkSteel = false;
            this.AutoStrengthenSetting = new AutoStrengthenSetting();
            this.ExpertPVESettings = new List();
            this.AutoRepair = false;
            this.AutoRepair_Order = "TimeAsc";
            this.AutoRepair_Leisure = true;
            this.AutoRepair_LeisureDealyMinute = 5;
            this.AutoRepair_MinutesMin = 0;
            this.AutoRepair_MinutesMax = 600;
            this.QueueStepNext = false;
            this.MissionWorkSpeed = false;
            this.MissionWorkSpeedLevel = 0;
            this.CustomNotification = "";
            this.RepairRubDown = false;
            this.AutoLiaoLi = false;
        }
        return MoreSetting;
    }());
    IniModal.MoreSetting = MoreSetting;
    var AutoStrengthenSetting = (function () {
        function AutoStrengthenSetting() {
            this.CheckAttrOrder = List.From([2, 4, 1, 3]);
            this.OverAtk = 20;
            this.AllowAtkTypes = List.From([7, 6, 4, 10]);
            this.OverTorpedo = 20;
            this.AllowTorpedoTypes = List.From([12, 10]);
            this.OverDef = 20;
            this.AllowDefTypes = List.From([12, 10, 7, 2, 6, 4]);
            this.OverAirDef = 20;
            this.AllowAirDefTypes = List.From([10, 12, 7, 2, 6, 4]);
            this.OrderByStrengthenShip = 10;
            this.SkillLevelUp = true;
            this.DockFreeNumber = 0;
            this.UseQinXunFirst = true;
        }
        return AutoStrengthenSetting;
    }());
    IniModal.AutoStrengthenSetting = AutoStrengthenSetting;
    var ExpertPVE = (function () {
        function ExpertPVE() {
            this.CustiomPVEID = "";
            this.CanChangeShips = false;
            this.CanChangeEquip = false;
            this.CanChangeRepairLevel = false;
            this.AssignShips = new List();
            this.IsBathChange = false;
            this.IsLevelChange = false;
            this.IsUnloadEquip = false;
            this.AutoSetEquips = new List();
            this.RepairTypes = new List();
            this.StopOnMaxLevel = false;
        }
        return ExpertPVE;
    }());
    IniModal.ExpertPVE = ExpertPVE;
})(IniModal || (IniModal = {}));
var DBEnum;
(function (DBEnum) {
    var ENUM_ShipType;
    (function (ENUM_ShipType) {
        ENUM_ShipType[ENUM_ShipType["\u672A\u77E5"] = 0] = "\u672A\u77E5";
        ENUM_ShipType[ENUM_ShipType["\u822A\u6BCD"] = 1] = "\u822A\u6BCD";
        ENUM_ShipType[ENUM_ShipType["\u8F7B\u6BCD"] = 2] = "\u8F7B\u6BCD";
        ENUM_ShipType[ENUM_ShipType["\u88C5\u6BCD"] = 3] = "\u88C5\u6BCD";
        ENUM_ShipType[ENUM_ShipType["\u6218\u5217"] = 4] = "\u6218\u5217";
        ENUM_ShipType[ENUM_ShipType["\u822A\u6218"] = 5] = "\u822A\u6218";
        ENUM_ShipType[ENUM_ShipType["\u6218\u5DE1"] = 6] = "\u6218\u5DE1";
        ENUM_ShipType[ENUM_ShipType["\u91CD\u5DE1"] = 7] = "\u91CD\u5DE1";
        ENUM_ShipType[ENUM_ShipType["\u822A\u5DE1"] = 8] = "\u822A\u5DE1";
        ENUM_ShipType[ENUM_ShipType["\u96F7\u5DE1"] = 9] = "\u96F7\u5DE1";
        ENUM_ShipType[ENUM_ShipType["\u8F7B\u5DE1"] = 10] = "\u8F7B\u5DE1";
        ENUM_ShipType[ENUM_ShipType["\u91CD\u70AE"] = 11] = "\u91CD\u70AE";
        ENUM_ShipType[ENUM_ShipType["\u9A71\u9010"] = 12] = "\u9A71\u9010";
        ENUM_ShipType[ENUM_ShipType["\u6F5C\u6BCD"] = 13] = "\u6F5C\u6BCD";
        ENUM_ShipType[ENUM_ShipType["\u6F5C\u8247"] = 14] = "\u6F5C\u8247";
        ENUM_ShipType[ENUM_ShipType["\u70AE\u6F5C"] = 15] = "\u70AE\u6F5C";
        ENUM_ShipType[ENUM_ShipType["\u8865\u7ED9"] = 16] = "\u8865\u7ED9";
        ENUM_ShipType[ENUM_ShipType["\u5BFC\u9A71"] = 23] = "\u5BFC\u9A71";
    })(ENUM_ShipType = DBEnum.ENUM_ShipType || (DBEnum.ENUM_ShipType = {}));
    var ENUM_EnemyType;
    (function (ENUM_EnemyType) {
        ENUM_EnemyType[ENUM_EnemyType["\u672A\u77E5"] = 0] = "\u672A\u77E5";
        ENUM_EnemyType[ENUM_EnemyType["\u822A\u6BCD"] = 1] = "\u822A\u6BCD";
        ENUM_EnemyType[ENUM_EnemyType["\u8F7B\u6BCD"] = 2] = "\u8F7B\u6BCD";
        ENUM_EnemyType[ENUM_EnemyType["\u88C5\u6BCD"] = 3] = "\u88C5\u6BCD";
        ENUM_EnemyType[ENUM_EnemyType["\u6218\u5217"] = 4] = "\u6218\u5217";
        ENUM_EnemyType[ENUM_EnemyType["\u822A\u6218"] = 5] = "\u822A\u6218";
        ENUM_EnemyType[ENUM_EnemyType["\u6218\u5DE1"] = 6] = "\u6218\u5DE1";
        ENUM_EnemyType[ENUM_EnemyType["\u91CD\u5DE1"] = 7] = "\u91CD\u5DE1";
        ENUM_EnemyType[ENUM_EnemyType["\u822A\u5DE1"] = 8] = "\u822A\u5DE1";
        ENUM_EnemyType[ENUM_EnemyType["\u96F7\u5DE1"] = 9] = "\u96F7\u5DE1";
        ENUM_EnemyType[ENUM_EnemyType["\u8F7B\u5DE1"] = 10] = "\u8F7B\u5DE1";
        ENUM_EnemyType[ENUM_EnemyType["\u91CD\u70AE"] = 11] = "\u91CD\u70AE";
        ENUM_EnemyType[ENUM_EnemyType["\u9A71\u9010"] = 12] = "\u9A71\u9010";
        ENUM_EnemyType[ENUM_EnemyType["\u6F5C\u6BCD"] = 13] = "\u6F5C\u6BCD";
        ENUM_EnemyType[ENUM_EnemyType["\u6F5C\u8247"] = 14] = "\u6F5C\u8247";
        ENUM_EnemyType[ENUM_EnemyType["\u70AE\u6F5C"] = 15] = "\u70AE\u6F5C";
        ENUM_EnemyType[ENUM_EnemyType["\u8865\u7ED9"] = 16] = "\u8865\u7ED9";
        ENUM_EnemyType[ENUM_EnemyType["\u8981\u585E"] = 17] = "\u8981\u585E";
        ENUM_EnemyType[ENUM_EnemyType["\u673A\u573A"] = 18] = "\u673A\u573A";
        ENUM_EnemyType[ENUM_EnemyType["\u6E2F\u53E3"] = 19] = "\u6E2F\u53E3";
        ENUM_EnemyType[ENUM_EnemyType["\u5BFC\u9A71"] = 23] = "\u5BFC\u9A71";
        ENUM_EnemyType[ENUM_EnemyType["\u65D7\u8230"] = 99] = "\u65D7\u8230";
    })(ENUM_EnemyType = DBEnum.ENUM_EnemyType || (DBEnum.ENUM_EnemyType = {}));
    var ENUM_EquipmentType;
    (function (ENUM_EquipmentType) {
        ENUM_EquipmentType[ENUM_EquipmentType["\u672A\u77E5"] = 0] = "\u672A\u77E5";
        ENUM_EquipmentType[ENUM_EquipmentType["\u4E3B\u70AE"] = 1] = "\u4E3B\u70AE";
        ENUM_EquipmentType[ENUM_EquipmentType["\u526F\u70AE"] = 2] = "\u526F\u70AE";
        ENUM_EquipmentType[ENUM_EquipmentType["\u9C7C\u96F7"] = 3] = "\u9C7C\u96F7";
        ENUM_EquipmentType[ENUM_EquipmentType["\u653B\u51FB\u673A"] = 4] = "\u653B\u51FB\u673A";
        ENUM_EquipmentType[ENUM_EquipmentType["\u6218\u6597\u673A"] = 5] = "\u6218\u6597\u673A";
        ENUM_EquipmentType[ENUM_EquipmentType["\u8F70\u70B8\u673A"] = 6] = "\u8F70\u70B8\u673A";
        ENUM_EquipmentType[ENUM_EquipmentType["\u4FA6\u5BDF\u673A"] = 7] = "\u4FA6\u5BDF\u673A";
        ENUM_EquipmentType[ENUM_EquipmentType["\u96F7\u8FBE"] = 8] = "\u96F7\u8FBE";
        ENUM_EquipmentType[ENUM_EquipmentType["\u5F3A\u5316\u90E8\u4EF6"] = 9] = "\u5F3A\u5316\u90E8\u4EF6";
        ENUM_EquipmentType[ENUM_EquipmentType["\u70AE\u5F39"] = 10] = "\u70AE\u5F39";
        ENUM_EquipmentType[ENUM_EquipmentType["\u9632\u7A7A\u70AE"] = 11] = "\u9632\u7A7A\u70AE";
        ENUM_EquipmentType[ENUM_EquipmentType["\u7279\u6B8A\u6F5C\u8247"] = 12] = "\u7279\u6B8A\u6F5C\u8247";
        ENUM_EquipmentType[ENUM_EquipmentType["\u4FEE\u7406\u5458"] = 13] = "\u4FEE\u7406\u5458";
        ENUM_EquipmentType[ENUM_EquipmentType["\u53CD\u6F5C\u88C5\u5907"] = 14] = "\u53CD\u6F5C\u88C5\u5907";
        ENUM_EquipmentType[ENUM_EquipmentType["\u7279\u6B8A\u53D1\u5C04\u5668"] = 32] = "\u7279\u6B8A\u53D1\u5C04\u5668";
        ENUM_EquipmentType[ENUM_EquipmentType["\u53D1\u5C04\u5668"] = 33] = "\u53D1\u5C04\u5668";
        ENUM_EquipmentType[ENUM_EquipmentType["\u5BFC\u5F39"] = 34] = "\u5BFC\u5F39";
    })(ENUM_EquipmentType = DBEnum.ENUM_EquipmentType || (DBEnum.ENUM_EquipmentType = {}));
    var RepairLevel;
    (function (RepairLevel) {
        RepairLevel[RepairLevel["\u4FEE\u5927\u4E2D\u7834"] = 2] = "\u4FEE\u5927\u4E2D\u7834";
        RepairLevel[RepairLevel["\u53EA\u4FEE\u5927\u7834"] = 1] = "\u53EA\u4FEE\u5927\u7834";
        RepairLevel[RepairLevel["\u64E6\u4F24\u5FEB\u4FEE"] = 3] = "\u64E6\u4F24\u5FEB\u4FEE";
        RepairLevel[RepairLevel["\u4E0D\u4FEE\u7406"] = 0] = "\u4E0D\u4FEE\u7406";
        RepairLevel[RepairLevel["\u5927\u7834\u6CE1\u6FA1"] = 13] = "\u5927\u7834\u6CE1\u6FA1";
        RepairLevel[RepairLevel["\u4E2D\u7834\u6CE1\u6FA1"] = 14] = "\u4E2D\u7834\u6CE1\u6FA1";
        RepairLevel[RepairLevel["\u64E6\u4F24\u6CE1\u6FA1"] = 15] = "\u64E6\u4F24\u6CE1\u6FA1";
    })(RepairLevel = DBEnum.RepairLevel || (DBEnum.RepairLevel = {}));
    var Formation;
    (function (Formation) {
        Formation[Formation["\u5355\u7EB5\u9635"] = 1] = "\u5355\u7EB5\u9635";
        Formation[Formation["\u590D\u7EB5\u9635"] = 2] = "\u590D\u7EB5\u9635";
        Formation[Formation["\u8F6E\u884C\u9635"] = 3] = "\u8F6E\u884C\u9635";
        Formation[Formation["\u68AF\u5F62\u9635"] = 4] = "\u68AF\u5F62\u9635";
        Formation[Formation["\u5355\u6A2A\u9635"] = 5] = "\u5355\u6A2A\u9635";
    })(Formation = DBEnum.Formation || (DBEnum.Formation = {}));
    var WorkNodeAction;
    (function (WorkNodeAction) {
        WorkNodeAction[WorkNodeAction["\u6218\u6597\u70B9"] = 0] = "\u6218\u6597\u70B9";
        WorkNodeAction[WorkNodeAction["\u8D44\u6E90\u70B9"] = 1] = "\u8D44\u6E90\u70B9";
        WorkNodeAction[WorkNodeAction["\u8FC2\u56DE\u70B9_\u5931\u8D25\u6218\u6597"] = 2] = "\u8FC2\u56DE\u70B9_\u5931\u8D25\u6218\u6597";
        WorkNodeAction[WorkNodeAction["\u8FC2\u56DE\u70B9_\u5931\u8D25SL"] = 3] = "\u8FC2\u56DE\u70B9_\u5931\u8D25SL";
        WorkNodeAction[WorkNodeAction["\u5F85\u673A\u70B9"] = 4] = "\u5F85\u673A\u70B9";
    })(WorkNodeAction = DBEnum.WorkNodeAction || (DBEnum.WorkNodeAction = {}));
    var WorkState;
    (function (WorkState) {
        WorkState[WorkState["Ready"] = 0] = "Ready";
        WorkState[WorkState["Working"] = 1] = "Working";
    })(WorkState = DBEnum.WorkState || (DBEnum.WorkState = {}));
    var FleetName;
    (function (FleetName) {
        FleetName[FleetName["\u7B2C\u4E00\u8230\u961F"] = 1] = "\u7B2C\u4E00\u8230\u961F";
        FleetName[FleetName["\u7B2C\u4E8C\u8230\u961F"] = 2] = "\u7B2C\u4E8C\u8230\u961F";
        FleetName[FleetName["\u7B2C\u4E09\u8230\u961F"] = 3] = "\u7B2C\u4E09\u8230\u961F";
        FleetName[FleetName["\u7B2C\u56DB\u8230\u961F"] = 4] = "\u7B2C\u56DB\u8230\u961F";
        FleetName[FleetName["\u7B2C\u4E94\u8230\u961F"] = 5] = "\u7B2C\u4E94\u8230\u961F";
        FleetName[FleetName["\u7B2C\u516D\u8230\u961F"] = 6] = "\u7B2C\u516D\u8230\u961F";
        FleetName[FleetName["\u7B2C\u4E03\u8230\u961F"] = 7] = "\u7B2C\u4E03\u8230\u961F";
        FleetName[FleetName["\u7B2C\u516B\u8230\u961F"] = 8] = "\u7B2C\u516B\u8230\u961F";
    })(FleetName = DBEnum.FleetName || (DBEnum.FleetName = {}));
    var PackageType;
    (function (PackageType) {
        PackageType[PackageType["\u5FEB\u901F\u5EFA\u9020"] = 141] = "\u5FEB\u901F\u5EFA\u9020";
        PackageType[PackageType["\u5EFA\u9020\u84DD\u56FE"] = 241] = "\u5EFA\u9020\u84DD\u56FE";
        PackageType[PackageType["\u88C5\u5907\u84DD\u56FE"] = 741] = "\u88C5\u5907\u84DD\u56FE";
        PackageType[PackageType["\u5FEB\u901F\u4FEE\u7406"] = 541] = "\u5FEB\u901F\u4FEE\u7406";
        PackageType[PackageType["\u9A71\u9010\u6838\u5FC3"] = 10441] = "\u9A71\u9010\u6838\u5FC3";
        PackageType[PackageType["\u5DE1\u6D0B\u6838\u5FC3"] = 10341] = "\u5DE1\u6D0B\u6838\u5FC3";
        PackageType[PackageType["\u6218\u5217\u6838\u5FC3"] = 10241] = "\u6218\u5217\u6838\u5FC3";
        PackageType[PackageType["\u822A\u6BCD\u6838\u5FC3"] = 10141] = "\u822A\u6BCD\u6838\u5FC3";
        PackageType[PackageType["\u6F5C\u8247\u6838\u5FC3"] = 10541] = "\u6F5C\u8247\u6838\u5FC3";
        PackageType[PackageType["\u635F\u7BA1"] = 66641] = "\u635F\u7BA1";
    })(PackageType = DBEnum.PackageType || (DBEnum.PackageType = {}));
    var ZhanYiCampaign;
    (function (ZhanYiCampaign) {
        ZhanYiCampaign[ZhanYiCampaign["\u9A71\u9010\u7B80\u5355"] = 101] = "\u9A71\u9010\u7B80\u5355";
        ZhanYiCampaign[ZhanYiCampaign["\u9A71\u9010\u56F0\u96BE"] = 102] = "\u9A71\u9010\u56F0\u96BE";
        ZhanYiCampaign[ZhanYiCampaign["\u5DE1\u6D0B\u7B80\u5355"] = 201] = "\u5DE1\u6D0B\u7B80\u5355";
        ZhanYiCampaign[ZhanYiCampaign["\u5DE1\u6D0B\u56F0\u96BE"] = 202] = "\u5DE1\u6D0B\u56F0\u96BE";
        ZhanYiCampaign[ZhanYiCampaign["\u6218\u5217\u7B80\u5355"] = 301] = "\u6218\u5217\u7B80\u5355";
        ZhanYiCampaign[ZhanYiCampaign["\u6218\u5217\u56F0\u96BE"] = 302] = "\u6218\u5217\u56F0\u96BE";
        ZhanYiCampaign[ZhanYiCampaign["\u822A\u6BCD\u7B80\u5355"] = 401] = "\u822A\u6BCD\u7B80\u5355";
        ZhanYiCampaign[ZhanYiCampaign["\u822A\u6BCD\u56F0\u96BE"] = 401] = "\u822A\u6BCD\u56F0\u96BE";
        ZhanYiCampaign[ZhanYiCampaign["\u6F5C\u8247\u7B80\u5355"] = 501] = "\u6F5C\u8247\u7B80\u5355";
        ZhanYiCampaign[ZhanYiCampaign["\u6F5C\u8247\u56F0\u96BE"] = 502] = "\u6F5C\u8247\u56F0\u96BE";
    })(ZhanYiCampaign = DBEnum.ZhanYiCampaign || (DBEnum.ZhanYiCampaign = {}));
    var OrderByStrengthenShip;
    (function (OrderByStrengthenShip) {
        OrderByStrengthenShip[OrderByStrengthenShip["\u6309\u52A0\u5165\u987A\u5E8F"] = 10] = "\u6309\u52A0\u5165\u987A\u5E8F";
        OrderByStrengthenShip[OrderByStrengthenShip["\u9AD8\u8230\u8239\u7B49\u7EA7\u5148\u5F3A\u5316"] = 20] = "\u9AD8\u8230\u8239\u7B49\u7EA7\u5148\u5F3A\u5316";
        OrderByStrengthenShip[OrderByStrengthenShip["\u9AD8\u6280\u80FD\u7B49\u7EA7\u5148\u5F3A\u5316"] = 30] = "\u9AD8\u6280\u80FD\u7B49\u7EA7\u5148\u5F3A\u5316";
    })(OrderByStrengthenShip = DBEnum.OrderByStrengthenShip || (DBEnum.OrderByStrengthenShip = {}));
    var ENUM_NotificationType;
    (function (ENUM_NotificationType) {
        ENUM_NotificationType[ENUM_NotificationType["\u4EFB\u52A1\u51FA\u8239"] = 1000] = "\u4EFB\u52A1\u51FA\u8239";
        ENUM_NotificationType[ENUM_NotificationType["\u635E\u5230\u65B0\u8239"] = 1010] = "\u635E\u5230\u65B0\u8239";
        ENUM_NotificationType[ENUM_NotificationType["\u635E\u5230\u6307\u5B9A\u8239"] = 1020] = "\u635E\u5230\u6307\u5B9A\u8239";
        ENUM_NotificationType[ENUM_NotificationType["\u4EFB\u52A1\u5F00\u59CB"] = 1100] = "\u4EFB\u52A1\u5F00\u59CB";
        ENUM_NotificationType[ENUM_NotificationType["\u4EFB\u52A1\u7ED3\u675F"] = 1100] = "\u4EFB\u52A1\u7ED3\u675F";
        ENUM_NotificationType[ENUM_NotificationType["\u4FEE\u7406\u5B8C\u6210"] = 1200] = "\u4FEE\u7406\u5B8C\u6210";
        ENUM_NotificationType[ENUM_NotificationType["\u8FDC\u5F81\u5B8C\u6210"] = 1210] = "\u8FDC\u5F81\u5B8C\u6210";
        ENUM_NotificationType[ENUM_NotificationType["\u5EFA\u9020\u7ED3\u679C"] = 1300] = "\u5EFA\u9020\u7ED3\u679C";
        ENUM_NotificationType[ENUM_NotificationType["\u5EFA\u51FA\u505C\u6B62"] = 1310] = "\u5EFA\u51FA\u505C\u6B62";
        ENUM_NotificationType[ENUM_NotificationType["\u5EFA\u9020\u7ED3\u675F"] = 1320] = "\u5EFA\u9020\u7ED3\u675F";
        ENUM_NotificationType[ENUM_NotificationType["\u5F00\u53D1\u7ED3\u679C"] = 1340] = "\u5F00\u53D1\u7ED3\u679C";
        ENUM_NotificationType[ENUM_NotificationType["\u5F00\u53D1\u505C\u6B62"] = 1350] = "\u5F00\u53D1\u505C\u6B62";
        ENUM_NotificationType[ENUM_NotificationType["\u5F00\u53D1\u7ED3\u675F"] = 1360] = "\u5F00\u53D1\u7ED3\u675F";
        ENUM_NotificationType[ENUM_NotificationType["\u89D2\u8272\u6389\u7EBF"] = 1900] = "\u89D2\u8272\u6389\u7EBF";
        ENUM_NotificationType[ENUM_NotificationType["\u7F51\u7EDC\u65AD\u7EBF"] = 1920] = "\u7F51\u7EDC\u65AD\u7EBF";
        ENUM_NotificationType[ENUM_NotificationType["\u6E38\u620F\u7EF4\u62A4"] = 1930] = "\u6E38\u620F\u7EF4\u62A4";
        ENUM_NotificationType[ENUM_NotificationType["\u6240\u6709\u65E5\u5FD7"] = 9999] = "\u6240\u6709\u65E5\u5FD7";
    })(ENUM_NotificationType = DBEnum.ENUM_NotificationType || (DBEnum.ENUM_NotificationType = {}));
})(DBEnum || (DBEnum = {}));
//# sourceMappingURL=config.js.map