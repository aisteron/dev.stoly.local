import {$_, $$_, hostname, load_notify, show_notify} from '../../libs.js'
import {add_listeners} from './listeners.js'
import {product_listeners} from '../product.listeners.js'


export function Table(){
	if($_('body').classList.contains('table-page')){
		
		init()
		 .then(r => {
		 	add_listeners(r)
		 	product_listeners()
		 })
	}
}

async function init(){

	return new Promise(resolve =>{
		ajax_get_table_info()
	   .then(r => resolve(r))
	})
	
}

function ajax_get_table_info() {
	let article = Number($_('span.article').innerHTML.match(/\d+/)[0])

		return new Promise(resolve => {

		var xhr = new XMLHttpRequest();
		var body = `article=${article}&action=get_table_info`
		xhr.open("POST", hostname+'/api', true)
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onreadystatechange = function(){
			if(this.readyState !== 4) return
			return resolve(JSON.parse(this.responseText))	
		}
		xhr.send(body)

	})

}
