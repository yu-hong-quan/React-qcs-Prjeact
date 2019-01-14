import React,{Component} from 'react';
import axios from 'axios';
import {Icon} from 'antd';
import PrivilegedMask from './PrivilegedMask'

import './maskCenter.scss'

class MaskCenter extends Component{
	constructor(){
		super();
		this.state = {
			maskCenterLogoData:'',
			PrivilegedMaskData:[]
		}
	}
	componentDidMount(){
		axios.get('tms/aladdin/get?code=Mask_center_banner_index_1')
		.then((resp)=>{
			console.log(resp.data.data.datas);
			this.setState({
				maskCenterLogoData:resp.data.data.datas
			})
		});
		axios.get('activity/specials/info?code=Mask_center_products_index_4&access_token=undefined')
		.then((resp)=>{
			console.log(resp.data.data.specials_item_v_o_s)
			this.setState({
				PrivilegedMaskData:resp.data.data.specials_item_v_o_s
			})
		})
	}
	componentWillUnmount(){
		this.setState((state,callback)=>{
			return;
		})
	}
	render(){
		var bgImg = {
			width:'100%',
			height:'80px',
			backgroundSize:'100% 100%',
			backgroundImage:`url('https://asset.watsons.com.cn/act/static/images/mask-center/442af5844f137440b999ff5c7.png')`
		}
		
		return(
			<div className='maskCenterWapper'>
				<div>
					{
						this.state.maskCenterLogoData!=='' ? <img src={this.state.maskCenterLogoData[0].image_url}  alt=' '/>:''
					}
				</div>
				<div className='maskCenterLogin'>
					<div style={bgImg}>
						<div className="privilege-info">
							<div className='privilege-title'>登录查看抢购资格</div>
							<div>抢购资格可用于购买本活动优惠价商品<Icon type="question-circle" className='question-circle'/></div>
						</div>
					</div>
				</div>
				<PrivilegedMask PrivilegedMaskData={this.state.PrivilegedMaskData} />
			</div>
		)
	}
}

export default MaskCenter;