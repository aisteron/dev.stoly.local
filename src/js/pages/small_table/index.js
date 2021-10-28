import {$_, $$_} from '../../libs.js'
import {product_listeners} from '../../ui/product.listeners.js'

export function Small_table(){
	if(!$_('body').classList.contains('small_table-page')) return
	product_listeners()
}