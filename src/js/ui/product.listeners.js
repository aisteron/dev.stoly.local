import {
	$_, 
	$$_, 
	hostname, 
	loadCSS, 
	onloadCSS, 
	load_notify, 
	show_notify,
	ajax_to_cart,
	get_cart_status
} from '../libs.js'

import {draw_cart_icon_in_header} from './prod.list.js'

export function product_listeners(){
	// exported to product.js
	// exported to small_table/index.js

	one_click()
	to_cart()
	thumb_img_enlarge()
}

function one_click(){
	if(!$_('article a.one')) return;
	$_('article a.one').addEventListener('click', event => {
		event.preventDefault()
		load_vex()
		 .then(r => {
			vex.dialog.open({
				    message: 'Введите номер телефона и мы вам перезвоним:',
				    input: ['<input name="phone" type="text" placeholder="+375 xx xxx xx xx" required />'].join(''),

				    callback: function (data) {
				        if (!data) {
				            console.log('%c Cancelled', 'color: red')
				        } else {
				            //console.log('Phone', data.phone)
				            let obj = {phone: data.phone}
				            fetch(hostname+'/assets/api/callback/one_click.php',{
				            	method: 'POST',
				            	mode: 'cors',
				            	headers: {'Content-Type': 'application/json'},
				            	body: JSON.stringify(obj)
				            })
				            .then(response => response.text())
				            .then(t => {
				            	let obj = {status: t}
				            	
				            	if(t == 'success'){
				            		obj.title = 'Успешно отправлено',
				            		obj.text = 'Менеджер вам скоро перезвонит'
				            	} else {
				            		obj.title = 'Ошибка отправки',
				            		obj.text = 'Пожалуйста, сообщите нам, мы исправим'
				            	}

				            		load_notify().then(_ => show_notify(obj))
				            })
				        }
				    }
				})
		})
	})
}

export async function load_vex(){

	//imported index.js

	return new Promise(resolve => {
		let script = document.createElement('script');
		script.src = '/vendors/vex/vex.combined.min.js'
		$_('.scripts-area').appendChild(script)
		
		script.onload = () => {

			vex.defaultOptions.className = 'vex-theme-os'

			loadCSS('/vendors/vex/vex.css')
			let style = loadCSS('/vendors/vex/vex-theme-os.css')
			
			onloadCSS(style, _ => resolve('vex loaded'))
		}
	})
}

function to_cart(){
	if(!$_('article a.cart')) {
		console.log('%c 👆 Не вижу кнопки «В корзину»', 'color: red'); 
		return;
	}

	$_('article a.cart').addEventListener('click', event => {
		event.preventDefault();
		ajax_to_cart(event.target.dataset.prodid)
		 .then(r => {

		 	let obj = {}

		 	if(r.success){

		 			obj.status = 'success'
		 			obj.title ='Успех!'
		 			obj.text = 'Товар в корзину добавлен'

		 		} else {
		 			obj.status = 'error'
		 			obj.title = 'Ошибка'
		 			obj.text = r.message
		 		}

		 		load_notify()
		 		 .then(_ => show_notify(obj))
		 		
		 		get_cart_status()
		 		 .then(d => draw_cart_icon_in_header(d))
		 		
		 })

	})
}

export function thumb_img_enlarge(){
	// may export to product.js

	let thumbs = $$_('article .thumbs img');

	thumbs.forEach(img =>{
		img.addEventListener('click', event => {
			
			thumbs.forEach(img => img.classList.remove('active'))
			event.target.classList.add('active')

			$_('.main_photo img').src = event.target.dataset.origin
		})
	})
}