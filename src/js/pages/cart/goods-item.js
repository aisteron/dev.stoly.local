import React, { useContext } from "react";
import { Context } from "./app";


export default function GoodsItem({item}){
    const {context, setContext} = useContext(Context);

    const onChange = (event) => {
        let newState = changeState(context, event.target)
        setContext({...newState})
    }

    const remove = event => {
        let newState = removeState(context, event.target)
        setContext({...newState})
    }

    return(
        <tr data-key={item.key}>
            <td><a href={"/"+item.uri}>{item.name}</a></td>
            <td>{item.article}</td>
            <td>{item.price * item.count}</td>
            <td>
                <input type="number" value={item.count} onChange={onChange} style={{width: 4 + 'ch'}}/>
            </td>
            <td>
                <button onClick={remove}>Удалить</button>
            </td>
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

    toServer(target, "COUNT_PRODUCT")

    return state


}

function removeState(goods, target){

   let key = target.closest('tr').dataset.key

   Object.keys(goods).map(i => {

        if(goods[i].key === key){
            delete goods[i]
        }
    })


    toServer(target, "REMOVE_PRODUCT")

    return goods

}

function toServer(target, action){

    let obj = {
        count: Number(target.closest('tr').querySelector('input').value),
        key: target.closest('tr').dataset.key,
        name: action
    }

    fetch('http://stoly.modx/recount-remove', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type' : 'Application/json'},
        body: JSON.stringify(obj)
    })
        .then(r => r.json())
        .then(j => console.log(j))
}