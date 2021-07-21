import {$_, $$_, hostname, declension} from '../libs.js'

let obj = {
	size: [],
	color: '',
	type_keeper: [],
	material: ''
}

export function filter_listeners() {
	if(!$_('body').classList.contains('category-page')) return
		shelf_size()
		reset_shelf_size()
		color()
		type_keeper()
		material()
		reset_span_close()
		sort()

}

function reset_shelf_size(){
	if(!$_('.item.size.shelves')) return;
	
	$_('.item.size.shelves span.reset').addEventListener('click', _ => {

		shelf_size()
		obj.size = []
		get_shelves(obj)
	})
	
}

function shelf_size(){
	if(!$_('.item.size.shelves')) return;
	$$_('.item.size.shelves .body .row ul').forEach(ul => {
			ul.querySelectorAll('li').forEach(li => {
				li.addEventListener('click', event => {
					shelf_size()
					count_li()
				})
			})
	})
}
function count_li(){
	let counter = 0
	let heads = $$_('.item.size.shelves .body .row .head')
	
	heads.forEach(span => {
		if(span.innerHTML == 'выбрать'){

			counter--
		} else {
			counter++
		}
	})
	
	if(counter == 3){
		let arr = []
		heads.forEach(el => {
			arr.push(Number(el.innerHTML))
		})

		obj.size = "[\""+arr[0]+" x "+arr[1]+" x "+arr[2]+"\"]"
		get_shelves(obj)
		
	}
}


function color(){
	$$_('.item.color .body .row').forEach(row => {
		row.addEventListener('click', event => {
			if(event.target.tagName == "SPAN"){
				obj.color = event.target.innerHTML.replace(/\s/g, '');
				get_shelves(obj)
			}
			if(event.target.tagName == "DIV"){
				obj.color = event.target.nextElementSibling.innerHTML.replace(/\s/g, '');
				get_shelves(obj)
			}
		})
	})
}

function type_keeper(){
	if(!$_('.item.supply-type')) return;
	let chex = $$_('.item.supply-type input[type="checkbox"]')
	chex.forEach(input => {
		input.addEventListener('change', event => {
			obj.type_keeper = []
			
			chex.forEach(el => {
				if(el.checked){
					obj.type_keeper.push(el.nextElementSibling.innerHTML)
				}
			})
			
			get_shelves(obj)

		})
	})

}

function material(){
	$$_('.item.material .row').forEach(row => {
		row.addEventListener('click', event => {
			if(event.target.tagName == 'SVG') return
				obj.material = event.target.querySelector('span').innerHTML
				get_shelves(obj)
		})
	})
}

function get_shelves(obj){
			NProgress.start()
			$_('.item.results .row').classList.add('stripe-animation')
			var xhr = new XMLHttpRequest();
			var body = `type_keeper=${obj.type_keeper}&action=get_shelves&color=${obj.color}&material=${obj.material}&size=${obj.size}`
			xhr.open("POST", hostname+'/api', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			
			xhr.onreadystatechange = function() {
			  
			  if (this.readyState != 4) return
		  	draw( JSON.parse(this.responseText) );
			}

			xhr.send(body);



}

function draw(json){
	if(!Object.keys(json).length){
		$_('.prod-list').innerHTML = `<p>Полок не найдено</p>`
		return;
	}

	if($_('article .row .sort').classList.length == 2){

			if($_('article .row .sort').classList.contains('asc')){
				json = Object.values(json).sort((a, b) => a.price - b.price);
			}
			if($_('article .row .sort').classList.contains('desc')){
				json = Object.values(json).sort((a, b) => b.price - a.price);
			}
			
	}


	let str = ``
	
	Object.keys(json).forEach(i => {
		str+=`
		<a class="card" href="${json[i].uri}">
			<img class="lazyload"
				data-src="${hostname+json[i].thumb}" width="233" height="160">
            <ul>
              <li class="size">
                <svg viewBox="0 0 12 12">
                  <path d="M3 .8V0H.4a.4.4 0 00-.4.4V3h.8V1.3l3.4 3.5.6-.6L1.3.8z"></path>
                  <path d="M11.7 0H9v.8h1.8L7.3 4.2l.5.6 3.5-3.5V3h.7V.4a.4.4 0 00-.3-.4z"></path>
                  <path d="M11.3 10.8L7.8 7.3l-.5.5 3.5 3.5H9v.7h2.7a.4.4 0 00.3-.3V9h-.7z"></path>
                  <path d="M4.2 7.3L.8 10.8V9H0v2.7a.4.4 0 00.4.3H3v-.7H1.3l3.5-3.5z"></path>
                </svg><span>${json[i].size}</span>
              </li>
              <li class="article">
                <svg viewBox="0 0 12 13.1">
                  <path d="M12 12.5L8.3.3a.5.5 0 00-.5-.3H4.2a.5.5 0 00-.5.3L0 12.5a.5.5 0 00.5.6H3a.5.5 0 00.5-.4l.5-2.4H8l.5 2.4a.5.5 0 00.5.4h2.6a.5.5 0 00.5-.6zM6 7.6H4.8l.2-.9 1-4.1 1 4.1.3 1z"></path>
                </svg><span>Артикул ${json[i].article}</span>
              </li>
              <li class="price">
              	<span class="regular">${json[i].price} руб.</span>
              	<img class="cart-icon" src="/assets/img/cart.svg" 
              	width="23" 
              	height="20" 
              	data-prodid="${json[i].id}">
              </li>
            </ul>
            <div class="name"><span>${json[i].pagetitle}</span></div>
      </a>
		`
	})

	$_('.prod-list').innerHTML = str
	NProgress.done()

	$_('.item.results .row').classList.remove('stripe-animation')
	$_('.item.results .row .count').innerHTML = Object.keys(json).length
	$_('.item.results .row .declension').innerHTML = declension("полка", "полок", "полки", Object.keys(json).length);
	$_('.item.results .row svg').classList.add('searched')
}

function reset_span_close(){
	$_('.item.results .row svg').addEventListener('click', event => {

		let obj = {
			size: [],
			color: '',
			type_keeper: [],
			material: ''
		}

		$_('.item.results .row svg').classList.remove('searched')
		$_('article .row .sort').removeAttribute("class")
		$_('article .row div').classList.add('sort')
		get_shelves(obj)

	})
}

function sort(){
	if(!$_('article .row .sort')) return;

	$_('article .row .sort').addEventListener('click', event => {

		if(event.target.classList.contains('desc')){
			event.target.classList.remove('desc')
			event.target.classList.add('asc')

		} else if(event.target.classList.contains('asc')){
			event.target.classList.remove('asc')
			get_shelves(obj)
			return;
		} 

		if(event.target.classList.length == 1){
			event.target.classList.add('desc')
		}

		get_shelves(obj)



	})
}


