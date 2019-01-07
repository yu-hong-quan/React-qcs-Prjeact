import React,{Component} from 'react';
import {Icon} from 'antd';

import '../SalesList/SalesList.scss'

class HotCake extends Component{
	render(){
		return(
			<div>
				<div style={{'marginBottom':'3px'}}>
					<img src={this.props.HotCakeOne.image} alt=""/>
				</div>
				<div className="SalesList">
					<ul>
						{
							this.props.HotCakeData.map((item,index)=><li key={item+index}>
								<div>
									<img src={item.over_image_url} alt=""/>
								</div>
								<span className="shoping-title">{item.item_name}</span>
								<span className="SpanInfo">
									<span className="max_app_price">￥{item.max_app_price/100}</span>
									<span className="max_market_price">￥{item.max_market_price/100}</span>
									<span className="ShopingCath"><Icon className="qcs-shopping" type="shopping-cart" /></span>
								</span>
						</li>)
						}
					</ul>
				</div>
			</div>
		)
	}
}
export default HotCake;