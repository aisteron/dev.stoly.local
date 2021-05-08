import React, { useContext } from "react";
import { Context } from "./app";
import {$_} from '../../libs'

export default function Itogo() {
    const {context, setContext} = useContext(Context);
    let res = {...context};
    let sum = 0, count = 0;

    Object.keys(res).forEach(i => {
        sum += (res[i].price * res[i].count)
        count++
    });



    $_('li.cart span.filled').innerText = count;


    if(!Object.keys(context).length){ return null }

    return(
        <h4>Итого: {sum.toFixed(2)} руб.</h4>
    )
}