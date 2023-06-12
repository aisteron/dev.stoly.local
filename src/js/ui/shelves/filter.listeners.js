import {$_, $$_, hostname, declension, get_total_products, qs} from '../../libs.js'


let obj = {
	size: [],
	color: '',
	type_keeper: [],
	material: ''
}

export function filter_listeners() {

	if(!$_('body').classList.contains('shelves')) return
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

				obj.color = event.target.querySelector('span').innerHTML.trim()
				get_shelves(obj)

		})

	})
}

function type_keeper(){
	if(!$_('.item.supply-type')) return;
	let chex = $$_('.item.supply-type input[type="radio"]')
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

function get_shelves(obj, hide){
			NProgress.start()
			$_('.item.results .row').classList.add('stripe-animation')
			var xhr = new XMLHttpRequest();
			var body = `type_keeper=${obj.type_keeper}&action=get_shelves&color=${obj.color}&material=${obj.material}&size=${obj.size}`
			if(obj.limit){body += `&limit=${obj.limit}`}
			xhr.open("POST", hostname+'/api', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			
			xhr.onreadystatechange = function() {
			  
			  if (this.readyState != 4) return
		  	draw( JSON.parse(this.responseText), hide );
			}

			xhr.send(body);

}

function draw(json, hide){

	if(json.status == 'error'){
		$_('.prod-list').innerHTML = `<p>Полок не найдено</p>`
		NProgress.done()
		$_('.item.results .row').classList.remove('stripe-animation')
		$_('.item.results .row .count').innerHTML = 0
		$_('.item.results .row .declension').innerHTML = declension("полка", "полок", "полки", 0);
		$_('.item.results .row svg').classList.add('searched')
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
		<li class="item">
			<img data-src="${hostname + json[i].thumb}" width="325" height="423" class="lazyload"/>
			<a href="${json[i].uri}" class="title">
				${json[i].pagetitle}
			</a>
			<span class="size">${json[i].size}</span>
			<span class="article">Артикул ${json[i].article}</span>
			<span class="price">${json[i].price} р.</span>
		</li>
		`
	})

	$_('#new-list').innerHTML = str
	NProgress.done()

	qs('ul.pagination') && (qs('ul.pagination').style.visibility = 'hidden')

	$_('.item.results .row').classList.remove('stripe-animation')
	if(!hide){
		$_('.item.results .row svg').classList.add('searched')
		$_('.item.results .row .declension').innerHTML = declension("полка", "полок", "полки", Object.keys(json).length);
		$_('.item.results .row .count').innerHTML = Object.keys(json).length
	} else {
		get_total_products(7).then(r => {

		$_('.item.results .row .count').innerHTML = r
		$_('.item.results .row .declension').innerHTML = declension("полка", "полок", "полки", r);
		})
	}
	
}

function reset_span_close(){
	$_('.item.results .row svg').addEventListener('click', event => {



		$_('.item.results .row svg').classList.remove('searched')
		$_('article .row .sort').removeAttribute("class")
		$_('article .row div').classList.add('sort')

		
		get_shelves({
			size: [],
			color: '',
			type_keeper: [],
			material: '',
			limit: 10
		}, true)

		$$_('.item.size.shelves .row .head').forEach(span => span.innerHTML = 'выбрать')
		$$_('.item.size.shelves .row ul').forEach(ul => ul.classList.remove('open'))

		$$_('.item.color .row').forEach(row => row.classList.remove('active'))
		$$_('.item.supply-type input[type="radio"]').forEach(checkbox => checkbox.checked = 0)

		$$_('.item.material .row').forEach(row => row.classList.remove('active'))

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


