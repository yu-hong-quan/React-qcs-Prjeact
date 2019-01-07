import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './HotStyle.scss'

class HotStyle extends Component{
	render(){
		let HotStyleThreeBG = {
			width:'100%',
			height:'400px',
			backgroundSize:'100% 100%',
			backgroundImage:`url(${this.props.HotStyleThree})`
		}
		return(
			<div>
				<div className="HotStyleOne">
					<Link to='/MoisturizingMask'><img src={this.props.HotStyleBG} alt=""/></Link>
				</div>
				<div className="HotStyleTwo">
					<img src={this.props.HotStyleTwo} alt=""/>
				</div>
				<div className="HotStyleThree" style={HotStyleThreeBG}>
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
export default HotStyle;