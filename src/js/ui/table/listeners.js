import {$_, $$_, hostname, load_notify, show_notify} from '../../libs.js'
import {thumb_img_enlarge} from '../product.listeners.js'

let obj = {}

export function add_listeners(json){
	// imported ./index.js
	// obj - фетченая инфа о столе

	obj = json;

	if(json.status == 'error'){

		load_notify.then(_ => show_notify({
			status: 'error',
			title: 'Ошибка!',
			text: json.message
		}))

		return;
	}
	size()
	material()
	color()
}

function size(){
	if(!$_('.item.size')) return;

	$$_('.item.size input').forEach(radio =>{
		radio.addEventListener('change', event => {
			let size = event.target.nextElementSibling.innerHTML.trim()
			obj.size = size
			get_table(obj)
		})
	})
}

function material(){

	if(!$_('.item.material')) return;

	$$_('.item.material ul li').forEach(li => {
		li.addEventListener('click', event => {
				let material = event.target.querySelector('span').innerHTML.trim()

				obj.material = material
				get_table(obj)
		})
	})
}

function color(){
	if(!$_('.item.color')) return;

	$$_('.item.color ul li').forEach(li => {
		li.addEventListener('click', event => {
			let color = event.target.querySelector('span').innerHTML.trim()
			obj.color = color.toLowerCase()
			get_table(obj)
		})
	})
}

function get_table(obj){
	obj.article =  Number($_('span.article').dataset.origin)
	NProgress.start()

	var xhr = new XMLHttpRequest();
	var body = `action=get_table&type_keeper=${obj.keeper}&color=${obj.color}&material=${obj.material}&size=${obj.size}&article=${obj.article}`
	xhr.open("POST", hostname+'/api', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	xhr.onreadystatechange = function() {
	  
	  if (this.readyState != 4) return
  	draw( JSON.parse(this.responseText));
	}

	xhr.send(body);
}

function draw(json){
	NProgress.done()
	if(json.status == 'error'){
		load_notify()
		  .then(_ => show_notify({
		  	status: json.status,
		  	title: 'Ошибка',
		  	text: json.message
		  }))

		  return;
	}
	let current_article = Number($_('span.article').innerHTML.match(/\d+/)[0])
	if(current_article == json.article ){
		console.log('%c Тот же стол. Return', 'color: green')
		return;
	}

	$_('h1').innerHTML = json.pagetitle;
	$_('span.h1').innerHTML = json.pagetitle;
	$$_('span.article').forEach(el => el.innerHTML = `Артикул ${json.article}`)
	$_('article a.cart').setAttribute('data-prodid', json.id);
	$_('article span.price').innerHTML = `${json.price} руб.`;

	$_('.main_photo img').setAttribute('src',hostname+json.gallery.main.image)
	$_('.thumbs img.main-thumb').setAttribute('src',hostname+json.gallery.main.thumb)
	$_('.thumbs img.main-thumb').setAttribute('data-origin',hostname+json.gallery.main.image)

	if(json.gallery.thumbs ){
		$$_('.thumbs .tt').forEach(img => img.remove())

		var c = 2;
		var arr = {0:[]};
		var n = 0;
		Object.keys(json.gallery.thumbs).forEach(i => {

		if((Number(i)+1) / c <= 1){

		  arr[n].push(json.gallery.thumbs[i])

		} else {
		    c += 2;
		    n++;
		    arr[n] = []
		    arr[n].push(json.gallery.thumbs[i])
		}

		})

		// arr = отформатированный массив

		let str = ``
		Object.keys(arr).forEach(i => {
			
			let image = arr[i][0]
			let thumb = arr[i][1]
			str += `<img class="tt" src="${hostname+thumb}" data-origin="${hostname+image}" width="60" height="42">`
		})

		$_('.thumbs img.main-thumb').insertAdjacentHTML('afterend', str);
	}
	if(json.gallery.thumbs !== null && !json.gallery.thumbs.length){

		load_notify().then(_ => show_notify({
			status: 'error',
			title: 'Ошибка!',
			text: 'Ожидались thumbs'
		}))

	}



	if(json.gallery.scheme){

		$_('.thumbs img.scheme').setAttribute('data-origin', hostname+json.gallery.scheme)
	}
	if(json.gallery.material){	
		$_('.thumbs img.material').setAttribute('src', hostname+json.gallery.material[1])
		$_('.thumbs img.material').setAttribute('data-origin', hostname+json.gallery.material[0])
	} else {
		load_notify().then(_ => show_notify({
			status: 'error',
			title: 'Ошибка!',
			text: 'Ожидался material'
		}))
	}

	thumb_img_enlarge()

}