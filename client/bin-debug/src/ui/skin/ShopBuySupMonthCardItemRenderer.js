var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ShopBuySupMonthCardItemRenderer = (function (_super) {
        __extends(ShopBuySupMonthCardItemRenderer, _super);
        function ShopBuySupMonthCardItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.ShopBuySupMonthCardItemRendererSkin;
        }
        var __egretProto__ = ShopBuySupMonthCardItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.isRemainMonthCardDays = function () {
            if (gm.dataManage.remainSupMonthCardDays() >= 0) {
                return true;
            }
            return false;
        };
        __egretProto__.getRemainMonthCardDays = function () {
            return gm.dataManage.remainSupMonthCardDays();
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setBtnIconImg();
            this.setBtnCost();
            this.setBtnText();
            this.setBtnSource();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                if (gm.dataManage.remainSupMonthCardDays() < 0) {
                    gm.gameUI.showLoadingLayer();
                    gm.network.buySupMonthCard(function (data) {
                        gm.dataManage.data.supMonthCardTime = data.time;
                        gm.postMessage(consts.kMessageBuySupMonthCard, { currBuy: true, index: this.itemIndex });
                        gm.dataManage.getVipLevel(function () {
                            gm.postMessage(consts.kMessageGetVipLevel);
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this), function () {
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this));
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
            }
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconGroup.visible = false;
            this.btnItem.iconCostLbl.visible = true;
        };
        __egretProto__.setBtnCost = function () {
            this.btnItem.iconCostLbl.text = "￥" + Conf.shop[this.data.id].cost;
        };
        __egretProto__.setBtnText = function () {
            var text;
            var size;
            if (this.isRemainMonthCardDays()) {
                text = "月卡剩余" + Math.ceil(this.getRemainMonthCardDays()) + "天";
                size = 16;
            }
            else {
                text = "购买";
                size = 22;
            }
            this.btnItem.textLbl.text = text;
            this.btnItem.textLbl.size = size;
        };
        __egretProto__.setBtnSource = function () {
            var source;
            if (this.isRemainMonthCardDays()) {
                source = "btn_disabled";
            }
            else {
                source = "btn_blue";
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ShopBuySupMonthCardItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ShopBuySupMonthCardItemRenderer = ShopBuySupMonthCardItemRenderer;
    ShopBuySupMonthCardItemRenderer.prototype.__class__ = "uiskins.ShopBuySupMonthCardItemRenderer";
})(uiskins || (uiskins = {}));
