import {$_, $$_, hostname,load_notify, show_notify, get_cart_status} from '../../libs.js'

export function Cart(){

	if(!$_('body').classList.contains('cart-page')) return;

	order_submit()
}

function order_submit() {

	let obj = {}

	$_('.ms3_form').addEventListener('submit', event => {
		event.preventDefault()

		obj.email = $_('.ms3_form #email').value
		obj.receiver = $_('.ms3_form #receiver').value
		obj.phone = $_('.ms3_form #phone').value
		

		var xhr = new XMLHttpRequest;
		var body = `action=order_receive&todo=receive&email=${obj.email}&receiver=${obj.receiver}&phone=${obj.phone}`
		xhr.open("POST", hostname+'/api', true)
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onreadystatechange = function() {
			if(this.readyState !== 4) return;
			draw(JSON.parse(this.responseText))
			
		}
		xhr.send(body)
 
	})

	

}

function draw(json){
   if(!json.success){

   	let obj = {
   		status: 'error',
   		title: 'Ошибка',
   		text: json.message
   	}
   	load_notify().then(_ => show_notify(obj))
   	return;

   } else {
   		$$_('.row').forEach(row => row.remove())
   		$('#msCart').remove()

   		$_('header').insertAdjacentHTML('afterend', `<h1>Заказ №${json.data.msorder} успешно оформлен<br><img src="/assets/img/589.webp"></h1>`)
   		if(!get_cart_status){
   			$_('nav li.cart .filled').remove()
   		}
   }
}