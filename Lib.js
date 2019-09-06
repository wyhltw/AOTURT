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
String.prototype.ReplaceAll = function (searchValue, replaceValue) {
    var source = this;
    if (!source)
        return source;
    return source.replace(new RegExp(searchValue, "g"), replaceValue);
};
String.prototype.ToNumber = function () {
    return parseFloat(this);
};
String.prototype.SplitOutEmpty = function (separator) {
    var list = new List();
    this.split(separator).forEach(function (c) {
        if (c.trim()) {
            list.Add(c);
        }
    });
    return list;
};
var IInitable = /** @class */ (function () {
    function IInitable() {
    }
    /** 用Json对象初始化对象，用此方法会保留含默认值的属性 */
    IInitable.prototype._InitData = function (obj) {
        var _this = this;
        Object.keys(this).forEach(function (c) {
            _this[c] = obj[c] != undefined ? obj[c] : _this[c];
        });
        return this;
    };
    IInitable.prototype._BuildObj = function (obj) {
        for (var c in this) {
            this[c] = obj[c.toString()] ? obj[c.toString()] : this[c];
        }
        return this;
    };
    return IInitable;
}());
/**
 * 自定义Json转换器
 */
var NJson = /** @class */ (function () {
    function NJson() {
    }
    /**
     * 将对象根据格式填充
     * @param source
     * @param data
     */
    NJson.InitData = function (source, data) {
        Object.keys(source).forEach(function (c) {
            source[c] = data[c] != undefined ? data[c] : source[c];
        });
        return source;
    };
    /**
     * 将对象属性全部转为小写
     * @param obj
     */
    NJson.FNLower = function (obj) {
        var lowerCache = {};
        if (typeof (obj) === "string" || obj === null || obj === undefined || typeof (obj) === "number" || typeof (obj) === "boolean" || typeof (obj) === "function")
            return obj;
        if (Object.prototype.toString.call(obj) == '[object Array]') {
            var result = [];
            result.length = obj.length;
            for (var i = 0; i < obj.length; i++) {
                var newVal = obj[i];
                result[i] = typeof (newVal) === "string" ? newVal : this.FNLower(newVal);
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
                ret[newKey] = typeof (newVal) === "string" ? newVal : this.FNLower(newVal);
            }
            return ret;
        }
    };
    /**
     * json字符串转小写属性对象
     * @param dataString
     */
    NJson.LowerParse = function (dataString) {
        return this.FNLower(JSON.parse(dataString));
    };
    /**
     * 对象转字符串 List转Array
     * @param jsonObj
     */
    NJson.Stringify = function (obj) {
        return obj ? JSON.stringify(this.ObjListToArray(NJson.DeepCopy(obj))) : "";
    };
    /**
     * 深复制 生成新对象
     * @param source
     */
    NJson.DeepCopy = function (source) {
        var _this = this;
        if (typeof (source) === "string" || source === null || source === undefined || typeof (source) === "number" || typeof (source) === "function" || typeof (source) === "boolean")
            return source;
        if (source.Select != undefined && source.Where != undefined) {
            var listResult = new List();
            source.ForEach(function (c) {
                listResult.Add(_this.DeepCopy(c));
            });
            return listResult;
        }
        else if (Object.prototype.toString.call(source) == '[object Array]') {
            var arrayResult = [];
            source.forEach(function (c) {
                arrayResult.push(_this.DeepCopy(c));
            });
            return arrayResult;
        }
        else {
            var objResult = new Object();
            for (var key in source) {
                objResult[key] = typeof source[key] === "object" ? this.DeepCopy(source[key]) : source[key];
            }
            return objResult;
        }
    };
    /**
     * 字符串转对象 Array转List
     * @param str
     */
    NJson.Parse = function (str) {
        return str ? this.ObjArrayToList(JSON.parse(str)) : str;
    };
    /**
     * Json字符串格式化为指定格式 且Array自动转为List
     * @param objtype
     * @param str
     */
    NJson.DeserializeOfType = function (str, objtype) {
        var datajson = typeof (str) == "string" ? JSON.parse(str) : str;
        Object.keys(objtype).forEach(function (c) {
            objtype[c] = datajson[c] != undefined ? datajson[c] : objtype[c];
        });
        return this.ObjArrayToList(objtype);
    };
    /**
     * Json字符串格式化为指定格式 且Array自动转为List 且小写
     * @param str
     * @param objtype
     */
    NJson.DeserializeOfType_ThenLower = function (str, objtype) {
        var datajson = typeof (str) == "string" ? this.LowerParse(str) : str;
        Object.keys(objtype).forEach(function (c) {
            objtype[c] = datajson[c] != undefined ? datajson[c] : objtype[c];
        });
        return this.ObjArrayToList(objtype);
    };
    /**
     * 将对象内的所有Array转为List
     * @param obj
     */
    NJson.ObjArrayToList = function (obj) {
        if (obj == null || obj == undefined) {
            return obj;
        }
        ;
        if (Object.prototype.toString.call(obj) == '[object Array]' && obj.length == 0) {
            return new List();
        }
        Object.keys(obj).forEach(function (c) {
            if (Object.prototype.toString.call(obj) == '[object Array]') {
                var newArray = [];
                for (var i = 0; i < obj["length"]; i++) {
                    newArray.push(obj[i]);
                }
                obj = List.From(newArray);
            }
            if ((typeof obj[c]).toLowerCase() == "object") {
                obj[c] = NJson.ObjArrayToList(obj[c]);
            }
        });
        return obj;
    };
    /**
     * 将对象内的所有List转为Array
     * @param obj
     */
    NJson.ObjListToArray = function (obj) {
        if (obj == null || obj == undefined) {
            return obj;
        }
        ;
        if (obj.Select != undefined && obj.Where != undefined && obj.Count() == 0) {
            return [];
        }
        Object.keys(obj).forEach(function (c) {
            if (obj instanceof List) {
                var newArray = [];
                for (var i = 0; i < obj["Length"]; i++) {
                    newArray.push(obj[i]);
                }
                obj = newArray;
            }
            if ((typeof obj[c]).toLowerCase() == "object") {
                obj[c] = NJson.ObjListToArray(obj[c]);
            }
        });
        return obj;
    };
    return NJson;
}());
/**
 * 键值对
 */
