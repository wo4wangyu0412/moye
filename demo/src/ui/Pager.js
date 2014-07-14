/*! 2014 Baidu Inc. All Rights Reserved */
define("Pager",["require","./lib","./Control"],function(require){var t=require("./lib"),e=require("./Control"),i={build:function(){function t(t){f[u++]='<a href="#" data-page="'+(t-1)+'">'+t+"</a>"}function e(t,e,i){var s=a+e;if(i)s+=" "+a+"disabled";f[u++]='<a href="#" data-page="'+t+'" class="'+s+'">'+(n[e]||t+1)+"</a>"}var i=this.options,n=i.lang,a=i.prefix+"-",s=i.showAlways,r=this.showCount,o=this.total,l=this.page+1,h=this.padding,f=[],u=0;if(2>o){if(s)e(0,"prev",!0),e(0,"current"),e(0,"next",!0);return f.join("")}var d=1,c=o,p=(r-r%2)/2;if(r=2*p+1,o>r)if(c=r,l>p+1)if(l+p>o)d=o-2*p,c=o;else d=l-p,c=l+p;if(l>1||s)e(l-2,"prev",2>l);for(g=0;h>g;g++)if(d>g+1)t(g+1);if(d>h+2)e(l-2,"ellipsis");if(d===h+2)t(h+1);for(var m=l,g=d;c>=g;g++)g===m?e(g-1,"current"):t(g);var v=o-h;if(v-1>c)e(l,"ellipsis");if(c===v-1)t(v);for(g=0;h>g;g++)if(v+g+1>c)t(v+g+1);if(o>l||s)e(l,"next",l>=o);return f.join("")},onChange:function(e,i){e&&t.preventDefault(e),i=i||t.getTarget(e),this.fire("click");var n=this.main;if(!this.disabled&&i&&i!==n){if("A"!==i.tagName)if(i=t.getAncestorBy(i,function(t){return"A"===t.tagName||t===n}),i===n)return;var a=i.getAttribute("data-page");if(null!==a)a|=0;var s=this.page;if(null!==a&&a>=0&&a<this.total&&a!==s){var r=1&this.options.first;this.fire("change",{page:a+r})}}}},n=e.extend({type:"Pager",options:{disabled:!1,main:"",page:0,first:0,padding:1,showAlways:!0,showCount:0,total:0,prefix:"ecl-ui-pager",disabledClass:"disabled",lang:{prev:"<em></em>上一页",next:"下一页<em></em>",ellipsis:".."}},binds:"onChange",init:function(e){this.bindEvents(i),this.disabled=e.disabled,this.showCount=0|(e.showCount||n.SHOW_COUNT),this.total=0|e.total,this.padding=0|e.padding,this.page=0,e.first&=1,this.setPage(0|e.page);var a=e.lang;if(a.prev.replace(/\{prefix\}/gi,e.prefix),a.next.replace(/\{prefix\}/gi,e.prefix),e.main)this.main=t.g(e.main),t.addClass(this.main,e.prefix),t.on(this.main,"click",this._bound.onChange)},setPage:function(t){if(t-=this.options.first,t=Math.max(0,Math.min(0|t,this.total-1)),t!==this.page)this.page=t},getPage:function(){return this.page+this.options.first},setTotal:function(t){this.total=0|t||1,this.setPage(0)},getTotal:function(){return this.total},render:function(){if(!this.main)throw new Error("invalid main");var e=this.main;if(this.total>1||this.options.showAlways)e.innerHTML=i.build.call(this),t.show(e);else t.hide(e);return this}});return n.SHOW_COUNT=5,n});