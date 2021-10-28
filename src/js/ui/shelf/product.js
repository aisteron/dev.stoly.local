import {$_, $$_, hostname, load_notify, show_notify} from '../../libs.js'
import {product_listeners, thumb_img_enlarge} from '../product.listeners.js'

let obj = [];

export function Product(){
	show_filter_770()
	

	if($_('body').classList.contains('shelf-page')){

		product_listeners()
		
		ajax_get_shelf_info()
			.then(r => {

				if(r.status == 'error'){
					let obj = {
						status: r.status,
						title: "Ошибка",
						text: "Не удалось найти товар по артикулу"
					}
					load_notify()
						.then(_ => show_notify(obj) )
				} else {
					add_listeners(r)
				}
			})
	}
}

function show_filter_770(){
	if(!$_('nav .filter')) return
		$_('nav .filter').addEventListener('click', event => {
			$_('section .filter').classList.toggle('open')
		})
}

async function ajax_get_shelf_info(){
	let article = Number($_('span.article').innerHTML.match(/\d+/)[0])
	
	return new Promise(resolve => {

		var xhr = new XMLHttpRequest();
		var body = `article=${article}&action=get_shelf_info`
		xhr.open("POST", hostname+'/api', true)
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onreadystatechange = function(){
			if(this.readyState !== 4) return
			return resolve(JSON.parse(this.responseText))	
		}
		xhr.send(body)

	})
}

function add_listeners(r){
	obj = r

	$$_('.item.color ul li').forEach(li => {

		li.addEventListener('click', e => {

			obj.color = e.target.querySelector('span').innerHTML
			NProgress.start()
			fetch_shelf(obj)
			  .then(r => draw(r))

			$$_('.item.color ul li').forEach(li => li.classList.remove('active'))
			e.target.classList.add('active')
		})
	
	})

	$$_('.item.size input[type="radio"]').forEach(input => {
		input.addEventListener('change', event => {
			let size = event.target.nextElementSibling.innerHTML
			obj.size = [size]
			NProgress.start()
			fetch_shelf(obj)
			  .then(r => draw(r))
		})
	})	
}

async function fetch_shelf(obj){

	return new Promise(resolve => {
		var xhr = new XMLHttpRequest;
		var body = `action=get_shelf&color=${obj.color}&material=${obj.material}&type_keeper=${obj.keeper}&size=["${obj.size}"]`

		xhr.open("POST", hostname+'/api', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.onreadystatechange = function() {
			if(this.readyState != 4) return;
			return resolve(JSON.parse(this.responseText))
		}

		xhr.send(body);
	})
}

function draw(json){
	NProgress.done()
	if(json.status == 'error'){
		let obj = {
			status: json.status,
			title: 'Ошибка',
			text: json.message
		}
		load_notify().then(_ => show_notify(obj) )
		return;
	}

	// update current obj!

	/*
	* article num
	* gallery[]
	* id num
	* pagetitle "string"
	* price float
	* uri "string"
	*/

	$_('h1').innerHTML = json.pagetitle
	$_('span.h1').innerHTML = json.pagetitle
	$$_('.article').forEach(el => el.innerHTML = `Aртикул ${json.article}`)
	$_('.buttons a.cart').setAttribute('data-prodid', json.id)

	if(window.location.hostname != 'localhost'){
		history.pushState({'id': json.id}, json.pagetitle, window.location.origin+"/"+json.uri)
	}

	$_('article span.price').innerHTML = json.price + ' руб.'

	/* gallery */

	if(window.location.hostname == 'localhost'){
		$_('.main_photo img').src = 'http://dev.stoly.by/'+json.gallery[0].url
	} else {
		$_('.main_photo img').src = json.gallery[0].url
	}

	let c = $$_('article .thumbs img').length - 1

	let material_uri = [
		$$_('article .thumbs img')[c].src, 
		$$_('article .thumbs img')[c].dataset.origin
	]


	let str = ``
	json.gallery.forEach((el, index) => {
	
		if(index == 0){
			str+=` <img src="${hostname+el.small}" width="60" height="42" data-origin="${hostname+el.url}" class="active">`
		} else {
			str+=` <img src="${hostname+el.small}" width="60" height="42" data-origin="${hostname+el.url}">`
		}
		
	})

	$_('article .thumbs').innerHTML = str

	$_('article .thumbs').insertAdjacentHTML('beforeend', `<img src="${material_uri[0]}" width="60" height="42" data-origin="${material_uri[1]}">`)
	thumb_img_enlarge()
}
