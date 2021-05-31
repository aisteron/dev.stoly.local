import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'



if(document.querySelector('body').classList.contains('cart-page')){
	ReactDOM.render(<App/>, document.querySelector('#root'))
}

