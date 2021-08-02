import React, { useContext} from 'react';
import {stateGoods} from "../app";


export function GoodsItem({item}){


	const items = useContext(stateGoods)[0]
	const makeState = useContext(stateGoods)[1]


	const onChange = event => {
	console.log(event.target.value)
	makeState(changeState(items, event.target))
	}

	return (
		<tr data-key={item.key}>
			<td><a href={"/"+item.uri}>{item.name}</a></td>
			<td>{item.article}</td>
			<td>{(item.price * item.count).toFixed(2)}</td>
			<td>
				<input type="number" min="1" onChange={onChange} value={item.count}/>
			</td>
			<td><button>Удалить</button></td>
		</tr>

	)
}

function changeState(state, target){


	let k = target.closest('tr').dataset.key
	Object.keys(state).forEach(i => {
		if(state[i].key === k){
			state[i].count = Number(target.value)
		}
	})

	return state


}