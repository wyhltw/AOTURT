var AppAlive = (function () {
    function AppAlive() {
    }
    AppAlive.Play = function (musicName) {
        var _This = this;
        if (!_This.AudioModule) {
            _This.AudioModule = api.require('audio');
            if (api.systemType.toLowerCase() == "ios") {
                try {
                    _This.AudioModule.addEventListener(function (ret, err) {
                        if (ret && ret.eventType == "pause") {
                            Logs.Print("通知 - 背景音乐被打断 后台可能已失效");
                        }
                    });
                }
                catch (_a) {
                }
            }
        }
        _This.AudioModule.stop();
        _This.AudioModule.play({
            path: 'widget://Content/media/' + musicName
        }, function (ret, err) {
            if (ret && ret.complete) {
                _This.Play(musicName);
            }
        });
    };
    AppAlive.Init = function () {
        var _This = this;
        if (SysLocalStorage.Get("APPAlive") == "BGM.mp3" || SysLocalStorage.Get("APPAlive") == "silent.mp3") {
            _This.Play(SysLocalStorage.Get("APPAlive"));
        }
        ;
        if (SysLocalStorage.Get("APPAlive") == "ServiceAndMusic") {
            _This.Play("silent.mp3");
        }
        if (SysLocalStorage.Get("APPAlive") == "Location") {
            if (!_This.LocationModule) {
                _This.LocationModule = api.require('aMapLBS');
                _This.LocationModule.configManager({
                    accuracy: 'hundredMeters',
                    filter: 1
                }, function (ret, err) {
                    if (ret.status) {
                    }
                });
            }
            _This.LocationModule.startLocation(function (ret, err) {
                if (ret.status) {
                }
            });
        }
        ;
    };
    AppAlive.AudioModule = undefined;
    AppAlive.LocationModule = undefined;
    return AppAlive;
}());
//# sourceMappingURL=AppAlive.js.map