var KeyValue = /** @class */ (function () {
    function KeyValue(key, value) {
        this.Key = key;
        this.Value = value;
    }
    return KeyValue;
}());
/**
 * 列表
 */
var List = /** @class */ (function () {
    function List() {
        /** 列表长度 */
        this.Length = 0;
    }
    /**
     * 数组转字符串
     * @param array
     */
    List.From = function (array) {
        var list = new List();
        return list.Build(array);
        ;
    };
    /**
     * 根据List创建
     * @param array
     */
    List.prototype.Build = function (array) {
        var _this = this;
        array.map(function (c, i) {
            _this.Add(c);
        });
        return this;
    };
    /**
     * 新增元素
     * @param item
     */
    List.prototype.Add = function (item) {
        this.Length++;
        this[this.Length - 1] = item;
        return this;
    };
    /**
     * 新增元素
     * @param item
     */
    List.prototype.AddRange = function (item) {
        for (var i = 0; i < item.Length; i++) {
            this.Add(item[i]);
        }
        return this;
    };
    List.JoinChildren = function (source) {
        var result = new List();
        source.ForEach(function (c) {
            result.AddRange(c);
        });
        return result;
    };
    /**
     * 遍历
     * @param callbackfn
     */
    List.prototype.ForEach = function (callbackfn) {
        for (var i = 0; i < this.Length; i++) {
            callbackfn(this[i], i);
        }
        return this;
    };
    /**
     * 异步遍历
     * @param callbackfn
     */
    List.prototype.ForEachAsync = function (callbackfn) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.Length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, callbackfn(this[i], i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * 合计
     * @param callbackfn
     */
    List.prototype.Sum = function (callbackfn) {
        var sum = 0;
        this.ForEach(function (c) {
            sum += callbackfn(c);
        });
        return sum;
    };
    /**
     * 拼接成字符串
     * @param separator
     */
    List.prototype.JoinToString = function (separator) {
        var str = "";
        this.ForEach(function (c) {
            str += c + separator;
        });
        str = str == "" ? str : str.substring(0, str.length - 1);
        return str;
    };
    /**
     * 筛选元素
     * @param callbackfn
     */
    List.prototype.Where = function (callbackfn) {
        var newList = new List();
        for (var i = 0; i < this.Length; i++) {
            var v = this[i];
            if (callbackfn(v, i)) {
                newList.Add(v);
            }
        }
        return newList;
    };
    /**
     * 获取集合
     * @param callbackfn
     */
    List.prototype.Select = function (callbackfn) {
        var newList = new List();
        for (var i = 0; i < this.Length; i++) {
            newList.Add(callbackfn(this[i], i));
        }
        return newList;
    };
    /**
     * 跳过前N个
     * @param num
     */
    List.prototype.Skip = function (num) {
        var newList = new List();
        for (var i = num; i < this.Length; i++) {
            newList.Add(this[i]);
        }
        return newList;
    };
    ;
    /**
     * 获取前N个
     * @param num
     */
    List.prototype.Take = function (num) {
        var newList = new List();
        for (var i = 0; i < Math.min(num, this.Length); i++) {
            newList.Add(this[i]);
        }
        return newList;
    };
    ;
    /**
    * Index
    * @param value
    */
    List.prototype.IndexOf = function (value) {
        var index = -1;
        for (var i = 0; i < this.Length; i++) {
            if (this[i] == value) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * 包含
     * @param value
     */
    List.prototype.Contains = function (value) {
        return this.IndexOf(value) != -1;
    };
    /**
     * 获取数量
     */
    List.prototype.Count = function () {
        return this.Length;
    };
    ///**
    // * 获取第一个元素 失败返回null
    // */
    //public FirstOrDefault(): T {
    //    if (this.Length == 0) return null;
    //    return this[0];
    //}
    /**
    * 匹配第一个指定条件的元素
    * @param callbackfn
    */
    List.prototype.FirstOrDefault = function (callbackfn) {
        if (callbackfn === void 0) { callbackfn = undefined; }
        if (callbackfn) {
            var result = null;
            for (var i = 0; i < this.Length; i++) {
                var v = this[i];
                if (callbackfn(v, i)) {
                    result = v;
                    break;
                }
            }
            return result;
        }
        else {
            if (this.Length == 0)
                return null;
            return this[0];
        }
    };
    /**
     * 获取第一个元素 失败返回{}
     */
    List.prototype.FirstOrNew = function () {
        if (this.Length == 0)
            return {};
        return this[0];
    };
    /**
     * 获取最后一个元素
     */
    List.prototype.LastOrDefault = function () {
        if (this.Length == 0)
            return null;
        return this[this.Length - 1];
    };
    /**
     * 移除指定元素
     * @param item
     */
    List.prototype.Remove = function (item) {
        var index = this.IndexOf(item);
        if (index != -1) {
            this.Length--;
            for (var i = index; i < this.Length; i++) {
                this[i] = this[i + 1];
            }
            delete this[this.Length];
        }
    };
    /**
     * 移除选择的元素
     * @param callbackfn
     */
    List.prototype.RemoveAll = function (callbackfn) {
        var _this = this;
        var objs = this.Where(callbackfn);
        objs.ForEach(function (c) {
            _this.Remove(c);
        });
    };
    /**
     * 排序 升序
     * @param callbackfn
     */
    List.prototype.OrderBy = function (callbackfn) {
        var _this = this;
        if (this.Length == 0)
            return new List();
        var binds = new Array();
        for (var i = 0; i < this.Length; i++) {
            var value = callbackfn(this[i]);
            binds.push(new KeyValue(i, value));
        }
        binds = binds.sort(function (a, b) {
            if (a != b) {
                if (a.Value > b.Value || a.Value == void 0)
                    return 1;
                if (a.Value < b.Value || a.Value == void 0)
                    return -1;
            }
            return a.Key - b.Key;
        });
        var newList = new List();
        binds.map(function (c) {
            newList.Add(_this[c.Key]);
        });
        //排序权重
        var orderWeight = "";
        var prevNumber = 0;
        for (var i = 0; i < newList.Length; i++) {
            if (i == 0) {
                prevNumber = 0;
            }
            else if (callbackfn(newList[i]) != callbackfn(newList[i - 1])) {
                prevNumber++;
            }
            orderWeight += prevNumber + ",";
        }
        newList["OrderWeight"] = orderWeight == "" ? "" : orderWeight.substring(0, orderWeight.length - 1);
        return newList;
    };
    /**
     * 排序 升序
     * @param callbackfn
     */
    List.prototype.ThenBy = function (callbackfn) {
        var _this = this;
        var _This = this;
        if (_This["OrderWeight"] == undefined) {
            return this.OrderBy(callbackfn);
        }
        else {
            if (this.Length == 0)
                return new List();
            var binds = new Array();
            var OrderWeights = _This["OrderWeight"].SplitOutEmpty(",");
            for (var i = 0; i < this.Length; i++) {
                var value = callbackfn(this[i]);
                var ojb = new KeyValue(i, value);
                ojb["Weight"] = parseInt(OrderWeights[i]);
                binds.push(ojb);
            }
            binds = binds.sort(function (a, b) {
                if (a["Weight"] > b["Weight"])
                    return 1;
                if (a["Weight"] < b["Weight"])
                    return -1;
                if (a != b) {
                    if (a.Value > b.Value || a.Value == void 0)
                        return 1;
                    if (a.Value < b.Value || a.Value == void 0)
                        return -1;
                }
                return a.Key - b.Key;
            });
            var newList = new List();
            binds.map(function (c) {
                newList.Add(_this[c.Key]);
            });
            //排序权重
            var orderWeight = "";
            var prevNumber = 0;
            for (var i = 0; i < newList.Length; i++) {
                if (i == 0) {
                    prevNumber = 0;
                }
                else if (callbackfn(newList[i]) != callbackfn(newList[i - 1]) || OrderWeights[i] != OrderWeights[i - 1]) {
                    prevNumber++;
                }
                orderWeight += prevNumber + ",";
            }
            newList["OrderWeight"] = orderWeight == "" ? "" : orderWeight.substring(0, orderWeight.length - 1);
            return newList;
        }
    };
    /**
     * 排序 倒序
     * @param callbackfn
     */
    List.prototype.OrderByDescending = function (callbackfn) {
        var _this = this;
        var _This = this;
        if (this.Length == 0)
            return new List();
        var binds = new Array();
        for (var i = 0; i < this.Length; i++) {
            var value = callbackfn(this[i]);
            binds.push(new KeyValue(i, value));
        }
        binds = binds.sort(function (a, b) {
            if (a != b) {
                if (a.Value > b.Value || a.Value == void 0)
                    return -1;
                if (a.Value < b.Value || a.Value == void 0)
                    return 1;
            }
            return a.Key - b.Key;
        });
        var newList = new List();
        binds.map(function (c) {
            newList.Add(_this[c.Key]);
        });
        //排序权重
        var orderWeight = "";
        var prevNumber = 0;
        for (var i = 0; i < newList.Length; i++) {
            if (i == 0) {
                prevNumber = 0;
            }
            else if (callbackfn(newList[i]) != callbackfn(newList[i - 1])) {
                prevNumber++;
            }
            orderWeight += prevNumber + ",";
        }
        newList["OrderWeight"] = orderWeight == "" ? "" : orderWeight.substring(0, orderWeight.length - 1);
        return newList;
    };
    /**
     * 排序 倒序
     * @param callbackfn
     */
    List.prototype.ThenByDescending = function (callbackfn) {
        var _this = this;
        var _This = this;
        if (_This["OrderWeight"] == undefined) {
            return this.OrderByDescending(callbackfn);
        }
        else {
            if (this.Length == 0)
                return new List();
            var binds = new Array();
            var OrderWeights = _This["OrderWeight"].SplitOutEmpty(",");
            for (var i = 0; i < this.Length; i++) {
                var value = callbackfn(this[i]);
                var ojb = new KeyValue(i, value);
                ojb["Weight"] = parseInt(OrderWeights[i]);
                binds.push(ojb);
            }
            binds = binds.sort(function (a, b) {
                if (a["Weight"] > b["Weight"])
                    return 1;
                if (a["Weight"] < b["Weight"])
                    return -1;
                if (a != b) {
                    if (a.Value > b.Value || a.Value == void 0)
                        return -1;
                    if (a.Value < b.Value || a.Value == void 0)
                        return 1;
                }
                return a.Key - b.Key;
            });
            var newList = new List();
            binds.map(function (c) {
                newList.Add(_this[c.Key]);
            });
            //排序权重
            var orderWeight = "";
            var prevNumber = 0;
            for (var i = 0; i < newList.Length; i++) {
                if (i == 0) {
                    prevNumber = 0;
                }
                else if (callbackfn(newList[i]) != callbackfn(newList[i - 1]) || OrderWeights[i] != OrderWeights[i - 1]) {
                    prevNumber++;
                }
                orderWeight += prevNumber + ",";
            }
            newList["OrderWeight"] = orderWeight == "" ? "" : orderWeight.substring(0, orderWeight.length - 1);
            return newList;
        }
    };
    /**
     * 转数组
     */
    List.prototype.ToArray = function () {
        var array = new Array();
        for (var i = 0; i < this.Length; i++) {
            array.push(this[i]);
        }
        return array;
    };
    /**
     * 将列表内某元素替换为另一个元素
     * @param oldValue
     * @param newValue
     */
    List.prototype.Replace = function (oldValue, newValue) {
        this[this.IndexOf(oldValue)] = newValue;
        return this;
    };
    /**
     * 去重复
     */
    List.prototype.Distinct = function () {
        var newList = new List();
        this.ForEach(function (c) {
            if (!newList.Contains(c)) {
                newList.Add(c);
            }
        });
        return newList;
    };
    return List;
}());
/**
 * 字典
 */
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.Dict = new List();
    }
    //新增元素
    Dictionary.prototype.Add = function (key, value) {
        this.Dict.Add(new KeyValue(key, value));
    };
    //筛选元素
    Dictionary.prototype.Where = function (callbackfn) {
        return this.Dict.Where(callbackfn);
    };
    Object.defineProperty(Dictionary.prototype, "Length", {
        get: function () {
            return this.Dict.Length;
        },
        enumerable: true,
        configurable: true
    });
    return Dictionary;
}());
var Timer = /** @class */ (function () {
    function Timer() {
        this.timer = 0;
        /** 循环事件需注入 */
        this.Elapsed = null;
        /** 间隔 */
        this.Interval = 1000;
    }
    /**
     * 启动定时器
     * @param quick 立即执行一次
     */
    Timer.prototype.Start = function (quick) {
        var _this = this;
        if (quick === void 0) { quick = false; }
        if (this.Elapsed) {
            if (quick) {
                this.Elapsed();
            }
            ;
            this.timer = setInterval(function () {
                _this.Elapsed();
            }, this.Interval);
        }
    };
    /**
     * 停止定时器
     */
    Timer.prototype.Stop = function () {
        clearInterval(this.timer);
    };
    Timer.prototype.Dispose = function () {
        clearInterval(this.timer);
    };
    return Timer;
}());
/**
 * 时间
 */
