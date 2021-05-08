import React, {useState} from 'react'
import {Radio} from './radio'
import {Fields} from './fields'
import './forms.sass'
import {$_, $$_, check_host} from '../../../libs'
import Snackbar from '../../../../../node_modules/node-snackbar'
import '../../../../../node_modules/node-snackbar/dist/snackbar.min.css'
export const faceContext = React.createContext();
import {Context} from '../app'


export default function Forms(){

    const [face, changeFace] = useState('fiz');
    const value = {face, changeFace};

    const onClick = _ => {toServer(face)};

    const {context} = useContext(Context);
    if(!Object.keys(context).length){ return null }
    return(
        <faceContext.Provider value={value}>
        <div className="forms">
            <Radio />
            <Fields />
            <button onClick={onClick}>Submit</button>
        </div>
        </faceContext.Provider>

    )


}

function toServer(face){

    Array.from ($$_('.fields input')).forEach(el => {

        el.style.borderColor = '#ccc';
        if(el.value === ''){
            el.style.borderColor = 'red';
            return null
        }
    });

    let obj = {
        fiz:{},
        ur:{}
    };

    if(face === 'fiz'){
        obj.fiz.checked = true;
        obj.fiz.name = $_('.fields input[name="name"]').value;
        obj.fiz.phone = $_('.fields input[name="phone"]').value;
        obj.fiz.mail = $_('.fields input[name="mail"]').value;

    }

    if(face === 'ur'){
        obj.ur.checked = true;
        obj.ur.name = $_('.fields input[name="name"]').value;
        obj.ur.phone = $_('.fields input[name="phone"]').value;
        obj.ur.mail = $_('.fields input[name="mail"]').value;
        obj.ur.unp = $_('.fields input[name="unp"]').value;
    }


    fetch(check_host()+'/order-receive', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify(obj)
    })
        .then(r => r.json())
        .then(json => draw(json))
}

function draw(json){

    !json.success ? Snackbar.show({ text: json.message, actionText: 'OK', }) : ''

    $_('#root').innerHTML = `<h1>Ваш заказ №${json.data.msorder} успешно отправлен</h1>
                                <h3>Пожалуйста, ожидайте звонка менеджера</h3>`

}