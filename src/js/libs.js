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

export let hostname;
window.location.hostname == 'localhost' ? hostname = 'http://dev.stoly.by' : null


/**
 * Склонение существительных
 * Правильная форма cуществительного рядом с числом (счетная форма).
 *
 * @example declension("файл", "файлов", "файла", 0);//returns "файлов"
 * @example declension("файл", "файлов", "файла", 1);//returns "файл"
 * @example declension("файл", "файлов", "файла", 2);//returns "файла"
 *
 * @param {string} oneNominative единственное число (именительный падеж)
 * @param {string} severalGenitive множественное число (родительный падеж)
 * @param {string} severalNominative множественное число (именительный падеж)
 * @param {(string|number)} number количество
 * @returns {string}
 */
export function declension(oneNominative, severalGenitive, severalNominative, number) {
    number = number % 100;

    return (number <= 14 && number >= 11)
        ? severalGenitive
        : (number %= 10) < 5
            ? number > 2
                ? severalNominative
                : number === 1
                    ? oneNominative
                    : number === 0
                        ? severalGenitive
                        : severalNominative//number === 2
            : severalGenitive
    ;
};


export function ajax_to_cart(id){

    var xhr = new XMLHttpRequest();
    var body = `id=${id}&count=1&ms2_action=cart/add&ctx=web`
    xhr.open("POST", hostname+'/assets/components/minishop2/action.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function() {
      
      if (this.readyState != 4) return
      return JSON.parse(this.responseText);
    }

    xhr.send(body);
}