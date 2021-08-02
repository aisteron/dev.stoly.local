import React, { useContext } from "react";
import { Context } from "./app";
import GoodsItem from "./goods-item";
import './goods-list.sass'
export default function GoodsList() {
    const {context} = useContext(Context);


    if(!Object.keys(context).length){
        return <span>Ваша корзина пуста</span>
    }
    let result = Object.keys(context).map( i => {

        return <GoodsItem item={context[i]} key={i}/>
    })

    return (
        <table>
            <thead>
            <tr>
                <td>Название</td>
                <td>Артикул</td>
                <td>Цена</td>
                <td>Кол-во</td>
                <td>Действие</td>
            </tr>
            </thead>
            <tbody>
            {result}
            </tbody>
        </table>
    )
}