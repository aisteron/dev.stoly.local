import React, {useContext} from 'react';
import {GoodsItem} from './goods-item'
import './goods-list.sass'
import { stateGoods } from "../app";

export function GoodsList() {

	const items = useContext(stateGoods)[0]

	return(


		Object.keys(items).map((item,i) =>
			<GoodsItem item={items[i]} key={i}/>
		)



	)

}
