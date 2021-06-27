import {$_, $$_} from '../libs.js'

export function Product(){
	show_filter_770()
}

function show_filter_770(){
	if(!$_('nav .filter')) return
		$_('nav .filter').addEventListener('click', event => {
			$_('section .filter').classList.toggle('open')
		})
}