import React, {useContext} from 'react'
import {faceContext} from './index'
import {Context} from '../app'



export function Fields(){

    const {face} = useContext(faceContext);

    const {context} = useContext(Context);
    if(!Object.keys(context).length){ return null }

    if(face === "fiz"){
    return(
        <div className="fields">
            <input type="text" placeholder="Ваше имя" name="name" autoComplete="off"/>
            <input type="text" placeholder="Ваш телефон" name="phone" autoComplete="off"/>
            <input type="text" placeholder="Ваша почта" name="mail" autoComplete="off"/>
        </div>


    )
    } else {
        return (
        <div className="fields">
            <input type="text" placeholder="Название организации" name="name" autoComplete="off"/>
            <input type="text" placeholder="Ваш телефон" name="phone" autoComplete="off"/>
            <input type="text" placeholder="Ваша почта" name="mail" autoComplete="off"/>
            <input type="text" placeholder="УНП" name="unp" autoComplete="off"/>
        </div>
        )
    }
}