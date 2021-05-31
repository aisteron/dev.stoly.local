import {$_, $$_} from '../../../libs.js'

export function filter(){
	color()
	material()
}

function color(){
	if(!$_('.item.color')) return

	$$_('.item.color ul li').forEach(li => {
		li.addEventListener('click', event => {
			$$_('.item.color ul li').forEach(el => el.classList.remove('active'))
			event.target.classList.add('active')
		})
	})
}

function material(){
	if(!$_('.item.material')) return

		$$_('.item.material ul li').forEach(li => {
			li.addEventListener('click', event => {
				$$_('.item.material ul li').forEach(el => el.classList.remove('active'))
				event.target.classList.add('active')
			})
		})
}