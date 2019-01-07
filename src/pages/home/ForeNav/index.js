import React,{Component} from 'react';

import './ForeNav.scss'

class ForeNav extends Component{
	render(){
		return (
			<ul className="ForeNavUl">
				{
					this.props.ForeNavData.map((item)=><li key={item.id}>
						<img src={item.image_url} alt=""/>
					</li>)
				}
			</ul>
		)
	}
}
export default ForeNav