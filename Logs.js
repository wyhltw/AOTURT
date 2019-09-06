var Logs = (function () {
    function Logs() {
    }
    Logs.Print = function (msg, notifyType) {
        if (notifyType === void 0) { notifyType = null; }
        var $missiondailog = $("#PartialMission .missiondailog");
        if ($missiondailog.length > 0) {
            $("#PartialMission .missiondailog #LogsInfo").append("<p>" + DateTime.ParseTime(NetDate.GetTimeSpan()).ToString("HH:mm:ss") + " " + msg + "</p>");
            if ($("#PartialMission .missiondailog #LogsInfo p").length > 1000) {
                $("#PartialMission .missiondailog #LogsInfo p:lt(10)").remove();
            }
            if ($missiondailog.hasClass("open") && $("#PartialMission [data-action='stopLog'] .fa").hasClass("fa-pause")) {
                $("#PartialMission #LogsInfo").animate({ scrollTop: $("#PartialMission #LogsInfo")[0].scrollHeight }, 500);
            }
        }
        if ($("#PartialMission .quickLogs").length > 0 && $("#PartialMission  #OpenQuickLog").hasClass("hide")) {
            clearTimeout(this.QuickTimerControl);
            var $newMsg = $("<p>" + msg + "</p>");
            $("#PartialMission .quickLogs .text").append($newMsg).stop(false, true).animate({ top: -$("#PartialMission .quickLogs p").eq(0).height() * ($("#PartialMission .quickLogs .text p").length - 1) + "px" }, 600, "linear");
            this.QuickTimerControl = setTimeout(function () {
                if (!$("#PartialMission .quickLogs .text").is(":animated")) {
                    $("#PartialMission .quickLogs .text").css({ "top": 0 }).children("p:not(:last)").remove();
                }
            }, 1000);
        }
        if (notifyType == null) {
            Logs.Notification(DBEnum.ENUM_NotificationType.所有日志, msg);
        }
        else if (msg.indexOf("APP未能获取到网络") >= 0) {
            Logs.Notification(DBEnum.ENUM_NotificationType.网络断线, msg);
        }
        else {
            Logs.Notification(notifyType, msg);
        }
    };
    Logs.Debug = function (msg) {
        if (Config.LoginUser.LoginName == "fbtaiga" || Config.LoginUser.LoginName == "chenjhfrhf") {
            Logs.Print(msg);
        }
    };
    Logs.Notification = function (notify, msg) {
        var result = false;
        if (SysLocalStorage.Get("APPNotification") == 1) {
            if (Config.MoreSetting.CustomNotification == undefined) {
                Config.MoreSetting.CustomNotification = "";
            }
            var types = Config.MoreSetting.CustomNotification.SplitOutEmpty(",").Select(function (c) { return c.ToNumber(); });
            if (types.Contains(notify)) {
                result = true;
                try {
                    api.notification({
                        notify: {
                            title: "舰队RT",
                            content: DateTime.ParseTime(NetDate.GetTimeSpan()).ToString("HH:mm:ss") + " " + msg,
                            updateCurrent: true
                        },
                    });
                }
                catch (_a) {
                }
            }
        }
        return result;
    };
    Logs.QuickTimerControl = 0;
    Logs.Messages = new Array();
    return Logs;
}());
//# sourceMappingURL=logs.js.map