import React,{Component} from 'react';

import './Choiceness.scss'

class Choiceness extends Component{
	render(){
		return(
			<div style={{'backgroundColor':'#fff'}}>
				<div><img src='https://image.watsons.com.cn//upload/8c3676f5.jpg' alt=""/></div>
				<div>
					<ul className='ChoicenessUL'>
						{
							this.props.ChoicenessData.map((item,index)=><li key={item+index} style={{'marginBottom':'5px'}}>
								<img src={item.image_url} alt=""/>
							</li>)
						}
					</ul>
				</div>
			</div>
		)
	}
}
export default Choiceness