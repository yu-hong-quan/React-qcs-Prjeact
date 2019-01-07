import React,{Component} from 'react';
import {Icon} from 'antd';

import './SalesList.scss'

class SalesList extends Component{
	render(){
		// 设置style属性
		var sectionStyle = {
			backgroundImage:`url(${this.props.TodatSeckillBG})`
		}
		return(
			<div style={sectionStyle} className="SalesList">
				<ul>
					{
						this.props.SalesListData.map((item,index)=><li key={index}>
							<div>
								<img src={item.over_image_url} alt=" "/>
							</div>
							<span className="shoping-title">{item.item_name.slice(0,16)}</span>
							<span className="SpanInfo">
								<span className="max_app_price">￥{item.max_app_price/100}</span>
								<span className="max_market_price">￥{item.max_market_price/100}</span>
								<span className="ShopingCath"><Icon className="qcs-shopping" type="shopping-cart" /></span>
							</span>
					</li>)
					}
				</ul>
			</div>
		)
	}
}
export default SalesList;