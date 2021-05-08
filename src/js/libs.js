export function $_(element) {return document.querySelector(element)}
export function $$_(elements) {return document.querySelectorAll(elements)}

export function loadCSS(n,e,o,d){"use strict";var t=window.document.createElement("link"),i=e||window.document.getElementsByTagName("script")[0],l=window.document.styleSheets;return t.rel="stylesheet",t.href=n,t.media="only x",d&&(t.onload=d),i.parentNode.insertBefore(t,i),t.onloadcssdefined=function(n){for(var e,o=0;o<l.length;o++)l[o].href&&l[o].href===t.href&&(e=!0);e?n():setTimeout(function(){t.onloadcssdefined(n)})},t.onloadcssdefined(function(){t.media=o||"all"}),t}

export function onloadCSS(n,e){
	n.onload=function(){
		n.onload=null,e&&e.call(n)},
		"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(e);
}

export const TUNE = {
	local: 'localhost:8082',
    //dev: 'dev.stoly.by',
    dev: 'stoly.modx',
    prod: 'stoly.by',
    protocol: 'http://'

};

export function check_host(){
    let host;
    return (window.location.host === TUNE.prod || window.location.host === TUNE.dev) ? host = '' : host = TUNE.protocol+TUNE.dev;

}