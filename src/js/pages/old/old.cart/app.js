import React, {useState, useEffect} from 'react'

import {GoodsList} from './components/goods-list'
import Itogo from "./components/itogo";
export const stateGoods = React.createContext()
export default function App(){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let host = "", url = ""

	host = "http://stoly.modx"
    url = '/assets/ajax/getcart.json'

    const makeState = (state) =>{
        console.log(state)
        setItems(state)
    }



	return(
        <React.Fragment>
            <stateGoods.Provider value={[items, makeState]}>
            <table>
                <thead>
                    <tr>
                        <td>Наименование</td>
                        <td>Артикул</td>
                        <td>Цена</td>
                        <td>Количество</td>
                        <td>Действие</td>
                    </tr>
                </thead>
                <tbody>
                    <GoodsList items = {items}/>
                </tbody>

            </table>
            <Itogo />
            </stateGoods.Provider>
        </React.Fragment>
		)
}