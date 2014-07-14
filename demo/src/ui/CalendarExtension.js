/*! 2014 Baidu Inc. All Rights Reserved */
define("CalendarExtension",["require","./lib","./Control","./Calendar"],function(require){var t=require("./lib"),e=require("./Control"),i=require("./Calendar"),a={onShow:function(){this.show(this.target,!0)},onHide:function(){this.hide()},onClick:function(e){var i=t.getTarget(e);if("A"===i.tagName)if(t.stopPropagation(e),this.fire("click",{target:i}),this.check(i)){var a=i.innerHTML;this.target.innerHTML=a,this.select(a),this.hide(),this.fire("pick",{value:a,target:this.target})}}},n=e.extend({type:"Calendar.Menu",options:{start:1,end:12,className:"",selectedClass:"current"},init:function(e){var i=this.main=document.createElement("div");t.addClass(i,e.className),this.bindEvents(a)},render:function(){var e=this.options;if(!this.rendered){this.rendered=!0;var i=this.main;this.build(e.start,e.end),this.elements=i.getElementsByTagName("a");var a=this._bound;if(t.on(i,"mouseenter",a.onShow),t.on(i,"mouseleave",a.onHide),t.on(i,"click",a.onClick),e.target)this.setTarget(t.g(e.target))}return this},build:function(e,i){if(t.isArray(e))i=e[1],e=e[0];this.start=e,this.end=i;for(var a=[],n=e;i>=n;n++)a.push('<a href="#">'+n+"</a>");this.fire("build",{html:a}),this.main.innerHTML=a.join("")},setTarget:function(t){if(t)this.target=t},select:function(e){var i=this.options,a=i.selectedClass,n=this.query(a)[0],s=n&&n.innerHTML;if(n&&t.removeClass(n,a),s!==e){var r=this.elements[e-this.start];r&&t.addClass(r,a)}},show:function(e,i){!i&&this.fire("beforeShow",{target:e});var a=this.main;if(e!==this.target)this.setTarget(e),e.parentNode.parentNode.appendChild(a);this.select(0|e.innerHTML),t.show(a)},hide:function(){t.hide(this.main)},check:function(){return!0}});n.month=function(t){var e=new n(t);return e.render()},n.year=function(t){var e=new n(t),i=20,a=function(t){var e=t%i,a=t-e+1,n=a+i-1;return[a,n]};return e.on("build",function(t){var e=t.html;e.push('<a href="#" data-cmd="prev">&lt;</a>'),e.push('<a href="#" data-cmd="back">返回</a>'),e.push('<a href="#" data-cmd="next">&gt;</a>')}),e.on("beforeShow",function(t){var e=t.target,i=0|e.innerHTML;this.build(a(i))}),e.on("click",function(t){var e=t.target.getAttribute("data-cmd");switch(e){case"prev":this.build(a(this.start-i));break;case"next":this.build(a(this.start+i));break;case"back":this.build(a(0|this.target.innerHTML))}}),e.check=function(t){return!t.getAttribute("data-cmd")},e.render()};var s={renderMenu:function(e,i){var a=this.menus[i];if(!a){a=this.menus[i]=n[i]({className:"menu-"+i+"-options"});var s=this.calendar;a.on("pick",function(e){var i=e.target.parentNode,a=i.getElementsByTagName("a"),n=0|a[0].innerHTML,r=0|a[1].innerHTML,h=i.parentNode;t.each(t.q(h.className,h.parentNode),function(t,e){if(t===h){var i=new Date(n,r-1,1);i.setMonth(r-e-1),s.setValue(i)}})})}a.show(e)},onOver:function(e){var i=t.getTarget(e),a=i.getAttribute("data-menu-type");if(a){s.renderMenu.call(this,i,a);var n=this.main,r=this._bound;t.un(n,"mouseover",r.onOver),t.on(n,"mouseout",r.onOut)}},onOut:function(e){var i=t.getTarget(e),a=i.getAttribute("data-menu-type");if(a){var n=this.menus[a];n&&n.hide();var s=this.main,r=this._bound;t.on(s,"mouseover",r.onOver),t.un(s,"mouseout",r.onOut)}},onClick:function(t){s.onHide.call(this,t)},onHide:function(){t.forIn(this.menus,function(t){t.hide()})}},r=t.newClass({initialize:function(t){t=t||{},t.lang=t.lang||{},t.lang.title='<a href="#" data-menu-type="year" class="{prefix}-menu-year-handler">{year}</a>年<a href="#" data-menu-type="month" class="{prefix}-menu-month-handler">{month}</a>月',this.calendar=new i(t),this.menus={},e.prototype.bindEvents.call(this,s)},render:function(){var e=this.calendar,i=e.render.apply(e,arguments),a=this.main=e.main,n=this._bound;return t.on(a,"mouseover",n.onOver),t.on(a,"mouseout",n.onOut),t.on(a,"click",n.onClick),e.on("hide",n.onHide),i},dispose:function(){t.forIn(this.menus,function(t){t.dispose()});var e=this.main,i=this._bound;t.un(e,"mouseover",i.onOver),t.un(e,"mouseout",i.onOut),t.un(e,"click",i.onClick),this.calendar.un("hide",i.onHide),this.calendar.dispose()}});return r});