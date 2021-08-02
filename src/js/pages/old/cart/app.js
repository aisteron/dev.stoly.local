import React, {useEffect, useState} from 'react'
import Itogo from "./Itogo";
import GoodsList from "./goods-list";
import Forms from './forms'

export const Context = React.createContext({
    goods: [],
    setContext: () => {}
});

export default function App(){
    const [context, setContext] = useState([]);

    const value = {context, setContext}
    useEffect(() => {

        fetch('http://stoly.modx/assets/ajax/getcart.json')
            .then(res => res.json())
            .then( result =>  setContext(result))

    }, []);

    return(

        <Context.Provider value={value}>
            <h1>Корзина</h1>
            <GoodsList />
            <Itogo />
            <Forms />
        </Context.Provider>
    )
}