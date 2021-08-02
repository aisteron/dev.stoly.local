import React, {useContext} from 'react'
import {faceContext} from './index'
import {Context} from '../app'

export function Radio(){
    const {changeFace} = useContext(faceContext);
    const onChange = event => {
        changeFace(event.target.id)
    };

    const {context} = useContext(Context);
    if(!Object.keys(context).length){ return null }

    return(
        <div className="radio">
            <label>
                <input type="radio" name="face" onChange = {onChange} id="fiz" defaultChecked = "true"/>
                <span>Физ. лицо</span>
            </label>
            <label>
                <input type="radio" name="face" id="ur" onChange = {onChange} />
                <span>Юр. лицо</span>
            </label>
        </div>
    )
}