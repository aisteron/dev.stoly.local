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
window.location.hostname == 'localhost' ? hostname = 'http://dev.stoly.by' : hostname = ''


/**
 * Склонение существительных
 * @example declension("файл", "файлов", "файла", 0);//returns "файлов"
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


export async function ajax_to_cart(id){

		let promise = new Promise(resolve => {

				var xhr = new XMLHttpRequest();
				var body = `id=${id}&todo=add&action=cart`
				xhr.open("POST", hostname+'/api', true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				
				xhr.onreadystatechange = function() {
					
					if (this.readyState != 4) return
					return resolve(JSON.parse(this.responseText));
				}

				xhr.send(body);

		})

		let result = await promise;
		return result;		
}

export async function load_notify(){
	
	let assets = [
	'/vendors/notify/simple-notify.min.js',
	'/vendors/notify/simple-notify.min.css',
	]

	return new Promise(resolve => {
			let script = document.createElement('script')
			script.src = assets[0]
			
			$_('.scripts-area').appendChild(script)
			
			script.onload = () => {
				let style = loadCSS(assets[1]);
				
				onloadCSS(style, function(){
					return resolve('assets loaded')
				})

			}
	})

}


// https://github.com/dgknca/simple-notify/blob/master/README.md
export function show_notify(obj){

	new Notify ({
    status: obj.status,
    title: obj.title,
    text: obj.text,
    effect: 'fade',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 3000,
    gap: 20,
    distance: 20,
    type: 1,
    position: 'right top'
  })
}

export async function get_cart_status(){
	return new Promise(resolve => {
		var xhr = new XMLHttpRequest();
		var body = `&todo=get_status&action=cart`
		xhr.open("POST", hostname+'/api', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xhr.onreadystatechange = function() {
			
			if (this.readyState != 4) return
			return resolve(JSON.parse(this.responseText));
		}

		xhr.send(body);
	})	
}


export async function get_total_products(id){
	// imported /ui/tables/filter.js
	// imported /ui/shelves/filter.listeners.js

	return new Promise(resolve => {
		var xhr = new XMLHttpRequest();
		var body = `&id=${id}&action=get_total_products`
		xhr.open("POST", hostname+'/api', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xhr.onreadystatechange = function() {
			
			if (this.readyState != 4) return
			return resolve(JSON.parse(this.responseText));
		}

		xhr.send(body);
	})
}