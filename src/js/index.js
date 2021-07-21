import {Ui} from './ui'
import {Table} from './pages/table'


document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init)

function init(){
	Ui()
	Table()
	
}