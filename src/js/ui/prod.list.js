import {$_, $$_} from '../libs.js'

export function add_to_cart_from_prod_list(){
	if(!$_('.prod-list')) return

		$$_('a.card').forEach(a => {

			a.addEventListener('click', event => {
				
				if(event.target.classList == 'cart-icon'){
					event.preventDefault()
					console.log('Обработчик добавления в корзину');
				}
			})
		})
}