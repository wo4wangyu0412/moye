/*! 2014 Baidu Inc. All Rights Reserved */
define("ScrollBar",["require","./lib","./Control"],function(require){var t=require("./lib"),e=require("./Control"),i=t.browser.firefox?"DOMMouseScroll":"mousewheel",s=function(e){var i;return e?function(e,i){t[e?"addClass":"removeClass"](document.body,i)}:function(t){if(t)i=document.body.onselectstart,document.body.onselectstart=new Function("event.returnValue = false");else document.body.onselectstart=i}}(t.browser.ie<9?!1:!0),n={onThumbdown:function(e){if(!this._disabled)s(!0,n.getClass.call(this,"noselect")),this.mouseStart=this.xAxis?e.pageX||e.clientX:e.pageY||e.clientY,this.thumbStart=parseInt(this.thumb.style[this.xAxis?"left":"top"],10)||0,t.on(document,"mousemove",this._bound.onMousemove),t.on(document,"mouseup",this._bound.onMouseup)},onMousemove:function(t){if(this.scrollRatio<1){var e=(this.xAxis?t.pageX||t.clientX:t.pageY||t.clientY)-this.mouseStart;this.thumbPos=Math.min(this.trackSize,Math.max(0,this.thumbStart+e)),n.setScrollPercent.call(this,this.thumbPos/this.trackSize)}},onMouseup:function(){s(!1,n.getClass.call(this,"noselect")),t.un(document,"mousemove",this._bound.onMousemove),t.un(document,"mouseup",this._bound.onMouseup)},onTrackUp:function(e){if(!this._disabled&&t.getTarget(e)===this.track){var i=Math.min(this.trackSize,this.xAxis?e.offsetX:e.offsetY);n.setScrollPercent.call(this,i/this.trackSize)}},onMouseWheel:function(e){if(!this._disabled){var i=e.wheelDelta?e.wheelDelta/120:-e.detail/3,s=i*this.options.wheelspeed;if(s*(1-this.scrollRatio)>2*this.scrollRatio)s=2*this.scrollRatio;var s=this.curPos-s;if(n.setScrollPercent.call(this,s),this.options.preventWheelScroll||s>=.005&&.995>=s)t.preventDefault(e)}},onMainEnter:function(){t.addClass(this.main,n.getClass.call(this,"over"))},onMainLeave:function(){t.removeClass(this.main,n.getClass.call(this,"over"))},setScrollPercent:function(t){if(.005>t)t=0;else if(.005>1-t)t=1;var e=this.xAxis?"left":"top";this.thumb.style[e]=Math.round(t*this.trackSize)+"px";var i=Math.round(t*this.panelSize*(1-this.scrollRatio));if(this.posMode)this.panel.style[e]=-i+"px";else this.panel[this.scrollDirection]=i;this.curPos=t;var s={position:t};this.fire("change",s)},getClass:function(t){return t=t?"-"+t:"",this.options.prefix+t}},a=e.extend({type:"ScrollBar",options:{disabled:!1,main:"",panel:"",thumb:"",wheelspeed:.05,direction:"vertical",prefix:"ecl-ui-scrollbar",mode:"",preventWheelScroll:!1,autoThumbSize:!0,minThumbSize:30},init:function(){if(!this.options.main)throw new Error("invalid main");var e=this.options;this._disabled=!!e.disabled,this.curPos=0,this.bindEvents(n),this.xAxis="horizontal"===e.direction;var s=this.xAxis?"Width":"Height";if(this.offsetProp="offset"+s,this.clientProp="client"+s,this.scrollProp="scroll"+s,this.scrollDirection="scroll"+(this.xAxis?"Left":"Top"),this.posMode="position"===e.mode,this.main=t.g(e.main),!e.panel)this.panel=t.q(n.getClass.call(this,"panel"),this.main)[0];else this.panel=t.g(e.panel);if(!e.thumb)this.thumb=t.q(n.getClass.call(this,"thumb"),this.main)[0];else this.thumb=t.g(e.thumb);this.track=this.thumb.offsetParent;var a=this._bound;t.on(this.thumb,"mousedown",a.onThumbdown),t.on(this.track,"mouseup",a.onTrackUp),t.on(this.panel,i,a.onMouseWheel),t.on(this.main,"mouseenter",a.onMainEnter),t.on(this.main,"mouseleave",a.onMainLeave)},scrollTo:function(t){if("begin"===t)t=0;else if("end"===t)t=1;else if(t>1)t/=this.panelSize*(1-this.scrollRatio);else t=1*t||0;n.setScrollPercent.call(this,t)},refresh:function(){this.panelSize=this.panel[this.scrollProp],this.scrollRatio=this.main[this.clientProp]/this.panelSize,t[this.scrollRatio>=1?"addClass":"removeClass"](this.main,n.getClass.call(this,"noscroll"));var e=this.track[this.clientProp];if(this.options.autoThumbSize&&this.scrollRatio<1){var i=Math.max(this.options.minThumbSize,this.scrollRatio*e);this.thumb.style[this.xAxis?"width":"height"]=i+"px"}return this.trackSize=e-this.thumb[this.offsetProp],this.scrollTo(this.curPos),this._disabled=this.scrollRatio>=1,this},render:function(){if(!this.options.main)throw new Error("invalid main");return this.refresh(),this},setEnabled:function(e){var i=!e;t[i?"addClass":"removeClass"](this.main,n.getClass.call(this,"disable")),this._disabled=i},enable:function(){this.setEnabled(!0)},disable:function(){this.setEnabled(!1)},dispose:function(){var e=this._bound;t.removeClass(document.body,n.getClass.call(this,"noselect")),t.un(this.thumb,"mousedown",e.onThumbdown),t.un(this.track,"mouseup",e.onTrackUp),t.un(this.panel,i,e.onMouseWheel),t.un(document,"mousemove",e.onMousemove),t.un(document,"mouseup",e.onMouseup),t.un(this.main,"mouseenter",e.onMainEnter),t.un(this.main,"mouseleave",e.onMainLeave),this.main=this.panel=this.thumb=this.track=null,this.parent("dispose")}});return a});