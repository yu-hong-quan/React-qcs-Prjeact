import React,{Component} from 'react';

import './Nurse.scss'

class Nurse extends Component{
	render(){
		return(
			<div style={{'backgroundColor':'#fff'}}>
				<ul className="NurseUL">
					{
						this.props.NurseData.map((item,index)=><li key={item+index}>
							<img src={item.image_url} alt={item.image_url}/>
						</li>)
					}
				</ul>
			</div>
		)
	}
}
export default Nurse;