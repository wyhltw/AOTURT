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
var NetErrorRelinker = (function () {
    function NetErrorRelinker() {
    }
    NetErrorRelinker.CheckError = function (netResult) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((netResult.eid == -9998 || netResult.eid == -9999) && this.IsGameServerWeiHu == false)) return [3, 1];
                        this.IsGameServerWeiHu = true;
                        Logs.Print("游戏服务器维护中！", DBEnum.ENUM_NotificationType.游戏维护);
                        Logs.Print("正在停止所有进程...");
                        if (MissionWorker.State != DBEnum.WorkState.Ready) {
                            MissionWorker.Stop();
                        }
                        Logs.Print("操作成功，请关闭软件。");
                        return [3, 3];
                    case 1: return [4, this.CheckLostConnection(netResult)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    NetErrorRelinker.CheckLostConnection = function (netResult) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if ((netResult.eid == -9994 || netResult.eid == -9995 || netResult.eid == -9997) && this.IsLostConnection == false) {
                    this.IsLostConnection = true;
                    this.LostTime = NetDate.GetTimeSpanSecound();
                    Logs.Print("角色掉线", DBEnum.ENUM_NotificationType.角色掉线);
                    if (MissionWorker.State != DBEnum.WorkState.Ready) {
                        Logs.Print("正在停止任务...");
                        this.LostWork = new SavedMissionWork();
                        this.LostWork.MissionProgressNow = MissionWorker.MissionProgressNow;
                        this.LostWork.MissionProgressTotal = MissionWorker.MissionProgressTotal;
                        this.LostWork.IsDoQueue = QueueWorker.State == DBEnum.WorkState.Working;
                        MissionWorker.Stop();
                        Logs.Print("停止成功");
                    }
                    if (Config.PlayerConfig.AutoRelink) {
                        Logs.Print("断线重连 " + Config.PlayerConfig.AutoRelinkSecound + " 秒后重连");
                        this.RelinkTimer = new Timer();
                        this.RelinkTimer.Interval = 10000;
                        this.RelinkTimer.Elapsed = function () { return __awaiter(_this, void 0, void 0, function () {
                            var checkNetResult, Exception_1, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        this.RelinkTimer.Stop();
                                        if (this.IsRelinking)
                                            return [2];
                                        if (!((NetDate.GetTimeSpanSecound() - this.LostTime) >= (Config.PlayerConfig.AutoRelinkSecound + this.MoreWatingTime))) return [3, 10];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 9, , 10]);
                                        this.IsRelinking = true;
                                        return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/GetNetTime", {})];
                                    case 2:
                                        checkNetResult = _b.sent();
                                        if (!(checkNetResult.Code == 200)) return [3, 7];
                                        Logs.Print("断线重连 正在重连...");
                                        _b.label = 3;
                                    case 3:
                                        _b.trys.push([3, 5, , 6]);
                                        return [4, NetErrorRelinker.Relink()];
                                    case 4:
                                        if (_b.sent()) {
                                            Logs.Print("重连成功！");
                                            this.RelinkSuccess();
                                        }
                                        else {
                                            Logs.Print("重连失败！5分钟后重试.");
                                            this.MoreWatingTime += 300;
                                        }
                                        return [3, 6];
                                    case 5:
                                        Exception_1 = _b.sent();
                                        Logs.Print("重连失败！5分钟后重试.");
                                        this.MoreWatingTime += 300;
                                        return [3, 6];
                                    case 6: return [3, 8];
                                    case 7:
                                        Logs.Print("断线重连 当前网络未连接.");
                                        this.MoreWatingTime += 30;
                                        _b.label = 8;
                                    case 8: return [3, 10];
                                    case 9:
                                        _a = _b.sent();
                                        return [3, 10];
                                    case 10:
                                        if (this.IsLostConnection) {
                                            Logs.Print("\u65AD\u7EBF\u91CD\u8FDE " + ((Config.PlayerConfig.AutoRelinkSecound + this.MoreWatingTime) - (NetDate.GetTimeSpanSecound() - this.LostTime)) + " \u79D2\u540E\u91CD\u8FDE");
                                            this.RelinkTimer.Start();
                                        }
                                        return [2];
                                }
                            });
                        }); };
                        this.RelinkTimer.Start();
                    }
                }
                return [2];
            });
        });
    };
    NetErrorRelinker.RelinkSuccess = function () {
        if (this.LostWork != null && this.LostWork.MissionProgressNow < this.LostWork.MissionProgressTotal) {
            if (MissionWorker.State == DBEnum.WorkState.Ready) {
                Logs.Print("任务已重启 继续执行.");
                if (this.LostWork.IsDoQueue == true) {
                    QueueWorker.State = DBEnum.WorkState.Working;
                }
                MissionWorker.Start({ MissionProgressNow: this.LostWork.MissionProgressNow, MissionProgressTotal: this.LostWork.MissionProgressTotal });
            }
            else {
                Logs.Print("任务正在执行中.");
            }
        }
        this.IsLostConnection = false;
        this.IsRelinking = false;
        this.LostTime = 0;
        this.MoreWatingTime = 0;
        this.LostWork = null;
        try {
            this.RelinkTimer.Dispose();
            this.RelinkTimer = null;
        }
        catch (Exception) {
        }
    };
    NetErrorRelinker.Relink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _This, checkVerResult, loginWapResult, _a, _b, loginProt, loginResult, _c, _d, QuDaoLoginResult, _e, _f, loginWapResult, loginProt, loginResult, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _This = this;
                        if (!(Config.LoginUser.LoginArea != "QuDao")) return [3, 5];
                        return [4, NetHelper.HttpGetUTF8(Config.CheckVersionURL + Config.GameVersion + "/" + Config.Channel + "/" + Config.Market + "&version=" + Config.GameVersion + "&channel=" + Config.Channel + "&market=" + Config.Market, "")];
                    case 1:
                        checkVerResult = _j.sent();
                        _b = (_a = NJson).DeserializeOfType_ThenLower;
                        return [4, NetHelper.HttpGZIPPost(Config.FormatURL("http://" + Config.PassportLoginDomain + "/index/passportLogin/"), "username=" + Encrypt.Base64Encrypt(Config.LoginUser.LoginName) + "&pwd=" + Encrypt.Base64Encrypt(Config.LoginUser.Password), new List())];
                    case 2:
                        loginWapResult = _b.apply(_a, [(_j.sent()).ResponseString, new Net.LoginResult.PasswordLoginResult()]);
                        if (loginWapResult.eid != 0) {
                            return [2, false];
                        }
                        if (Config.LoginCookie == null) {
                            Config.LoginCookie = new List();
                        }
                        if (Config.LoginCookie.Where(function (c) { return c.Name == "hf_skey"; }).Count() == 0) {
                            Config.LoginCookie.Add({ Name: "hf_skey", Value: loginWapResult.hf_skey, Path: "/", Domain: Config.HttpHeader + Config.PassportLoginDomain });
                        }
                        else {
                            Config.LoginCookie.Replace(Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == "hf_skey"; }), { Name: "hf_skey", Value: loginWapResult.hf_skey, Path: "/", Domain: Config.HttpHeader + Config.PassportLoginDomain });
                        }
                        Config.LoginCookie.ForEach(function (ck) {
                            ck.Domain = Config.DataDomain.replace(Config.HttpHeader, "");
                        });
                        loginProt = Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == "hf_skey"; }).Value.SplitOutEmpty(".")[0];
                        _d = (_c = NJson).DeserializeOfType_ThenLower;
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL(Config.DataDomain + "/index/login/" + loginProt + "?" + Config.LoginQuery), "", Config.LoginCookie)];
                    case 3:
                        loginResult = _d.apply(_c, [(_j.sent()).ResponseString, { loginstatus: -1 }]);
                        if (loginResult.loginstatus != 1) {
                            return [2, false];
                        }
                        return [4, _This.InitUser()];
                    case 4:
                        if (_j.sent()) {
                            return [2, true];
                        }
                        else {
                            return [2, false];
                        }
                        return [3, 9];
                    case 5:
                        _f = (_e = NJson).DeserializeOfType;
                        return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/QuDaoLogin", { LoginName: Config.LoginUser.LoginName })];
                    case 6:
                        QuDaoLoginResult = _f.apply(_e, [(_j.sent()).ResponseString, {
                                ErrorCode: 0,
                                ErrorMessage: "",
                                LoginResult: new Net.LoginResult.PasswordLoginResult(),
                                Channel: "",
                                GameVersion: "",
                                PassportLoginDomain: "",
                                UserAgent: "",
                                Market: "",
                                LoginQuery: "",
                                CheckVersionURL: ""
                            }]);
                        if (QuDaoLoginResult.ErrorCode != 0 || QuDaoLoginResult.LoginResult.eid != 0) {
                            return [2, false];
                        }
                        loginWapResult = QuDaoLoginResult.LoginResult;
                        if (Config.LoginCookie == null) {
                            Config.LoginCookie = new List();
                        }
                        if (Config.LoginCookie.Where(function (c) { return c.Name == "hf_skey"; }).Count() == 0) {
                            Config.LoginCookie.Add({ Name: "hf_skey", Value: loginWapResult.hf_skey, Path: "/", Domain: Config.HttpHeader + Config.PassportLoginDomain });
                        }
                        else {
                            Config.LoginCookie.Replace(Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == "hf_skey"; }), { Name: "hf_skey", Value: loginWapResult.hf_skey, Path: "/", Domain: Config.HttpHeader + Config.PassportLoginDomain });
                        }
                        Config.LoginCookie.ForEach(function (ck) {
                            ck.Domain = Config.DataDomain.replace(Config.HttpHeader, "");
                        });
                        loginProt = Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == "hf_skey"; }).Value.SplitOutEmpty(".")[0];
                        _h = (_g = NJson).DeserializeOfType_ThenLower;
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL(Config.DataDomain + "/index/login/" + loginProt + "?" + Config.LoginQuery), "", Config.LoginCookie, false)];
                    case 7:
                        loginResult = _h.apply(_g, [(_j.sent()).ResponseString, { loginstatus: -1 }]);
                        if (loginResult.loginstatus != 1) {
                            return [2, false];
                        }
                        return [4, _This.InitUser()];
                    case 8:
                        if (_j.sent()) {
                            return [2, true];
                        }
                        else {
                            return [2, false];
                        }
                        _j.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    NetErrorRelinker.InitUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4, Net.Login.InitUserInfo()];
                    case 1:
                        _b.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/getPveData/"), "", Config.LoginCookie)];
                    case 2:
                        _b.sent();
                        return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pevent/getPveData/"), "", Config.LoginCookie)];
                    case 3:
                        _b.sent();
                        return [4, Net.Conditioning.GameReset()];
                    case 4:
                        _b.sent();
                        return [2, true];
                    case 5:
                        _a = _b.sent();
                        return [2, false];
                    case 6: return [2];
                }
            });
        });
    };
    NetErrorRelinker.IsLostConnection = false;
    NetErrorRelinker.IsGameServerWeiHu = false;
    NetErrorRelinker.IsRelinking = false;
    NetErrorRelinker.LostTime = 0;
    NetErrorRelinker.MoreWatingTime = 0;
    NetErrorRelinker.LostWork = null;
    NetErrorRelinker.RelinkTimer = null;
    return NetErrorRelinker;
}());
var SavedMissionWork = (function () {
    function SavedMissionWork() {
        this.IsDoQueue = false;
    }
    return SavedMissionWork;
}());
//# sourceMappingURL=NetErrorRelinker.js.map