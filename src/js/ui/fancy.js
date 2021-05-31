import {$_, $$_, loadCSS, onloadCSS} from '../libs.js'

export function fancy(){
	if(!$$_('[data-fancybox]').length) return

		init()
}

function init(){

	let once = false
	
	$$_('[data-fancybox]').forEach(a => {
		a.addEventListener('click', event => {
			event.preventDefault()

			let assets = ['/vendors/fancy/jquery.min.js', '/vendors/fancy/jquery.fancybox.min.js']
			
			if(once){
				fire(event.target)

			} else {
				event.target.classList.add('flicker')
				load(assets, event.target)
			}
		})
	})
}


function load(assets, node){

	if(assets.length){

		let next = assets.shift()
		let script = document.createElement('script')
		script.src = next

		$_('.scripts-area').appendChild(script)
		script.onload = _ => load(assets, node)
	
	} else {
		let style = loadCSS('/vendors/fancy/jquery.fancybox.min.css')
			onloadCSS(style, _ => fire(node) )
	}
	
}

function fire(node){
	node.classList.remove('flicker')
	let src = node.parentElement.href

	$.fancybox.open([ { src  : src } ]);

}