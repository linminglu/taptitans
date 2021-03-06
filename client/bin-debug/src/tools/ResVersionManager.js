/**
 * Created by yangsong on 15-4-21.
 * 单一资源通过版本号加载管理类
 */
var ResVersionManager = (function () {
    function ResVersionManager() {
        this.res_loadByVersion();
    }
    var __egretProto__ = ResVersionManager.prototype;
    /**
     * Res加载使用版本号的形式
     */
    __egretProto__.res_loadByVersion = function () {
        /**
         * 从指定的 URL 发送和加载数据。可以以文本、原始二进制数据或 URL 编码变量格式接收数据，这取决于为 dataFormat 属性所设置的值。
         * 请注意 dataFormat 属性的默认值为文本。如果想将数据发送至指定的 URL，则可以在 URLRequest 对象中设置 data 属性。
         * @method egret.URLLoader#load
         * @param request {URLRequest}  一个 URLRequest 对象，指定要下载的 URL。
         */
        egret.URLLoader.prototype.load = function (request) {
            var version = "";
            var resVersion = ResVersionManager.resVersionData;
            var url = request.url;
            if (!Util.isLocalServer() && !Util.isLocalClient()) {
                url = url.substr(10);
            }
            if (resVersion && resVersion[url]) {
                version = resVersion[url];
            }
            if (version.length == 0) {
            }
            if (request.url.indexOf("?") == -1) {
                request.url += "?v=" + version;
            }
            else {
                request.url += "&v=" + version;
            }
            this._request = request;
            this.data = null;
            egret.MainContext.instance.netContext.proceed(this);
        };
    };
    /**
     * 加载资源版本号配置文件
     * @param url 配置文件路径
     * @param complateFunc 加载完成执行函数
     * @param complateFuncTarget 加载完成执行函数所属对象
     */
    __egretProto__.loadConfig = function (url, complateFunc, complateFuncTarget) {
        this.complateFunc = complateFunc;
        this.complateFuncTarget = complateFuncTarget;
        RES.getResByUrl(url, this.loadResVersionComplate, this);
    };
    /**
     * 配置文件加载完成
     * @param data
     */
    __egretProto__.loadResVersionComplate = function (data) {
        ResVersionManager.resVersionData = data;
        this.complateFunc.call(this.complateFuncTarget);
    };
    return ResVersionManager;
})();
ResVersionManager.prototype.__class__ = "ResVersionManager";
