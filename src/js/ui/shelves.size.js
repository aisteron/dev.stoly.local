import {$_, $$_} from '../libs.js'

// его еще предстоит получить!

let arr = [
	[600,200,150],
	[800,200,150],
	[600,140,95],
	[800,140,95],
	[600,250,170],
	[800,250,170],
	[600,233,260],
	[800,233,260],
	[600,166,65],
	[800,166,65],
	[600,140,150],
	[800,140,150],
	[600,100,100],
	[800,100,100],
	[600,200,200],
	[800,200,200],
	[600,250,250],
	[800,250,250],
	[600,166,400],
	[800,166,400],
 ]



export function shelves_size(){

	if(!$_('.category-page')) return;

	init(arr)
	show_shelf_size()
	reset()
}

function show_shelf_size(){
	if(!$_('.aside-filter .item.size .body span.title')) return

		$$_('.aside-filter .item.size span.head').forEach(span => {
			

			span.addEventListener('click', event => {
				let t = event.target.nextElementSibling
					  t.classList.toggle('open')
					 
			})

				
				
		})

	$$_('.aside-filter .item.size ul li').forEach(li =>  li.addEventListener('click', replace) )
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

	set_right_size()

}

function init(arr){

	if(!$_('.item.size.shelves')) return


	let first = []
	let second = []
	let third = []

	arr.forEach(el => {
		
		first.push(el[0])
		second.push(el[1])
		third.push(el[2])

	})

	first = [...new Set(first)];
	second = [...new Set(second)];
	third = [...new Set(third)];

	draw_list($_('.item.size.shelves .row .width'), first.sort(compareNumbers))
	draw_list($_('.item.size.shelves .row .height'), second.sort(compareNumbers))
	draw_list($_('.item.size.shelves .row .depth'), third.sort(compareNumbers))
}


function draw_list(node, arr){
	let str = ``
	arr.forEach(el => {
		str += `<li>${el}</li>`
	})
	node.querySelector('ul').innerHTML = str
	$$_('.aside-filter .item.size ul li').forEach(li =>  li.addEventListener('click', replace) )
}

function compareNumbers(a, b) {
  return a - b;
}

function set_right_size(){
	/*
	* при выборе размера, нам надо установить остальные правильно
	*
	*
	*/

	let actual_size = []

	$$_('.item.size.shelves .head').forEach(el => {
		if(!Number(el.innerText)){
			actual_size.push("")
		} else {
			actual_size.push(Number(el.innerText))
		}
		
	});

	let n = []

	actual_size.forEach((el, index) => {
		
		if(el){

			arr.forEach(e => {
				if(el == e[index]){
					n.push(e)
				}
			})
		}

	})

	init(n);
}

/*
	600-200-150
	800-200-150
	600-150-95
	800-150-95
	600-250-170
	800-250-170
	600-233-260
	800-233-260
	600-166-65
	800-166-65
	600-150-150
	800-150-150
	600-100-100
	800-100-100
	600-200-200
	800-200-200
	600-250-250
	800-250-250

	600-166-400
	800-166-400
*/

function reset(){
	if(!$_('.item.size.shelves')) return;
		$_('.item.size.shelves .reset').addEventListener('click', _ => {
			console.log('Reset to default');
			init(arr)
			$$_('.item.size.shelves .row .head').forEach(span => span.innerHTML = 'выбрать')
			$$_('.item.size.shelves .row ul').forEach(ul => ul.classList.remove('open'))

		})
}