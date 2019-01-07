import React,{Component} from 'react';

import '../HotStyle/HotStyle.scss'
import './MNYGoodies.scss'

class MNYGoodies extends Component{
	render(){
		let MNYGoodiesDataBG = {
			width:'100%',
			height:'400px',
			backgroundSize:'100% 100%',
			backgroundImage:`url(${this.props.MNYGoodiesData.image})`
		}
		return(
			<div>
				<div className="HotStyleThree MNYGoodies" style={MNYGoodiesDataBG}>
					<ul>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		)
	}
}
export default MNYGoodies;