var DateTime = /** @class */ (function () {
    function DateTime() {
        this.timespan = 0;
    }
    /**
     * 时间戳转时间 10位或13位数值
     * @param timespan
     */
    DateTime.ParseTime = function (timespan) {
        var time = new DateTime();
        time.timespan = timespan.toString().length == 10 ? (timespan * 1000) : timespan;
        return time;
    };
    Object.defineProperty(DateTime, "Now", {
        /** 现在 */
        get: function () {
            var time = new DateTime();
            time.timespan = new Date().getTime();
            return time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime, "MinValue", {
        /** 1970/1/1 0:0:0 */
        get: function () {
            var time = new DateTime();
            time.timespan = 0;
            return time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime, "Today", {
        /** 今天 */
        get: function () {
            var time = new DateTime();
            time.timespan = new Date().getTime();
            var timestring = time.ToString("yyyy/MM/dd");
            return DateTime.ParseTime(new Date(timestring).getTime());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 比...小
     * @param partime
     */
    DateTime.prototype.SmallThen = function (partime) {
        return this.timespan < partime.timespan;
    };
    /**
     * 比...大
     * @param partime
     */
    DateTime.prototype.BigThen = function (partime) {
        return this.timespan > partime.timespan;
    };
    /**
     * 一样
     * @param partime
     */
    DateTime.prototype.EqualThen = function (partime) {
        return this.timespan == partime.timespan;
    };
    DateTime.prototype.GetTimeSpan = function () {
        return this.timespan;
    };
    Object.defineProperty(DateTime.prototype, "Date", {
        /**
         * 获取当日
         */
        get: function () {
            var time = new DateTime();
            time.timespan = this.timespan;
            var timestring = time.ToString("yyyy/MM/dd");
            return DateTime.ParseTime(new Date(timestring).getTime());
        },
        enumerable: true,
        configurable: true
    });
    DateTime.prototype.AddMinutes = function (num) {
        var newTimeSpan = this.timespan + num * 60 * 1000;
        return DateTime.ParseTime(newTimeSpan);
    };
    /**
     * 转 yyyy/MM/dd 格式字符串 yyyy-MM-dd会差8小时
     * @param format
     */
    DateTime.prototype.ToString = function (format) {
        format = format.replace("HH", "hh");
        var time = new Date(this.timespan);
        var date = {
            "M+": time.getMonth() + 1,
            "d+": time.getDate(),
            "h+": time.getHours(),
            "m+": time.getMinutes(),
            "s+": time.getSeconds(),
            "q+": Math.floor((time.getMonth() + 3) / 3),
            "S+": time.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    };
    return DateTime;
}());
var SysLocalStorage = /** @class */ (function () {
    function SysLocalStorage() {
    }
    SysLocalStorage.Entity = function () {
        var UserPreference = JSON.parse(localStorage.getItem("UserPreference"));
        if (!UserPreference) {
            UserPreference = {};
        }
        return UserPreference;
    };
    ;
    /**
     * 获取配置的对象 Array
     * @param key
     */
    SysLocalStorage.Get = function (key) {
        var UserPreference = JSON.parse(localStorage.getItem("UserPreference"));
        if (!UserPreference) {
            UserPreference = {};
        }
        return UserPreference[key];
    };
    ;
    /**
    * 设置配置 Array
    */
    SysLocalStorage.Set = function (key, value) {
        var UserPreference = JSON.parse(localStorage.getItem("UserPreference"));
        if (!UserPreference) {
            UserPreference = {};
        }
        UserPreference[key] = value;
        localStorage.setItem("UserPreference", JSON.stringify(UserPreference));
    };
    ;
    /**
    * 删除配置
    */
    SysLocalStorage.Del = function (key) {
        var UserPreference = JSON.parse(localStorage.getItem("UserPreference"));
        if (!UserPreference) {
            UserPreference = {};
        }
        delete UserPreference[key];
        localStorage.setItem("UserPreference", JSON.stringify(UserPreference));
    };
    return SysLocalStorage;
}());
//Jquery扩展
$(function () {
    $("form").submit(function (e) {
        e.preventDefault();
    });
    if (jQuery["validator"]) {
        jQuery["validator"].setDefaults({
            errorPlacement: function (error, element) {
                if (element.is(":radio"))
                    error.appendTo(element.parent().parent());
                else if (element.is(":checkbox"))
                    error.appendTo(element.parent().parent());
                else
                    error.appendTo(element.parent());
            },
            errorClass: "ValError",
        });
    }
});
//序列化表单
$.fn.serializeJson = function () {
    var serializeObj = {}; // 目标对象
    var array = this.serializeArray(); // 转换数组格式
    // var str=this.serialize();
    $(array).each(function () {
        if (serializeObj[this.name]) {
            if ($.isArray(serializeObj[this.name])) {
                serializeObj[this.name].push(this.value); // 追加一个值 hobby : ['音乐','体育']
            }
            else {
                // 将元素变为 数组 ，hobby : ['音乐','体育']
                serializeObj[this.name] = [serializeObj[this.name], this.value];
            }
        }
        else {
            serializeObj[this.name] = this.value; // 如果元素name不存在，添加一个属性 name:value
        }
    });
    return serializeObj;
};
var APITimer = null;
var IODealy = /** @class */ (function () {
    function IODealy() {
    }
    return IODealy;
}());
var TimeDealy = /** @class */ (function () {
    function TimeDealy() {
    }
    TimeDealy.Start = function (useModel) {
        var _This = this;
        if (_This.IsRuning == false) {
            _This.IsRuning = true;
            _This.PrevIntervalTimeSpan = new Date().getTime();
            if (api.systemType.toLowerCase() == "android" && useModel == true) {
                APITimer = api.require("timer");
                APITimer.startTimer({
                    delay: 50,
                    isLoop: true,
                    period: 50,
                }, function (ret) {
                    var ts = new Date().getTime();
                    var deferTimeSpan = ts - _This.PrevIntervalTimeSpan - 50;
                    _This.PrevIntervalTimeSpan = ts;
                    _This.Actions.ForEach(function (c) {
                        c.NowDealy -= (50 + deferTimeSpan);
                    });
                    var actions = _This.Actions.Where(function (c) { return c.NowDealy <= 0; });
                    actions.ForEach(function (action) {
                        //console.log(action);
                        _This.Actions.Remove(action);
                        action.Func();
                    });
                });
            }
            else {
                _This.Interval = setInterval(function () {
                    var ts = new Date().getTime();
                    var deferTimeSpan = ts - _This.PrevIntervalTimeSpan - 50;
                    _This.PrevIntervalTimeSpan = ts;
                    _This.Actions.ForEach(function (c) {
                        c.NowDealy -= (50 + deferTimeSpan);
                    });
                    var actions = _This.Actions.Where(function (c) { return c.NowDealy <= 0; });
                    actions.ForEach(function (action) {
                        //console.log(action);
                        _This.Actions.Remove(action);
                        action.Func();
                    });
                }, 50);
            }
        }
    };
    TimeDealy.Add = function (dl) {
        this.Actions.Add(dl);
        this.Actions = this.Actions.OrderBy(function (c) { return c.Priority; });
    };
    ;
    TimeDealy.IsRuning = false;
    TimeDealy.Actions = new List();
    TimeDealy.Interval = 0;
    TimeDealy.PrevIntervalTimeSpan = 0;
    return TimeDealy;
}());
//当前线程休眠
var Sleep = function (time, priority) {
    if (priority === void 0) { priority = 3; }
    return new Promise(function (resolve, reject) {
        if (TimeDealy.IsRuning == true) {
            TimeDealy.Add({ Func: function () { resolve(); }, Dealy: time, NowDealy: time, Priority: priority });
        }
        else {
            setTimeout(function () {
                resolve();
            }, time);
        }
    });
};
//# sourceMappingURL=lib.js.map