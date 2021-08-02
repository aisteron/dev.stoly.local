import {Ui} from './ui'
import {Table} from './pages/table'
import {Cart} from './pages/cart'


document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init)

function init(){
	Ui()
	Table()
	Cart()
}