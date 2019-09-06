/// <reference path="lib.ts" />
var Dailog = /** @class */ (function () {
    function Dailog() {
    }
    Dailog.CreatDialog = function (options) {
        var datespan = new Date().getTime();
        var modalID = "modal_" + datespan; //Model_ID
        var $modalArea = $('<div class="modal fade in" id="' + modalID + '"></div>').appendTo($("body"));
        var $modalDialog = $("<div class='modal-dialog'></div>").appendTo($modalArea);
        var $modalContent = $("<div class='modal-content'></div>").appendTo($modalDialog);
        var $overlay = $('<div class="modal-backdrop fade in"></div>').appendTo($("body"));
        var $head = $('<div class="modal-header"><button data-dismiss="modal" class="close" type="button"><i class="fa fa-times"></i></button><h4 class="modal-title"></h4></div>').appendTo($modalContent);
        //标题
        if (options && options.Title) {
            var title = options.Title;
            $head.find("h4").html(title);
        }
        var $body = $('<div class="modal-body"></div>').appendTo($modalContent);
        var winHeight = $(window).height() - 200;
        $body.css("max-height", $(window).height() - $(window).width() / 100 * 50 + "px");
        //$body.css({ "max-height": winHeight + "px" });
        //Form
        if (options && options.FormNodes.Count() > 0) {
            var formID = "form_" + datespan;
            var $form = $('<form id="' + formID + '" autocomplete="off" class="form-horizontal" ></form>').appendTo($body);
            //control
            for (var i = 0; i < options.FormNodes.Length; i++) {
                var formNode = options.FormNodes[i];
                var labelText = formNode.Text ? formNode.Text : "";
                var className = formNode.Class ? formNode.Class : "";
                var NodeName = formNode.Name ? formNode.Name : "";
                var Attr = formNode.Attr ? formNode.Attr : "";
                var NodeValue = formNode.Value ? formNode.Value : "";
                var Placeholder = formNode.Placeholder ? formNode.Placeholder : "";
                var $fromGroup = $('<div class="form-group" data-groupname="' + NodeName + '"></div>').append('<label class="col-lg-3 control-label">' + labelText + '</label>').append('<div class="controlsl col-lg-8"></div>');
                var $control = $("");
                switch (formNode.Type) {
                    case Dailog.FormNodeType.text:
                        $control = $('<input type="text" class="form-control" value="' + NodeValue + '" name="' + NodeName + '" placeholder="' + Placeholder + '">');
                        break;
                    case Dailog.FormNodeType.password:
                        $control = $('<input type="password" class="form-control" value="' + NodeValue + '" name="' + NodeName + '" placeholder="' + Placeholder + '">');
                        break;
                    case Dailog.FormNodeType.number:
                        $control = $('<input type="number" class="form-control" value="' + NodeValue + '" name="' + NodeName + '" placeholder="' + Placeholder + '">');
                        break;
                    case Dailog.FormNodeType.textarea:
                        $control = $('<textarea name="' + NodeName + '" style="width:100%;height:80px;">' + NodeValue + '</textarea>');
                        break;
                    case Dailog.FormNodeType.select:
                        $control = $('<select class="form-control" name="' + NodeName + '"></select>');
                        var cdata = formNode.Data;
                        if (cdata) {
                            for (var di = 0; di < cdata.Length; di++) {
                                $control.append('<option value=' + cdata[di].Value + '>' + cdata[di].Name + '</option>');
                            }
                            if (NodeValue) {
                                $control.val(NodeValue);
                            }
                        }
                        break;
                    default: break;
                }
                $control.addClass(className);
                if (Attr.length > 0) {
                    Attr.split(',').map(function (item) {
                        var att = item.split('=');
                        if (att.length == 2) {
                            $control.attr(att[0], att[1]);
                        }
                    });
                }
                $fromGroup.children(".controlsl").append($control);
                $fromGroup.appendTo($form);
                //验证
                var valiopt = {
                    rules: {}, messages: {}, submitHandler: function (form) {
                        var jsonObj = $(form).serializeJson();
                        if (options.OnSubmit) {
                            options.OnSubmit(jsonObj, $modalArea);
                        }
                    }
                };
                options.FormNodes.ForEach(function (node) {
                    valiopt.rules[node.Name] = {};
                    valiopt.messages[node.Name] = {};
                    node.Validates.ForEach(function (c) {
                        valiopt.rules[node.Name][c.Key] = c.Value;
                        valiopt.messages[node.Name][c.Key] = c.Message;
                    });
                });
                $form.validate(valiopt);
            }
        }
        var $footer = $('<div class="modal-footer"></div>').appendTo($modalContent);
        var $cancel = $('<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>').appendTo($footer);
        if ($modalContent.find("form .form-control").length > 0) {
            //actions
            var submitText = options.SubmitText ? options.SubmitText : "确定";
            var $submit = $('<button type="button" class="btn btn-primary" data-check="save">' + submitText + '</button>').prependTo($footer);
            $submit.click(function () {
                $modalContent.find("form").eq(0).submit();
            });
        }
        $modalContent.find("[data-dismiss]").click(function () {
            $modalDialog.addClass("animated " + (options.AnimateOut ? options.AnimateOut : "fadeOutUp"));
            $overlay.animate({ "opacity": 0 }, 500, function () {
                $modalArea.remove();
                $overlay.remove();
            });
        });
        $modalDialog.addClass("animated " + (options.AnimateIn ? options.AnimateIn : "fadeInDown"));
        $modalArea.show();
        if (options && options.OnBuild) {
            options.OnBuild($modalArea);
        }
        ;
        if ($modalArea.find(".modal-footer").length == 0) {
            $body.css("max-height", $(window).height() - $(window).width() / 100 * 32 + "px");
        }
        return $modalArea;
    };
    return Dailog;
}());
(function (Dailog) {
    var DailogOption = /** @class */ (function () {
        function DailogOption() {
            /** 标题 */
            this.Title = "";
            /** 表单 */
            this.FormNodes = new List();
            /**  */
            this.SubmitText = "";
            this.AnimateIn = "";
            this.AnimateOut = "";
        }
        return DailogOption;
    }());
    Dailog.DailogOption = DailogOption;
    var DailogOption_FromNode = /** @class */ (function () {
        function DailogOption_FromNode() {
            this.Name = "";
            this.Type = FormNodeType.text;
            this.Text = "";
            this.Value = "";
            this.Data = new List();
            this.Validates = new List();
            this.Class = "";
            this.Attr = "";
            this.Placeholder = "";
        }
        return DailogOption_FromNode;
    }());
    Dailog.DailogOption_FromNode = DailogOption_FromNode;
    var FormNodeType;
    (function (FormNodeType) {
        FormNodeType[FormNodeType["text"] = 0] = "text";
        FormNodeType[FormNodeType["password"] = 1] = "password";
        FormNodeType[FormNodeType["number"] = 2] = "number";
        FormNodeType[FormNodeType["textarea"] = 3] = "textarea";
        FormNodeType[FormNodeType["select"] = 4] = "select";
    })(FormNodeType = Dailog.FormNodeType || (Dailog.FormNodeType = {}));
    var SelectKeyValue = /** @class */ (function () {
        function SelectKeyValue() {
            this.Name = "";
            this.Value = "";
        }
        return SelectKeyValue;
    }());
    Dailog.SelectKeyValue = SelectKeyValue;
    var FormValidate = /** @class */ (function () {
        function FormValidate() {
            this.Key = "";
            this.Value = "";
            this.Message = "";
        }
        return FormValidate;
    }());
    Dailog.FormValidate = FormValidate;
})(Dailog || (Dailog = {}));
//# sourceMappingURL=Dailog.js.map