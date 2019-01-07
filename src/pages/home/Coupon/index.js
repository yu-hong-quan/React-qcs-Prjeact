import React,{Component} from 'react';

import './Coupon.scss'

class Coupon extends Component{
	render(){
		return (
			<ul className="CouponUl">
				{
					this.props.CouponData.map((item)=><li key={item.id}>
						<img src={item.image_url} alt="" />
					</li>)
				}
			</ul>
		)
	}
}
export default Coupon;