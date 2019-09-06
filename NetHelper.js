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
//HTTP结果
var ResponseData = /** @class */ (function () {
    function ResponseData(IsSuccess, Code, ResponseString, RequestURL, PostDataStr) {
        this.IsSuccess = IsSuccess;
        this.Code = Code;
        this.ResponseString = ResponseString;
        this.RequestURL = RequestURL;
        this.PostDataStr = PostDataStr;
    }
    return ResponseData;
}());
var Cookie = /** @class */ (function () {
    function Cookie() {
        this.Name = "";
        this.Value = "";
        this.Domain = "";
        this.Path = "/";
    }
    return Cookie;
}());
var NetHelper = /** @class */ (function () {
    function NetHelper() {
    }
    //将对象属性全部转为小写
    NetHelper.FNLower = function (obj) {
        var lowerCache = {};
        if (typeof (obj) === "string" || obj === null || typeof (obj) === "number" || typeof (obj) === "function")
            return obj;
        var l = obj.length;
        if (l) {
            l |= 0;
            var result = [];
            result.length = l;
            for (var i = 0; i < l; i++) {
                var newVal = obj[i];
                result[i] = typeof (newVal) === "string" ? newVal : NetHelper.FNLower(newVal);
            }
            return result;
        }
        else {
            var ret = {};
            for (var key in obj) {
                var keyStr = typeof (key) === "string" ? key : String(key);
                var newKey = lowerCache[keyStr];
                if (newKey === undefined) {
                    newKey = keyStr.toLowerCase();
                    lowerCache[keyStr] = newKey;
                }
                var newVal = obj[key];
                ret[newKey] = typeof (newVal) === "string" ? newVal : NetHelper.FNLower(newVal);
            }
            return ret;
        }
    };
    //字符串转比特数组
    NetHelper.StringToByte = function (str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            }
            else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    };
    // 比特数组转字符串
    NetHelper.ByteToString = function (arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var str = '', _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            }
            else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    };
    NetHelper._httppostutf8 = function (url, postDataStr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            //设置请求参数
                            var ajaxData = {};
                            postDataStr.SplitOutEmpty("&").Where(function (c) { return c.indexOf("=") > 0; }).ForEach(function (c) {
                                ajaxData[c.split("=")[0]] = c.split("=")[1];
                            });
                            api.ajax({
                                url: url,
                                method: "POST",
                                data: {
                                    values: ajaxData
                                }
                            }, function (ret, err) {
                                if (ret && JSON.stringify(ret).length > 2) {
                                    resolve(new ResponseData(true, 200, ret, url, postDataStr));
                                }
                                else {
                                    resolve(new ResponseData(false, -100, ret, url, postDataStr));
                                }
                            });
                        }
                        catch (ex) {
                            resolve(new ResponseData(true, -999, ex.message, url, postDataStr));
                        }
                    })];
            });
        });
    };
    /**
     * 访问服务器接口
     * @param url
     * @param postDataStr
     */
    NetHelper.HttpGetUTF8 = function (url, postDataStr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._httpgetutf8(url, postDataStr)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NetHelper._httpgetutf8 = function (url, postDataStr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            //设置请求参数
                            var ajaxData = {};
                            postDataStr.SplitOutEmpty("&").Where(function (c) { return c.indexOf("=") > 0; }).ForEach(function (c) {
                                ajaxData[c.split("=")[0]] = c.split("=")[1];
                            });
                            api.ajax({
                                url: url,
                                method: "GET",
                                data: {
                                    values: ajaxData
                                }
                            }, function (ret, err) {
                                if (ret && JSON.stringify(ret).length > 2) {
                                    resolve(new ResponseData(true, 200, ret, url, postDataStr));
                                }
                                else {
                                    resolve(new ResponseData(false, -100, ret, url, postDataStr));
                                }
                            });
                        }
                        catch (ex) {
                            resolve(new ResponseData(true, -999, ex.message, url, postDataStr));
                        }
                    })];
            });
        });
    };
    /**
     * token访问
     * @param url
     * @param jsonObj
     */
    NetHelper.HTTPTokenPost = function (url, jsonObj) {
        return __awaiter(this, void 0, void 0, function () {
            var token, keys, c, querystring, querystring;
            return __generator(this, function (_a) {
                token = TokenBuild.CreateToken(jsonObj);
                keys = [];
                for (c in jsonObj) {
                    keys.push(c.toString());
                }
                querystring = "";
                keys.forEach(function (key) {
                    querystring += (key + "=" + jsonObj[key] + "&");
                });
                querystring = querystring == "" ? "" : querystring.substring(0, querystring.length - 1);
                return [2 /*return*/, this.HttpPostUTF8(url, querystring + "&_token=" + token)];
            });
        });
    };
    /**
     * 访问服务器接口
     * @param url
     * @param postDataStr
     */
    NetHelper.HttpPostUTF8 = function (url, postDataStr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._httppostutf8(url, postDataStr)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NetHelper.HttpGZIPPost = function (url, postDataStr, cookie, longPoll) {
        if (longPoll === void 0) { longPoll = true; }
        return __awaiter(this, void 0, void 0, function () {
            var i, result, reLinkNetResult, waitSecound, checkNetResult, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(longPoll == true)) return [3 /*break*/, 13];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 5];
                        MissionWorker.CheckThreadSemaphore();
                        ZhanYiWorker.CheckThreadSemaphore();
                        YanXiWorker.CheckThreadSemaphore();
                        return [4 /*yield*/, this._HttpGZIPPost(url, postDataStr, cookie)];
                    case 2:
                        result = _a.sent();
                        if (result.IsSuccess) {
                            return [2 /*return*/, result];
                        }
                        return [4 /*yield*/, Sleep(2000)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        reLinkNetResult = null;
                        waitSecound = 0;
                        _a.label = 6;
                    case 6:
                        if (!true) return [3 /*break*/, 12];
                        MissionWorker.CheckThreadSemaphore();
                        ZhanYiWorker.CheckThreadSemaphore();
                        YanXiWorker.CheckThreadSemaphore();
                        if (!(waitSecound % 60 == 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/GetNetTime", {})];
                    case 7:
                        checkNetResult = _a.sent();
                        if (!(checkNetResult.Code == 200)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this._HttpGZIPPost(url, postDataStr, cookie)];
                    case 8:
                        result = _a.sent();
                        if (result.IsSuccess) {
                            reLinkNetResult = result;
                        }
                        else {
                            reLinkNetResult = new ResponseData(true, -888, "请求超时", url, postDataStr);
                        }
                        return [3 /*break*/, 12];
                    case 9:
                        Logs.Print("APP未能获取到网络 正在等待...");
                        _a.label = 10;
                    case 10: return [4 /*yield*/, Sleep(6 * 1000)];
                    case 11:
                        _a.sent();
                        waitSecound += 6;
                        return [3 /*break*/, 6];
                    case 12: return [2 /*return*/, reLinkNetResult];
                    case 13:
                        MissionWorker.CheckThreadSemaphore();
                        ZhanYiWorker.CheckThreadSemaphore();
                        YanXiWorker.CheckThreadSemaphore();
                        return [4 /*yield*/, this._HttpGZIPPost(url, postDataStr, cookie)];
                    case 14:
                        result = _a.sent();
                        if (result.IsSuccess) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, new ResponseData(true, -888, "请求超时", url, postDataStr)];
                        }
                        _a.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    NetHelper._HttpGZIPPost = function (url, postDataStr, cookie) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            if (api.systemType.toLowerCase() == "android") {
                                if (!NetHelper.HttpModule) {
                                    NetHelper.HttpModule = api.require("httpNetBuilder");
                                }
                                ;
                                //设置请求参数
                                var ajaxData = {};
                                postDataStr.SplitOutEmpty("&").Where(function (c) { return c.indexOf("=") > 0; }).ForEach(function (c) {
                                    ajaxData[c.split("=")[0]] = c.split("=")[1];
                                });
                                //设置请求头
                                var ajaxHeaders = {
                                    "Accept": "*/*",
                                    "Connection": "keep-alive",
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Accept-Language": "zh-cn",
                                    "Accept-Encoding": "gzip,deflate",
                                    "User-Agent": Config.UserAgent,
                                    "Cookie": cookie.Select(function (c) { return c.Name + "=" + c.Value; }).JoinToString(";")
                                };
                                //Logs.Debug("N3");
                                //请求超时提示
                                var AndroidCheckLostLink = Config.OpenActions.indexOf("AndroidCheckLostLink") >= 0;
                                var IsLostLink = false;
                                var ReadyPostUnLinkRequest = 0;
                                if (AndroidCheckLostLink == true) {
                                    ReadyPostUnLinkRequest = setTimeout(function () {
                                        IsLostLink = true;
                                        NetHelper.HttpModule = api.require("httpNetBuilder");
                                        Logs.Print("请求超时_1_" + ReadyPostUnLinkRequest);
                                        resolve(new ResponseData(true, -996, "请求超时", url, postDataStr));
                                    }, 1000 * 120);
                                }
                                NetHelper.HttpModule.httpRequestAsyn({
                                    "url": url,
                                    "type": "post",
                                    "data": ajaxData,
                                    "headers": ajaxHeaders
                                }, function (ret) {
                                    if (AndroidCheckLostLink == true) {
                                        clearTimeout(ReadyPostUnLinkRequest);
                                    }
                                    if (IsLostLink == false) {
                                        if (ret.ErrorCode == 0) {
                                            //设置Cookie
                                            var ResponseCookie = ret.ResponseHeaders["Set-Cookie"];
                                            if (ResponseCookie && ResponseCookie.indexOf("=") > 0 && ResponseCookie.indexOf("Path=/") > 0) {
                                                var key = ResponseCookie.split(';')[0].split("=")[0];
                                                var value = ResponseCookie.split(';')[0].split("=")[1];
                                                if (Config.LoginCookie == null) {
                                                    Config.LoginCookie = new List();
                                                }
                                                if (Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }) != null) {
                                                    Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }).Value = value;
                                                }
                                                else {
                                                    Config.LoginCookie.Add({ Name: key, Value: value, Path: "/", Domain: url.split('.com')[0] + ".com" });
                                                }
                                            }
                                            //bytes转文本
                                            var resultString = "";
                                            try {
                                                var bytes = ret.ResponseBytes;
                                                var inflate = new Zlib.Inflate(bytes);
                                                var plain = inflate.decompress();
                                                var resultString = NetHelper.ByteToString(plain);
                                                resolve(new ResponseData(true, 200, resultString, url, postDataStr));
                                            }
                                            catch (e) {
                                                resolve(new ResponseData(false, -997, "数据处理异常", url, postDataStr));
                                            }
                                        }
                                        else {
                                            resolve(new ResponseData(false, -998, "通信异常", url, postDataStr));
                                        }
                                    }
                                    else {
                                        Logs.Print("请求超时_2_" + ReadyPostUnLinkRequest);
                                    }
                                    //Logs.Debug("N5");
                                });
                            }
                            else if (api.systemType.toLowerCase() == "ios") {
                                if (!NetHelper.HttpModule) {
                                    NetHelper.HttpModule = api.require("iosHTTPNetBuilder");
                                }
                                ;
                                //设置请求参数
                                var ajaxData = {};
                                postDataStr.SplitOutEmpty("&").Where(function (c) { return c.indexOf("=") > 0; }).ForEach(function (c) {
                                    ajaxData[c.split("=")[0]] = c.split("=")[1];
                                });
                                //设置请求头
                                var ajaxHeaders = {
                                    "Accept": "*/*",
                                    "Connection": "keep-alive",
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Accept-Language": "zh-cn",
                                    "Accept-Encoding": "gzip,deflate",
                                    "User-Agent": Config.UserAgent,
                                    "Cookie": cookie.Select(function (c) { return c.Name + "=" + c.Value; }).JoinToString(";")
                                };
                                //请求超时提示
                                var IOSCheckLostLink = Config.OpenActions.indexOf("IOSCheckLostLink") >= 0;
                                var IsLostLink = false;
                                var ReadyPostUnLinkRequest = 0;
                                if (IOSCheckLostLink == true) {
                                    ReadyPostUnLinkRequest = setTimeout(function () {
                                        IsLostLink = true;
                                        NetHelper.HttpModule = api.require("iosHTTPNetBuilder");
                                        Logs.Print("请求超时_1_" + ReadyPostUnLinkRequest);
                                        resolve(new ResponseData(true, -996, "请求超时", url, postDataStr));
                                    }, 1000 * 120);
                                }
                                NetHelper.HttpModule.httpRequestAsyn({
                                    "url": url,
                                    "type": "post",
                                    "data": ajaxData,
                                    "headers": ajaxHeaders
                                }, function (ret) {
                                    if (IOSCheckLostLink == true) {
                                        clearTimeout(ReadyPostUnLinkRequest);
                                    }
                                    if (IsLostLink == false) {
                                        if (ret.ErrorCode == 0) {
                                            //console.log(ret.ResponseBytes.length);
                                            //console.log(ret.ResponseBytes);
                                            //设置Cookie
                                            var ResponseCookie = ret.ResponseHeaders["Set-Cookie"];
                                            if (ResponseCookie && ResponseCookie.indexOf("=") > 0 && ResponseCookie.indexOf("Path=/") > 0) {
                                                var key = ResponseCookie.split(';')[0].split("=")[0];
                                                var value = ResponseCookie.split(';')[0].split("=")[1];
                                                if (Config.LoginCookie == null) {
                                                    Config.LoginCookie = new List();
                                                }
                                                if (Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }) != null) {
                                                    Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }).Value = value;
                                                }
                                                else {
                                                    Config.LoginCookie.Add({ Name: key, Value: value, Path: "/", Domain: url.split('.com')[0] + ".com" });
                                                }
                                            }
                                            //bytes转文本
                                            var resultString = "";
                                            try {
                                                var bytes = ret.ResponseBytes;
                                                var inflate = new Zlib.Inflate(bytes);
                                                var plain = inflate.decompress();
                                                var resultString = NetHelper.ByteToString(plain);
                                                resolve(new ResponseData(true, 200, resultString, url, postDataStr));
                                            }
                                            catch (e) {
                                                resolve(new ResponseData(false, -997, "数据处理异常", url, postDataStr));
                                            }
                                        }
                                        else {
                                            resolve(new ResponseData(false, -998, "通信异常", url, postDataStr));
                                        }
                                    }
                                    else {
                                        Logs.Print("请求超时_2_" + ReadyPostUnLinkRequest);
                                    }
                                });
                            }
                            else {
                                var querystring = { URL: url };
                                querystring["DataStr"] = (postDataStr ? postDataStr : "");
                                querystring["CookieContext"] = NJson.Stringify(cookie);
                                api.ajax({
                                    url: "https://crt.letgowin.com/Data/HttpGZIPPost",
                                    method: "POST",
                                    dataType: "json",
                                    returnAll: true,
                                    data: {
                                        values: querystring
                                    }
                                }, function (ret, err) {
                                    if (ret && ret.statusCode == 200 && ret.body && ret.body.ErrorCode == 0) {
                                        if (url.indexOf("index/passportLogin") > 0) {
                                            var resultCookies = new List();
                                            (ret.body.Data.Cookies).forEach(function (c) {
                                                resultCookies.Add({ Name: c.Name, Value: c.Value, Path: "/", Domain: c.Domain });
                                            });
                                            Config.LoginCookie = resultCookies;
                                        }
                                        resolve(new ResponseData(true, 200, ret.body.Data.JsonString, url, postDataStr));
                                    }
                                    else {
                                        resolve(new ResponseData(false, -998, "通信异常", url, postDataStr));
                                    }
                                });
                            }
                        }
                        catch (ex) {
                            resolve(new ResponseData(true, -999, "处理异常", url, postDataStr));
                        }
                    })];
            });
        });
    };
    NetHelper.HttpGZIPGet = function (url, postDataStr, cookie, longPoll) {
        if (longPoll === void 0) { longPoll = true; }
        return __awaiter(this, void 0, void 0, function () {
            var i, result, reLinkNetResult, waitSecound, checkNetResult, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(longPoll == true)) return [3 /*break*/, 13];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 5];
                        MissionWorker.CheckThreadSemaphore();
                        ZhanYiWorker.CheckThreadSemaphore();
                        YanXiWorker.CheckThreadSemaphore();
                        return [4 /*yield*/, this._HttpGZIPGet(url, postDataStr, cookie)];
                    case 2:
                        result = _a.sent();
                        if (result.IsSuccess) {
                            return [2 /*return*/, result];
                        }
                        return [4 /*yield*/, Sleep(2000)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        reLinkNetResult = null;
                        waitSecound = 0;
                        _a.label = 6;
                    case 6:
                        if (!true) return [3 /*break*/, 12];
                        MissionWorker.CheckThreadSemaphore();
                        ZhanYiWorker.CheckThreadSemaphore();
                        YanXiWorker.CheckThreadSemaphore();
                        if (!(waitSecound % 60 == 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/GetNetTime", {})];
                    case 7:
                        checkNetResult = _a.sent();
                        if (!(checkNetResult.Code == 200)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this._HttpGZIPGet(url, postDataStr, cookie)];
                    case 8:
                        result = _a.sent();
                        if (result.IsSuccess) {
                            reLinkNetResult = result;
                        }
                        else {
                            reLinkNetResult = new ResponseData(true, -888, "请求超时", url, postDataStr);
                        }
                        return [3 /*break*/, 12];
                    case 9:
                        Logs.Print("APP未能获取到网络 正在等待...");
                        _a.label = 10;
                    case 10: return [4 /*yield*/, Sleep(6 * 1000)];
                    case 11:
                        _a.sent();
                        waitSecound += 6;
                        return [3 /*break*/, 6];
                    case 12: return [2 /*return*/, reLinkNetResult];
                    case 13:
                        MissionWorker.CheckThreadSemaphore();
                        ZhanYiWorker.CheckThreadSemaphore();
                        YanXiWorker.CheckThreadSemaphore();
                        return [4 /*yield*/, this._HttpGZIPGet(url, postDataStr, cookie)];
                    case 14:
                        result = _a.sent();
                        if (result.IsSuccess) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, new ResponseData(true, -888, "请求超时", url, postDataStr)];
                        }
                        _a.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    NetHelper._HttpGZIPGet = function (url, postDataStr, cookie) {
        if (cookie === void 0) { cookie = new List(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            if (api.systemType.toLowerCase() == "android") {
                                if (!NetHelper.HttpModule) {
                                    NetHelper.HttpModule = api.require("httpNetBuilder");
                                }
                                ;
                                //设置请求参数
                                var ajaxData = {};
                                postDataStr.SplitOutEmpty("&").Where(function (c) { return c.indexOf("=") > 0; }).ForEach(function (c) {
                                    ajaxData[c.split("=")[0]] = c.split("=")[1];
                                });
                                //设置请求头
                                var ajaxHeaders = {
                                    "Accept": "*/*",
                                    "Connection": "keep-alive",
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Accept-Language": "zh-cn",
                                    "Accept-Encoding": "gzip,deflate",
                                    "User-Agent": Config.UserAgent,
                                    "Cookie": cookie.Select(function (c) { return c.Name + "=" + c.Value; }).JoinToString(";")
                                };
                                //Logs.Debug("N7");
                                //请求超时提示
                                var AndroidCheckLostLink = Config.OpenActions.indexOf("AndroidCheckLostLink") >= 0;
                                var IsLostLink = false;
                                var ReadyPostUnLinkRequest = 0;
                                if (AndroidCheckLostLink == true) {
                                    ReadyPostUnLinkRequest = setTimeout(function () {
                                        IsLostLink = true;
                                        NetHelper.HttpModule = api.require("httpNetBuilder");
                                        Logs.Print("请求超时_1_" + ReadyPostUnLinkRequest);
                                        resolve(new ResponseData(true, -996, "请求超时", url, postDataStr));
                                    }, 1000 * 120);
                                }
                                NetHelper.HttpModule.httpRequestAsyn({
                                    "url": url,
                                    "type": "get",
                                    "data": ajaxData,
                                    "headers": ajaxHeaders
                                }, function (ret) {
                                    //Logs.Debug("N8");
                                    if (AndroidCheckLostLink == true) {
                                        clearTimeout(ReadyPostUnLinkRequest);
                                    }
                                    if (IsLostLink == false) {
                                        if (ret.ErrorCode == 0) {
                                            //设置Cookie
                                            var ResponseCookie = ret.ResponseHeaders["Set-Cookie"];
                                            if (ResponseCookie && ResponseCookie.indexOf("=") > 0 && ResponseCookie.indexOf("Path=/") > 0) {
                                                var key = ResponseCookie.split(';')[0].split("=")[0];
                                                var value = ResponseCookie.split(';')[0].split("=")[1];
                                                if (Config.LoginCookie == null) {
                                                    Config.LoginCookie = new List();
                                                }
                                                if (Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }) != null) {
                                                    Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }).Value = value;
                                                }
                                                else {
                                                    Config.LoginCookie.Add({ Name: key, Value: value, Path: "/", Domain: url.split('.com')[0] + ".com" });
                                                }
                                            }
                                            //bytes转文本
                                            var resultString = "";
                                            try {
                                                var bytes = ret.ResponseBytes;
                                                var inflate = new Zlib.Inflate(bytes);
                                                var plain = inflate.decompress();
                                                var resultString = NetHelper.ByteToString(plain);
                                                resolve(new ResponseData(true, 200, resultString, url, postDataStr));
                                            }
                                            catch (e) {
                                                resolve(new ResponseData(false, -997, "数据处理异常", url, postDataStr));
                                            }
                                        }
                                        else {
                                            resolve(new ResponseData(false, -998, "通信异常", url, postDataStr));
                                        }
                                    }
                                    else {
                                        Logs.Print("请求超时_2_" + ReadyPostUnLinkRequest);
                                    }
                                });
                            }
                            else if (api.systemType.toLowerCase() == "ios") {
                                if (!NetHelper.HttpModule) {
                                    NetHelper.HttpModule = api.require("iosHTTPNetBuilder");
                                }
                                ;
                                //设置请求参数
                                var ajaxData = {};
                                postDataStr.SplitOutEmpty("&").Where(function (c) { return c.indexOf("=") > 0; }).ForEach(function (c) {
                                    ajaxData[c.split("=")[0]] = c.split("=")[1];
                                });
                                //设置请求头
                                var ajaxHeaders = {
                                    "Accept": "*/*",
                                    "Connection": "keep-alive",
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Accept-Language": "zh-cn",
                                    "Accept-Encoding": "gzip,deflate",
                                    "User-Agent": Config.UserAgent,
                                    "Cookie": cookie.Select(function (c) { return c.Name + "=" + c.Value; }).JoinToString(";")
                                };
                                //请求超时提示
                                var IOSCheckLostLink = Config.OpenActions.indexOf("IOSCheckLostLink") >= 0;
                                var IsLostLink = false;
                                var ReadyPostUnLinkRequest = 0;
                                if (IOSCheckLostLink == true) {
                                    ReadyPostUnLinkRequest = setTimeout(function () {
                                        IsLostLink = true;
                                        NetHelper.HttpModule = api.require("iosHTTPNetBuilder");
                                        Logs.Print("请求超时_1_" + ReadyPostUnLinkRequest);
                                        resolve(new ResponseData(true, -996, "请求超时", url, postDataStr));
                                    }, 1000 * 120);
                                }
                                NetHelper.HttpModule.httpRequestAsyn({
                                    "url": url,
                                    "type": "get",
                                    "data": ajaxData,
                                    "headers": ajaxHeaders
                                }, function (ret) {
                                    if (IOSCheckLostLink == true) {
                                        clearTimeout(ReadyPostUnLinkRequest);
                                    }
                                    if (IsLostLink == false) {
                                        if (ret.ErrorCode == 0) {
                                            //设置Cookie
                                            var ResponseCookie = ret.ResponseHeaders["Set-Cookie"];
                                            if (ResponseCookie && ResponseCookie.indexOf("=") > 0 && ResponseCookie.indexOf("Path=/") > 0) {
                                                var key = ResponseCookie.split(';')[0].split("=")[0];
                                                var value = ResponseCookie.split(';')[0].split("=")[1];
                                                if (Config.LoginCookie == null) {
                                                    Config.LoginCookie = new List();
                                                }
                                                if (Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }) != null) {
                                                    Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == key; }).Value = value;
                                                }
                                                else {
                                                    Config.LoginCookie.Add({ Name: key, Value: value, Path: "/", Domain: url.split('.com')[0] + ".com" });
                                                }
                                            }
                                            //bytes转文本
                                            var resultString = "";
                                            try {
                                                var bytes = ret.ResponseBytes;
                                                var inflate = new Zlib.Inflate(bytes);
                                                var plain = inflate.decompress();
                                                var resultString = NetHelper.ByteToString(plain);
                                                resolve(new ResponseData(true, 200, resultString, url, postDataStr));
                                            }
                                            catch (e) {
                                                resolve(new ResponseData(false, -997, "数据处理异常", url, postDataStr));
                                            }
                                        }
                                        else {
                                            resolve(new ResponseData(false, -998, "通信异常", url, postDataStr));
                                        }
                                    }
                                    else {
                                        Logs.Print("请求超时_2_" + ReadyPostUnLinkRequest);
                                    }
                                });
                            }
                            else {
                                var querystring = { URL: url };
                                querystring["DataStr"] = (postDataStr ? postDataStr : "");
                                querystring["CookieContext"] = NJson.Stringify(cookie);
                                api.ajax({
                                    url: "https://crt.letgowin.com/Data/HttpGZIPGet",
                                    method: "POST",
                                    dataType: "json",
                                    returnAll: true,
                                    data: {
                                        values: querystring
                                    }
                                }, function (ret, err) {
                                    if (ret && ret.statusCode == 200 && ret.body && ret.body.ErrorCode == 0) {
                                        resolve(new ResponseData(true, 200, ret.body.Data.JsonString, url, postDataStr));
                                    }
                                    else {
                                        resolve(new ResponseData(false, -998, "通信异常", url, postDataStr));
                                    }
                                });
                            }
                        }
                        catch (ex) {
                            resolve(new ResponseData(true, -999, "处理异常", url, postDataStr));
                        }
                    })];
            });
        });
    };
    return NetHelper;
}());
