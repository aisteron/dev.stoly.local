import {$_, $$_} from '../../libs.js'
import {filter} from './filter/index.js'

export function Table(){
	if(!$_('body').classList.contains('table-page')) return
	filter()
}