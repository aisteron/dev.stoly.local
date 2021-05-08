import React, {useContext} from 'react'
import { stateGoods } from "../app";

export default function Itogo(){

    /*return(
    <stateGoods.Consumer>
        <p></p>
    </stateGoods.Consumer>
    )*/

    const g = useContext(stateGoods)[0]
    console.log(g)


    /*let sum = 0
    Object.keys(state).forEach(i => {
        sum += state[i].price
    })

    return(
        <h3>{sum}</h3>
    )*/
    return null
}