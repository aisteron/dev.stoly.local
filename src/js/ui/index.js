import {$_, $$_, load_notify, show_notify, hostname} from '../libs.js'
import {aside_filter} from './aside.filter.js'
import {fancy} from './fancy.js'
import {shelves_size} from './shelves.size.js'
import {add_to_cart_from_prod_list} from './prod.list.js'
import {filter_listeners} from './filter.listeners.js'
import {load_vex} from './product.listeners.js'

import {Product} from './product.js'

export function Ui(){

  ripple_effect()

  open_mobile_menu()
  aside_filter()
  fancy()
  shelves_size()
  add_to_cart_from_prod_list()
  filter_listeners()
  Product()

  footer_callback()
	
}


function ripple_effect(e){

  $$_('.categories a.item').forEach(el => {
    el.addEventListener('click', function(e) {

      e.preventDefault()
      if(this.getElementsByClassName('ripple').length > 0)
      {
        this.removeChild(this.childNodes[1]);
      }

      var circle = document.createElement('div');
      this.appendChild(circle);

      var d = Math.max(this.clientWidth, this.clientHeight);
      circle.style.width = circle.style.height = d + 'px';

      circle.style.left = e.clientX - this.offsetLeft - d / 2 + 'px';
      circle.style.top = e.clientY - this.offsetTop - d / 2 + 'px';

      circle.classList.add('ripple');
    })
  })
}

function open_mobile_menu(){

  $_('#nav-icon4').addEventListener('click', event => {
    console.log(event.target)
    event.target.classList.toggle('open')
    $_('#mobile-menu').classList.toggle('open')
  })

  document.addEventListener('swiped-left', event => {
    $_('#mobile-menu').classList.remove('open')
    $_('#nav-icon4').classList.remove('open')
  })
  document.addEventListener('swiped-right', event => {
    $_('#mobile-menu').classList.add('open')
    $_('#nav-icon4').classList.add('open')
  })
}

function footer_callback(){
  if(!$_('footer button')) return;

  $_('footer button').addEventListener('click', event => {
    load_vex()
     .then(r => {
        vex.dialog.open({
              message: 'Введите номер телефона и мы вам перезвоним:',
              input: ['<input name="phone" type="text" placeholder="+375 xx xxx xx xx" required />'].join(''),

              callback: function (data) {
                  if (!data) {
                      console.log('%c Cancelled', 'color: red')
                  } else {
                      //console.log('Phone', data.phone)
                      let obj = {phone: data.phone}
                      fetch(hostname+'/assets/api/callback/one_click.php',{
                        method: 'POST',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(obj)
                      })
                      .then(response => response.text())
                      .then(t => {
                        let obj = {status: t}
                        
                        if(t == 'success'){
                          obj.title = 'Успешно отправлено',
                          obj.text = 'Менеджер вам скоро перезвонит'
                        } else {
                          obj.title = 'Ошибка отправки',
                          obj.text = 'Пожалуйста, сообщите нам, мы исправим'
                        }

                          load_notify().then(_ => show_notify(obj))
                      })
                  }
              }
          })
      })
  })
  
}

