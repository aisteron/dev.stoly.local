import {$_, $$_} from '../libs.js'

export function aside_filter(){

makeObserver()
show_hide_filter()

color_supply()
check_material()

}


function makeObserver(){
	if(!document.querySelector('.anchor')) return;
	let options = {
		root: null,
		rootMargin: '5px',
		threshold: 0.5
	}

	// функция обратного вызова
	let callback = function(entries, observer){
		entries.forEach(e => {
				//console.log(e.isIntersecting)
			if(e.isIntersecting){
				
				document.querySelector('.item.results .row').classList.remove('fixed')
			} else{
					document.querySelector('.item.results .row').classList.add('fixed')
			}
		})
	}

	// наблюдатель
	let observer = new IntersectionObserver(callback, options)
	let target = document.querySelector('.anchor')
	observer.observe(target)   
}

function show_hide_filter(){

	if(!$_('article .row .filter')) return

	$_('article .row .filter').addEventListener('click', event => {
		event.preventDefault()
		$_('aside').classList.add('open')
		setTimeout(()=>{
			$_('.bg-placeholder').classList.add('open')
			$_('.bg-placeholder').style.height = document.body.scrollHeight	+"px"
		}, 200)
		
	})

	$_('aside span.close').addEventListener('click', event => {
		
		
		$_('.bg-placeholder').classList.remove('open')
		setTimeout(()=>{
			$_('aside').classList.remove('open')	
		}, 200)
	})

}



function replace(){

	let head = event.target.closest('div').querySelector('span.head')
	let ul = event.target.closest('ul')
	let li = document.createElement('li')
		  
  li.innerText = head.innerText
	li.addEventListener('click', replace)
	
	ul.appendChild(li)
	
	head.innerText = event.target.innerText
	
	event.target.remove()
	ul.classList.remove('open')
}

function color_supply(){
	if(!$_('aside .aside-filter')) return

	$$_('.item.color .row').forEach(el => {
		el.addEventListener('click', event => {
			$$_('.item.color .row').forEach(el => el.classList.remove('active'))
			event.target.closest('.row').classList.add('active')
		})
	})
		
}

function check_material(){
	if(!$_('.item.material')) return


	$$_('.item.material .body .row').forEach(el => {
		el.addEventListener("click", event => {
			if(event.target.tagName == 'svg' || event.target.tagName == 'a') return;
			$$_('.item.material .body .row').forEach(el => el.classList.remove('active'))
			event.target.classList.add('active')
		})
	})

}