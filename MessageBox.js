var MessageBox = /** @class */ (function () {
    function MessageBox() {
    }
    MessageBox.Show = function (content, timeout, callback) {
        var $msg = $("<div></div>");
        var titleArray = content.split('\\n');
        titleArray.forEach(function (c) {
            $msg.append("<p>" + c + "</p>");
        });
        var $Html = $('<div class="messageBox-container"><div class="overlay"></div><div class="fixer fadeIn animated"><div class="outer"><div class="content"><h1 class="title">提示</h1><div class="message"></div></div><div class="toolbar"><a href="javascript:;" class="flavr-button default close">OK</a></div></div></div></div>');
        $Html.find(".message").html($msg.html());
        $Html.find(".close").click(function () {
            //防止二次点击
            if ($Html.length > 0 && !$Html.hasClass("closeing")) {
                $Html.addClass("closeing");
                var $container = $(this).parents(".messageBox-container").eq(0);
                $container.find(".fixer ").eq(0).removeClass("fadeIn").addClass("bounceOut");
                setTimeout(function () {
                    $container.remove();
                }, 750);
                if (typeof (callback) == "function") {
                    callback();
                }
            }
        });
        $("body").append($Html);
        if (typeof (timeout) == "function") {
            callback = timeout;
        }
        if (typeof (timeout) == "number") {
            setTimeout(function () {
                if ($Html.length > 0 && !$Html.hasClass("closeing")) {
                    $Html.find(".close").triggerHandler("click");
                }
            }, timeout);
        }
    };
    MessageBox.Confirm = function (content, onSuccess, onClose) {
        var $msg = $("<div></div>");
        var titleArray = content.split('\\n');
        titleArray.forEach(function (c) {
            $msg.append("<p>" + c + "</p>");
        });
        var $Html = $('<div class="messageBox-container"><div class="overlay"></div><div class="fixer jackInTheBox animated"><div class="outer"><div class="content"><h1 class="title">操作提示</h1><div class="message"></div></div><div class="toolbar"><a href="javascript:;" class="flavr-button success allow">确定</a><a href="javascript:;" class="flavr-button danger disallow">取消</a></div></div></div></div>');
        $Html.find(".message").html($msg.html());
        $("body").append($Html);
        $Html.find(".allow").click(function () {
            if ($Html.length > 0 && !$Html.hasClass("closeing")) {
                $Html.addClass("closeing");
                var $container = $(this).parents(".messageBox-container").eq(0);
                $container.find(".fixer ").eq(0).removeClass("jackInTheBox").addClass("flipOutY");
                setTimeout(function () {
                    $container.remove();
                }, 750);
                if (typeof (onSuccess) == "function") {
                    onSuccess();
                }
            }
        });
        $Html.find(".disallow").click(function () {
            if ($Html.length > 0 && !$Html.hasClass("closeing")) {
                $Html.addClass("closeing");
                var $container = $(this).parents(".messageBox-container").eq(0);
                $container.find(".fixer ").eq(0).removeClass("jackInTheBox").addClass("flipOutY");
                setTimeout(function () {
                    $container.remove();
                }, 750);
                if (typeof (onClose) == "function") {
                    onClose();
                }
            }
        });
    };
    return MessageBox;
}());
//# sourceMappingURL=messagebox.js.map