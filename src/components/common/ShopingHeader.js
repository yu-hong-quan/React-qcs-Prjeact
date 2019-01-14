import React,{Component} from 'react';
import axios from 'axios';
import {Icon} from 'antd';

import './ShopingHeader.scss'

class ShopingHeader extends Component{
	constructor(){
		super();
		this.state = {
			TopImg:[],
		}
	}
	componentDidMount(){
		axios.get('https://h5.watsons.com.cn/tms/aladdin/get?code=h5_topfixed_img')
		.then((item)=>{
			// console.log(item.data.data)
			this.setState({
				TopImg:item.data.data.datas[0].image_url,
			})
		})
	}
	goBack = ()=>{
		this.props.history.go(-1);
	}
	render(){
		return(
			<div className='ShopingHeader'>
				<div className='ShopingHeaderIMG'>
					{
						this.state.TopImg !== '' ? <img src={this.state.TopImg} alt={this.state.TopImg} /> :''
					}
				</div>
				<div className='ShopingHeaderTitle'>
					<div onClick={this.goBack}><Icon type="left" /></div>
					{this.props.titleName !== '' ?<div>{this.props.titleName}</div>:<div>{this.state.titleName}</div>}
				</div>
			</div>
		)
	}
}
export default ShopingHeader