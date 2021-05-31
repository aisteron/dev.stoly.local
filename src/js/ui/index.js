import {$_, $$_} from '../libs.js'
import {aside_filter} from './aside.filter.js'
import {fancy} from './fancy.js'
import {shelves_size} from './shelves.size.js'

export function Ui(){

  $$_('.categories a.item').forEach(el => {
    el.addEventListener('click', ripple_effect)
  })

  open_mobile_menu()
  aside_filter()
  fancy()
  shelves_size()
	
}


function ripple_effect(e)
{
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

