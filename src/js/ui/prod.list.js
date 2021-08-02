import {$_, $$_, ajax_to_cart, load_notify, show_notify, get_cart_status} from '../libs.js'
import "regenerator-runtime/runtime"

let once_loaded = false

export function add_to_cart_from_prod_list(){
	if(!$_('.prod-list')) return

		$$_('a.card').forEach(a => {

			a.addEventListener('click', event => {
				
				if(event.target.classList == 'cart-icon'){
					event.preventDefault()
					console.log('Обработчик добавления в корзину');
					NProgress.start()	
					ajax_to_cart(event.target.dataset.prodid)
						.then(response => {
							
							if(response.success){
								let obj = { status: 'success', title: 'Успешно!', text: 'Товар в корзине'}
								NProgress.done()

								get_cart_status()
									.then(digit => draw_cart_icon_in_header(digit))

								if(!once_loaded){
									load_notify()
									 .then(resolve => {
										console.log('%c Notify assets loaded', 'color: pink');
										once_loaded = true
										show_notify(obj)
									})
								} else {
									show_notify(obj)
								}
								
								
							} else {
								let obj = { status: 'error', title: 'Ошибка!', text: 'Не удалось добавить товар в корзину'}
								show_notify(obj)
							}
						})


				}
			})
		})
}

export function draw_cart_icon_in_header(digit){
	// imported into product.listeners.js
	let header_cart_span = $_('header .nav li.cart span')
	header_cart_span.classList.add('filled')
	header_cart_span.innerHTML = digit
}
